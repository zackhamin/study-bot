"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import saveMessageToDB from "../utils/saveMessageToDB";
import { Textarea } from "@/components/ui/textarea";
import { formatText } from "../utils/formatText";
import { Brain, Send, LogIn } from "lucide-react";

interface Message {
  content: string;
  isUser: boolean;
}

export default withPageAuthRequired(function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSessionLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user, error, isLoading } = useUser();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const saveNote = async (content: string) => {
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
          emai: user.email,
          name: user.name,
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      console.log("Note saved successfully");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { content: message, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const aiMessage = { content: data.content, isUser: false };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling API:", error);
      const errorMessage = {
        content: "An error occurred while processing your request.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  return (
    <div className="flex flex-col h-[80vh] bg-gradient-to-br from-indigo-100 to-purple-100">
      <main className="flex-grow overflow-hidden flex flex-col p-4">
        <div className="flex-grow overflow-auto bg-white rounded-lg shadow-inner p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${msg.isUser ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  msg.isUser
                    ? "bg-indigo-500 text-white"
                    : "bg-purple-100 text-indigo-800"
                }`}
              >
                {formatText(msg.content)}
                {!msg.isUser && (
                  <Button
                    onClick={() => saveNote(msg.content)}
                    className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded-lg transition duration-200 ease-in-out"
                  >
                    Save to Notes
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4">
          {user ? (
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Textarea
                placeholder="Ask Uni Bot anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow p-2 text-lg border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <Button
                type="submit"
                disabled={isSessionLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out"
              >
                {isSessionLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login to Start Chatting
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <h3 className="font-medium leading-none text-indigo-800">
                    Login Required
                  </h3>
                  <p className="text-sm text-indigo-600">
                    Please log in to use the chat feature and start learning
                    with Uni Bot.
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/api/auth/login")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Login
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </main>
    </div>
  );
});
