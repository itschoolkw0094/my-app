"use client"

import { ApiContext } from "@/types/data";
import { AuthContextProvider, useAuthContext } from "@/contexts/AuthContext";
import useUser from "@/services/user/use-user";
import { useEffect } from "react";
import LoggedIn from "@/components/LoggedIn";
import NotLoggedIn from "@/components/NotLoggedIn";
import Signin from "@/components/Signin";
import TestHome from "@/components/TestHome";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils";
import { useAuthGuard } from "@/utils/hooks";

export default function Home() {

  useAuthGuard()
  
  return (
    <>
      <h1>You are successfully logged in.</h1>
    </>
  );
}
