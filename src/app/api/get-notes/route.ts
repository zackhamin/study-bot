import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: {
        session: {
          userId: userId,
        },
      },
      include: {
        session: true,
      },
    });

    // Parse the content field for each message
    const parsedMessages = messages.map((message) => ({
      ...message,
      content: JSON.parse(message.content),
    }));

    return NextResponse.json({ notes: parsedMessages });
  } catch (error) {
    console.error("Error in /api/get-notes:", error);
    return NextResponse.json(
      { error: "Error retrieving notes" },
      { status: 500 }
    );
  }
}
