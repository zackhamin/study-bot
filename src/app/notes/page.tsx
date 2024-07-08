"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { NotesCard } from "./components/NotesCard";

type Note = {
  id: string;
  content: {
    title: string;
    tags: string[];
    content: string;
  };
};

const NotesPage = () => {
  const { user, error, isLoading } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      if (user?.sub) {
        try {
          const res = await fetch(
            `/api/get-notes?userId=${encodeURIComponent(user.sub)}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

          const data = await res.json();
          setNotes(data.notes);
        } catch (error) {
          console.error("Error fetching notes:", error);
          setFetchError(error instanceof Error ? error.message : String(error));
        }
      }
    };

    fetchNotes();
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (fetchError) return <div>Error fetching notes: {fetchError}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Notes</h1>
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
};

export default NotesPage;
