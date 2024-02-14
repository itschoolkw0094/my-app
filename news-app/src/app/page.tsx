"use client"

import { useAuthGuard } from "@/utils/hooks";
import signout from "@/services/auth/signout";

export default function Home() {

  useAuthGuard()
  
  return (
    <>
      <h1>You are successfully logged in.</h1>
      <button onClick={ () => signout }>ログアウト</button>
    </>
  );
}
