import { getSession } from "@auth0/nextjs-auth0";
import NotesPage from "./components/Notes/Notes";

export default async function Notes() {
  const notes = await fetchAllNotes();
  if (!notes) return <div>Error fetching notes</div>;

  return <NotesPage notes={notes}></NotesPage>;
}

async function fetchAllNotes() {
  const session = await getSession();
  const userId = session?.user.sub;

  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/get-notes?userId=${encodeURIComponent(userId)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data.notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}
