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
          <Card className="w-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-emerald-600">
                {title || "Untitled Note"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-200 line-clamp-2">
                {truncateContent(content)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags && tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-600 text-emerald-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">No tags</span>
                )}
              </div>
            </CardContent>
          </Card>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-400">
            {title || "Untitled Note"}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-slate-300 mb-6 whitespace-pre-wrap">
            {content || "No content available"}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-700 text-emerald-400 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">No tags</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
