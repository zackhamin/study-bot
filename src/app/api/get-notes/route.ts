import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET(request: Request) {
  try {
    console.log("API route /api/get-notes called");

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    console.log("Received userId:", userId);

    if (!userId) {
      console.log("No userId provided");
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    console.log("Attempting to connect to the database");
    await prisma.$connect();
    console.log("Database connection successful");

    console.log("Fetching messages for userId:", userId);
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

    console.log(`Found ${messages.length} messages`);

    console.log("Parsing message content");
    const parsedMessages = messages.map((message) => {
      try {
        return {
          ...message,
          content: JSON.parse(message.content as string),
        };
      } catch (parseError) {
        console.error("Error parsing message content:", parseError);
        return {
          ...message,
          content: { error: "Failed to parse content" },
        };
      }
    });

    console.log("Successfully parsed messages");

    return NextResponse.json({ notes: parsedMessages });
  } catch (error: unknown) {
    console.error("Error in /api/get-notes:", error);

    let errorMessage = "An unexpected error occurred";
    let errorDetails = {};

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = { name: error.name, stack: error.stack };
    }

    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Prisma Error Code:", error.code);
      errorDetails = { ...errorDetails, code: error.code };
    }

    return NextResponse.json(
      {
        error: "Error retrieving notes",
        message: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
    console.log("Database connection closed");
  }
}
