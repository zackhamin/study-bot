"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import AuthButton from "@/components/AuthButton/AuthButton";
import Link from "next/link";
import Image from "next/image";
import { Brain } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

function Header() {
  const { user } = useUser();

  return (
    <>
      {user && (
        <header className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-indigo-800">
                Uni Bot
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="/chat"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Chat
              </Link>
              <Link
                href="/notes"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Notes
              </Link>
              <Link
                href="/contact"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Contact
              </Link>
              <Image
                src={user.picture as string}
                alt={user.name || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <AuthButton />
            </nav>
          </div>
        </header>
      )}
      {!user && (
        <header className="fixed top-0 right-0 m-4">
          <AuthButton />
        </header>
      )}
    </>
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
        <body
          className={`${inter.className} bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen`}
        >
          <Header />
          <main className="pt-16">{children}</main>
        </body>
      </html>
    </UserProvider>
  );
}
