"use client"

import signout from "@/services/auth/signout";
import { useAuthGuard } from "@/utils/hooks";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";
import { getIsAuthLoading } from "@/utils/getStatus";

// const signOutInternal = () => {
//   const router = useRouter()
//   signOut()
//   router.push('/signinpage')
// }

export default function Home() {

  const isLoading = getIsAuthLoading()
  useAuthGuard()
  
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>You are successfully logged in.</h1>
          <button onClick={ () => signOut({callbackUrl: '/', redirect: false}) }>ログアウト</button>
        </> 
      )}
    </>
  );
}
