// app/actions/searchNotes.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function searchNotes(userId: string, query: string) {
  try {
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

    const parsedMessages = messages.map((message) => {
      try {
        const content = JSON.parse(message.content as string);
        return {
          ...message,
          content,
        };
      } catch (parseError) {
        console.error("Error parsing message content:", parseError);
        return {
          ...message,
          content: { error: "Failed to parse content" },
        };
      }
    });

    // Perform client-side filtering
    const filteredMessages = parsedMessages.filter((message) => {
      const lowercaseQuery = query.toLowerCase();
      return (
        message.content.title.toLowerCase().includes(lowercaseQuery) ||
        message.content.content.toLowerCase().includes(lowercaseQuery) ||
        message.content.tags.some((tag: string) =>
          tag.toLowerCase().includes(lowercaseQuery)
        )
      );
    });

    return filteredMessages;
  } catch (error) {
    console.error("Error in searchNotes:", error);
    throw new Error("Failed to search notes");
  }
}
