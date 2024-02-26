"use client"

import { useAuthGuard } from "@/utils/hooks";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
          <h1>You are successfully logged in</h1>
          <h2>as {data?.user?.email}.</h2>
          <button onClick={ () => signOut({callbackUrl: '/signin', redirect: false}) }>ログアウト</button>
        </> 
      )}
    </>
  );
}
