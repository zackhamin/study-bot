import { useUser } from "@auth0/nextjs-auth0/client";
import AuthButton from "../AuthButton/AuthButton";
import { Code } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const { user } = useUser();
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || "CodeBuddy";

  return (
    <header
      className={cn(
        "bg-white shadow-sm p-4 fixed top-0 right-0 left-0",
        user ? "left-16 lg:left-64" : "left-0"
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold text-indigo-700">
            {siteTitle}
          </span>
        </div>
        {!user && <AuthButton />}
      </div>
    </header>
  );
}
