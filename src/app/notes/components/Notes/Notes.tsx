"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { NotesCard } from "../NotesCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateNote } from "../CreateNote";
import { Note } from "@/types";
import { searchNotes } from "../../actions";
import { ToastContainerWrapper, showToast } from "@/components/Notification";

export interface NotesPageProps {
  initialNotes: Note[];
}

export type ToastState = "Success" | "Error" | undefined;

export default function NotesPage({ initialNotes }: NotesPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useUser();

  const handleToast = useCallback((state: ToastState) => {
    if (state === "Success") {
      showToast({ message: "Note Saved!", type: "success" });
    } else if (state === "Error") {
      showToast({ message: "Unable to save", type: "error" });
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setNotes(initialNotes);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, initialNotes]);

  const handleSearch = async () => {
    if (!user?.sub) {
      console.error("User ID not available");
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await searchNotes(user.sub, searchTerm);
      setNotes(searchResults as any);
    } catch (error) {
      console.error("Error searching notes:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleNoteCreated = useCallback(() => {
    setIsOpen(false);
    handleToast("Success");
  }, [handleToast]);

  const handleNoteFailed = useCallback(() => {
    handleToast("Error");
  }, [handleToast]);

  return (
    <div className="flex flex-col px-4 py-8 h-full bg-gradient-to-br from-purple-200 to-blue-200 ">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <ToastContainerWrapper />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <CreateNote
              onNoteCreated={handleNoteCreated}
              onNoteError={handleNoteFailed}
            />
          </DialogContent>
        </Dialog>
      </div>
      {isSearching ? (
        <p>Searching...</p>
      ) : notes.length === 0 ? (
        <p>No notes found. Start creating some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NotesCard
              key={note.id}
              title={note.content.title}
              content={note.content.content}
              tags={note.content.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}
