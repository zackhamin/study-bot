"use client";

import React, { useEffect, useState } from "react";
import { Note, getNotes } from "./actions";
import { NotesCard } from "./components/NotesCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateNote } from "./components/CreateNote";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
      } catch (e) {
        setError(true);
      }
    }
    fetchNotes();
  }, []);

  if (error) return <div>Error fetching notes: {error}</div>;

  const handleNoteCreated = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="flex flex-row-reverse items-center mb-6">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out self-end"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <CreateNote />
            {/* <CreateNote onNoteCreated={handleNoteCreated} /> */}
          </DialogContent>
        </Dialog>
      </div>
      {notes.length === 0 ? (
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
