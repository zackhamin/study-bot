import { getSession } from "@auth0/nextjs-auth0";
import NotesPage from "./components/Notes/Notes";
import { Metadata } from "next";

async function fetchAllNotes(userId: string, page = 1, limit = 12) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/get-notes?userId=${encodeURIComponent(
        userId
      )}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

export const metadata: Metadata = {
  title: "Notes",
  description: "Your personal notes",
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Notes({ searchParams }: PageProps) {
  const session = await getSession();
  const userId = session?.user.sub;

  if (!userId) {
    return <div>User not authenticated</div>;
  }

  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;
  const limit = 12; // You can make this dynamic if needed

  const { notes, pagination } = await fetchAllNotes(userId, page, limit);

  if (!notes) return <div>Error fetching notes</div>;

  return <NotesPage initialNotes={notes} initialPagination={pagination} />;
}

// Ensure this page is dynamically rendered
export const dynamic = "force-dynamic";
