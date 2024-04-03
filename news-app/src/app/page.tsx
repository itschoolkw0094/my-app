"use client";

import { useAuthGuard } from "@/utils/hooks";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CommentTab from "@/components/mainAppUI/CommentTab";
import ArticleCard from "@/components/mainAppUI/ArticleCard";
import { ArticleType, CommentType } from "@/types/data";
import SideBar from "@/components/Nav/SideBar";
import InputArea from "@/components/mainAppUI/InputArea";

export default function Home() {
  return (
    <>
      <h1>test</h1>
    </>
  );
}
