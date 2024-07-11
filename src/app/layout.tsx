"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import AuthButton from "@/components/AuthButton/AuthButton";
import Link from "next/link";
import Image from "next/image";
import {
  Code,
  MessageSquare,
  BookOpen,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

function Sidebar() {
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || "CodeBuddy";

  if (!user) return null;

  return (
    <aside
      className={cn(
        "bg-white h-screen fixed left-0 top-0 shadow-lg transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-indigo-700">
              {siteTitle}
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      <nav className="mt-8 flex-grow">
        <SidebarLink
          href="/chat"
          icon={MessageSquare}
          isCollapsed={isCollapsed}
        >
          Chat
        </SidebarLink>
        <SidebarLink href="/notes" icon={BookOpen} isCollapsed={isCollapsed}>
          Notes
        </SidebarLink>
        <SidebarLink
          href="/code-analysis"
          icon={Code}
          isCollapsed={isCollapsed}
        >
          Code Analysis
        </SidebarLink>
        <SidebarLink href="/contact" icon={Phone} isCollapsed={isCollapsed}>
          Contact
        </SidebarLink>
      </nav>
      <div className="p-4">
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "space-x-2"
          )}
        >
          <Image
            src={user.picture as string}
            alt={user.name || "User"}
            width={40}
            height={40}
            className="rounded-full border-2 border-indigo-400"
          />
          {!isCollapsed && <AuthButton />}
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  children,
  isCollapsed,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isCollapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600",
        isCollapsed && "justify-center"
      )}
    >
      <Icon className="h-5 w-5 mr-3" />
      {!isCollapsed && children}
    </Link>
  );
}

function Header() {
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

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  return (
    <>
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300",
          user ? "ml-16 lg:ml-64" : "ml-0"
        )}
      >
        {!user && <Header />}
        <main
          className={cn(
            "pt-20 p-8 min-h-screen",
            !user && "bg-gradient-to-br from-blue-100 to-purple-100"
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Layout>{children}</Layout>
        </body>
      </UserProvider>
    </html>
  );
}
