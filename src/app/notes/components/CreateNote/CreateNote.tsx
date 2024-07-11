import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const { user } = useUser();
  const successToast = () =>
    toast.success("Message saved", {
      position: "top-right",
    });
  const failureToast = () =>
    toast.error("Unable to save message", {
      position: "top-right",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.sub) {
      console.error("User ID not available");
      return;
    }

    try {
      const res = await fetch("/api/save-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.sub,
          content,
          isUser: false,
          email: user.email,
          name: user.name,
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      successToast();
      console.log("Note saved successfully");
    } catch (error) {
      failureToast();
      console.error("Error saving note:", error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto h-[70vh] w-[70vh] flex flex-col">
      <ToastContainer />
      <CardHeader>
        <CardTitle>Create New Note</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 h-full flex flex-col"
        >
          <div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
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
            {/* Add more formatting buttons as needed */}
          </div>
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow min-h-0"
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
      </CardContent>
    </Card>
  );
};

export { CreateNote };
