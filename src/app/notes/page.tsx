import { getNotes } from "./actions";
import { NotesCard } from "./components/NotesCard";

export default async function NotesPage() {
  let notes;
  let error;

  try {
    notes = await getNotes();
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  if (error) return <div>Error fetching notes: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Notes</h1>
      {notes && notes.length === 0 ? (
        <p>No notes found. Start creating some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes &&
            notes.map((note) => (
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
