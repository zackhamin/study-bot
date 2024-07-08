import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NotesCardProps {
  title: string;
  content?: string;
  tags: string[];
}

export function NotesCard({ title, content = "", tags }: NotesCardProps) {
  const truncateContent = (text: string, lines: number = 2) => {
    if (!text) return "";
    const words = text.split(" ");
    const truncated = words.slice(0, lines * 10).join(" ");
    return truncated.length < text.length ? `${truncated}...` : truncated;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full p-0 h-auto" variant="outline">
          <Card className="w-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-indigo-700">
                {title || "Untitled Note"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-2">
                {truncateContent(content)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags && tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500">No tags</span>
                )}
              </div>
            </CardContent>
          </Card>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="font-semibold mb-2">{title || "Untitled Note"}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {content || "No content available"}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags && tags.length > 0 ? (
            tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500">No tags</span>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
