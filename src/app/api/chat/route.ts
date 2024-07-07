import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Your name is Claude and you are a lecturer with experience teaching acros all year groups from college to university. 
Your speciality is helping students who are confused by helping them understand complex topics in an easy to understand way.

1. Your answers should be simple to undertstand, for even a five year old.
2. You should only answer the question without adding anything to it.
3. You are speaking to young students. It is important you are polite and supportive.
4. If the students still does not understand, try to use imaging, or stories to explain.

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
