import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { userId, content, isUser, email, name } = await request.json();

    // Ensure the user exists
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email,
          name,
        },
      });
    }

    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find or create a session for today
    let session = await prisma.session.findFirst({
      where: {
        userId: userId,
        createdAt: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    if (!session) {
      session = await prisma.session.create({
        data: {
          userId: userId,
        },
      });
    }

    // Analyze the content using OpenAI
    const prompt = `Analyze the following content and provide a JSON response with a title summarizing the topic, the original content, and two relevant tags:
    
    Content: ${content}
    
    Respond only with a JSON object in this format:
    {
      "title": "A summary of the content to create a title based on the topic",
      "content": "The original content, untouched",
      "tags": ["tag1"]
    }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const analysisResult = JSON.parse(
      completion.choices[0].message.content as string
    );

    // Save the message with the analyzed content
    const message = await prisma.message.create({
      data: {
        content: JSON.stringify(analysisResult),
        isUser: isUser,
        sessionId: session.id,
      },
    });

    return NextResponse.json({
      message: "Chat saved successfully",
      analysis: analysisResult,
    });
  } catch (error) {
    console.error("Error in /api/save-chat:", error);
    return NextResponse.json({ error: "Error saving chat" }, { status: 500 });
  }
}
