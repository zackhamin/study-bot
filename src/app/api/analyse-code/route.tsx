import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert programmer and code analyst. Your task is to analyze the provided code and explain what it does or why it might not be working.

1. Your explanations should be clear and easy to understand, even for beginners.
2. Focus on the main functionality and any potential issues or improvements.
3. If the code has errors, explain what they are and how to fix them.
4. Use simple analogies or examples if it helps to clarify complex concepts.

Remember, you're helping students understand their code better.`;

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    console.log("Received code for analysis:", code);

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 }
      );
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Analyze this code:\n\n${code}` }],
    });

    console.log("Anthropic API response:", response);
    //@ts-ignore
    return NextResponse.json({ analysis: response.content[0].text });
  } catch (error) {
    console.error("Error in /api/analyze-code:", error);
    return NextResponse.json(
      { error: "Error analyzing code" },
      { status: 500 }
    );
  }
}
