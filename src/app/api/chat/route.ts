import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Message, MessageParam } from "@anthropic-ai/sdk/resources/messages";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

export async function POST(request: Request) {
  try {
    const { message, conversation } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 }
      );
    }

    // Ensure conversation is an array and convert it to the correct format
    const formattedConversation: MessageParam[] = Array.isArray(conversation)
      ? conversation.filter(
          (msg): msg is MessageParam =>
            typeof msg.role === "string" &&
            (msg.role === "user" || msg.role === "assistant") &&
            typeof msg.content === "string" &&
            msg.content.trim() !== ""
        )
      : [];

    // Add the new message to the conversation
    formattedConversation.push({
      role: "user",
      content: message,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: formattedConversation,
    });

    console.log("Anthropic API response:", response);
    //@ts-ignore
    return NextResponse.json({ content: response.content[0].text });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      {
        error: "Error processing your request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
