"use client"

import PrelineLoader from "@/components/PrelineLoader";
import "./globals.css";
// import 'ress';
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
        <PrelineLoader />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

