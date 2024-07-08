import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NotesCardProps {
  title: string;
  content?: string;
  tags: string[];
}

export function NotesCard({ title, content = "", tags }: NotesCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const truncateContent = (text: string, lines: number = 2) => {
    if (!text) return "";
    const words = text.split(" ");
    const truncated = words.slice(0, lines * 10).join(" ");
    return truncated.length < text.length ? `${truncated}...` : truncated;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full p-0 h-auto" variant="outline">
          <Card className="w-full hover:shadow-lg transition-shadow duration-300 bg-white border border-indigo-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-indigo-700 truncate">
                {truncateText(title || "Untitled Note", 50)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-indigo-900 line-clamp-2">
                {truncateContent(content)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags && tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-pink-200 text-pink-800 text-xs rounded-full"
                    >
                      {truncateText(tag, 20)}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-indigo-500">No tags</span>
                )}
              </div>
            </CardContent>
          </Card>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80vw] w-[800px] max-h-[80vh] h-[500px] bg-white overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-700">
            {title || "Untitled Note"}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col h-full overflow-hidden">
          <div className="flex-grow overflow-auto">
            <p className="text-indigo-900 mb-6 whitespace-pre-wrap">
              {content || "No content available"}
            </p>
          </div>
          <div className="mt-auto pt-4 border-t border-indigo-100">
            <div className="flex flex-wrap gap-2">
              {tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-pink-200 text-pink-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-indigo-500">No tags</span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
