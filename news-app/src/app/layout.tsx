"use client"

import "./globals.css";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ApiContext } from "@/types/data";

export const context: ApiContext = {
  apiRootUrl: 'http://localhost:8000/'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SWRConfig
    value={{
      shouldRetryOnError: false,
      fetcher,
    }}
    >
      <AuthContextProvider context={context}>
      <html lang="en">
        <body>{children}</body>
      </html>
      </AuthContextProvider>
    </SWRConfig>
  );
}
