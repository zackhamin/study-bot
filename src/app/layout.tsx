"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import AuthButton from "@/components/AuthButton/AuthButton";
import Link from "next/link";
import Image from "next/image";
import { Code, MessageSquare, BookOpen, Phone } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

function Header() {
  const { user } = useUser();
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || "CodeBuddy";

  return (
    <header className="bg-slate-900 text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-bold text-emerald-400">
            {siteTitle}
          </span>
        </div>
        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                href="/chat"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
              >
                <MessageSquare className="h-5 w-5 mr-1" />
                Chat
              </Link>
              <Link
                href="/notes"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
              >
                <BookOpen className="h-5 w-5 mr-1" />
                Notes
              </Link>
              <Link
                href="/code-analysis"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
              >
                <Code className="h-5 w-5 mr-1" />
                Code Analysis
              </Link>
              <Link
                href="/contact"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
              >
                <Phone className="h-5 w-5 mr-1" />
                Contact
              </Link>
              <div className="flex items-center space-x-3">
                <Image
                  src={user.picture as string}
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-emerald-400"
                />
              </div>
            </>
          ) : (
            <Link
              href="/"
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
          )}
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={`${inter.className} bg-slate-900 min-h-screen`}>
          <Header />
          <main className="pt-16">{children}</main>
        </body>
      </html>
    </UserProvider>
  );
}
