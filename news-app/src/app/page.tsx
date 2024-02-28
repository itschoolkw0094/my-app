"use client"

import { useAuthGuard } from "@/utils/hooks";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CommentTab from "@/components/mainAppUI/CommentTab";

export default function Home() {

// 認証ローディング判定
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)
  const { status, data } = useSession()
  useEffect(() => {
    setIsAuthLoading(status !== 'authenticated')
  }, [status])
  useAuthGuard()
  
  return (
    <>
      {isAuthLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <main className="w-full max-w-3xl mx-auto p-6">
          <h1>You are successfully logged in</h1>
          <h2>as {data?.user?.email}.</h2>
          <button onClick={ () => signOut({callbackUrl: '/signin', redirect: false}) }>ログアウト</button>
          <CommentTab />
        </main>
        </> 
      )}
    </>
  );
}
