"use client"

import { ApiContext } from "@/types/data";
import { AuthContextProvider, useAuthContext } from "@/contexts/AuthContext";
import useUser from "@/services/user/use-user";
import { useEffect } from "react";
import LoggedIn from "@/components/LoggedIn";
import NotLoggedIn from "@/components/NotLoggedIn";
import Signin from "@/components/Signin";

const context: ApiContext = {
  apiRootUrl: process.env.JSON_SERVER_API_PATH || '/'
}

export default function Home() {
  const { authUser, isLoading } = useAuthContext()
  
  return (
    <AuthContextProvider context={context}>

      {!authUser && !isLoading && (
        <>
        <Signin />
        <NotLoggedIn />
        </>  
      )}
      {authUser && (
        <LoggedIn />
      )}
    </AuthContextProvider>
  );
}
