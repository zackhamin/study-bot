"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Layout from "@/components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <body>
            <Layout>{children}</Layout>
          </body>
        </UserProvider>
      </QueryClientProvider>
    </html>
  );
}
