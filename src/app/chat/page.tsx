"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { formatText } from "../utils/formatText";
import { Send, LogIn } from "lucide-react";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/themes/prism.css";
import { ToastContainerWrapper, showToast } from "@/components";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";

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
    setIsLoading(true);
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
      showToast({ message: "Note Saved!", type: "success" });
      setIsLoading(false);
    } catch (error) {
      showToast({
        message: "Error saving note",
        type: "error",
      });
      setIsLoading(false);
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

  const renderMessageContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <div key={lastIndex} className="mb-2">
            {formatText(content.slice(lastIndex, match.index))}
          </div>
        );
      }

      const language = match[1] || "javascript";
      const code = match[2];

      parts.push(
        <div
          key={match.index}
          className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-2"
        >
          <pre className="text-sm">
            <code
              dangerouslySetInnerHTML={{
                __html: highlight(
                  code,
                  languages[language] || languages.javascript,
                  language
                ),
              }}
            />
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(
        <div key={lastIndex} className="mb-2">
          {formatText(content.slice(lastIndex))}
        </div>
      );
    }

    return parts;
  };

  const renderMessage = (msg: Message, index: number) => {
    const messageClass = msg.isUser
      ? "bg-indigo-200 text-indigo-900"
      : "bg-pink-200 text-pink-900";

    return (
      <div
        key={index}
        className={`mb-4 ${msg.isUser ? "text-right" : "text-left"}`}
      >
        <div
          className={`inline-block p-3 rounded-lg max-w-[80%] ${messageClass}`}
        >
          {renderMessageContent(msg.content)}
          {!msg.isUser && (
            <Button
              onClick={() => saveNote(msg.content)}
              className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-lg transition duration-200 ease-in-out"
            >
              Save to Notes
            </Button>
          )}
        </div>
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-200 to-blue-200  p-4">
      <main className="flex flex-col h-full">
        <div className="flex flex-col flex-1 h-[calc(100vh-8rem)] overflow-auto bg-zinc-100 rounded-lg shadow-lg p-4 mb-2">
          {messages.map((msg, index) => renderMessage(msg, index))}
          <div ref={messagesEndRef} />
        </div>
        <ToastContainerWrapper />
        {isSessionLoading && (
          <LoadingIndicator size={50} color="bg-indigo-500" />
        )}
        <div className="mt-auto">
          {user ? (
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Textarea
                placeholder="What is the difference between SQL and no SQL ..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow p-2 text-lg bg-zinc-100  text-indigo-900 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-indigo-400"
                rows={2}
              />
              <Button
                type="submit"
                disabled={isSessionLoading}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 rounded-lg transition duration-200 ease-in-out flex-grow flex items-center justify-center"
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
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login to Start Chatting
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white border-indigo-200">
                <div className="grid gap-4">
                  <h3 className="font-medium leading-none text-indigo-700">
                    Login Required
                  </h3>
                  <p className="text-sm text-indigo-600">
                    Please log in to use the chat feature and start learning
                    with CodeBuddy.
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/api/auth/login")}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white"
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
