"use client";

import PrelineLoader from "@/components/PrelineLoader";
import "./globals.css";
// import 'ress';
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Nav/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="dark:bg-slate-900 bg-gray-100 h-full">
        <PrelineLoader />
        <SessionProvider>
          <Header/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
