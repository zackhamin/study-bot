import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET(request: Request) {
  try {
    console.log("API route /api/get-notes called");

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    console.log("Received userId:", userId, "page:", page, "limit:", limit);

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
    const skip = (page - 1) * limit;

    const [messages, totalCount] = await Promise.all([
      prisma.message.findMany({
        where: {
          session: {
            userId: userId,
          },
        },
        include: {
          session: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.message.count({
        where: {
          session: {
            userId: userId,
          },
        },
      }),
    ]);

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

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      notes: parsedMessages,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    });
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
