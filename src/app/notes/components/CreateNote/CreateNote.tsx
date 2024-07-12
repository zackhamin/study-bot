import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";

interface CreateNoteProps {
  onNoteCreated: () => void;
  onNoteError: () => void;
}

export default function CreateNote({
  onNoteCreated,
  onNoteError,
}: CreateNoteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.sub) {
      console.error("User ID not available");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/save-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.sub,
          title,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
          isUser: true,
          email: user.email,
          name: user.name,
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      onNoteCreated();
      setTitle("");
      setContent("");
      setTags("");
    } catch (error) {
      console.error("Error saving note:", error);
      onNoteError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {isLoading && <LoadingIndicator size={50} color="bg-indigo-500" />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
        <div className="flex space-x-2">
          <Button type="button" variant="outline" size="icon">
            <span className="font-bold">B</span>
          </Button>
          <Button type="button" variant="outline" size="icon">
            <span className="italic">I</span>
          </Button>
          <Button type="button" variant="outline" size="icon">
            <span className="underline">U</span>
          </Button>
        </div>
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px]"
        />
        <div className="flex items-center space-x-2">
          <Tag className="w-5 h-5" />
          <Input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="flex-grow"
          />
        </div>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
}

export { CreateNote };
