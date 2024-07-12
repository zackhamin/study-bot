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
        let parsedContent;
        if (typeof message.content === "string") {
          parsedContent = JSON.parse(message.content);
        } else if (typeof message.content === "object") {
          parsedContent = message.content;
        } else {
          throw new Error("Unexpected content type");
        }

        return {
          ...message,
          content: parsedContent,
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
      const content = message.content;

      if (typeof content !== "object" || content === null) {
        return false;
      }

      const title = String(content.title || "").toLowerCase();
      const messageContent = String(content.content || "").toLowerCase();
      const tags = Array.isArray(content.tags)
        ? content.tags.map((tag: any) => String(tag).toLowerCase())
        : [];

      return (
        title.includes(lowercaseQuery) ||
        messageContent.includes(lowercaseQuery) ||
        tags.some((tag: string | string[]) => tag.includes(lowercaseQuery))
      );
    });

    return filteredMessages;
  } catch (error) {
    console.error("Error in searchNotes:", error);
    throw new Error("Failed to search notes");
  }
}
