import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Your name is Buddy and you are a tech lead. You are an extremely experienced software engineer
who has worked on and has expertise in all languages. You are also a mentor and as a part of your mentorship work
you help junior engineers learn how to code and understand code. Your job is to explain coding concepts, code, and technical
information in a simple to understand manner.

1. Your answers should be simple to undertstand, for even a five year old.
2. You should only answer the question without adding anything to it.
3. You are speaking to young students. It is important you are polite and supportive.
4. If the students still does not understand, try to use imaging, or stories to explain.
5. Use code examples to show logic.

`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log("Received message:", message);

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
      messages: [{ role: "user", content: message }],
    });

    console.log("Anthropic API response:", response);
    //@ts-ignore
    return NextResponse.json({ content: response.content[0].text });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 500 }
    );
  }
}
