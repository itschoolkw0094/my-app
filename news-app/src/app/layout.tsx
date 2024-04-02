import PrelineLoader from "@/components/PrelineLoader";
import "./globals.css";
import { NextAuthProvider } from "@/libs/next-auth/provider";
import { Suspense } from "react";
import Loading from "./loading.js";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="bg-gray-100 h-full">
        <Suspense fallback={<Loading />}>
          <NextAuthProvider>{children}</NextAuthProvider>
        </Suspense>
      </body>
      <PrelineLoader />
    </html>
  );
}
