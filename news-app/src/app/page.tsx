"use client";

import { useAuthGuard } from "@/utils/hooks";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CommentTab from "@/components/mainAppUI/CommentTab";
import ArticleCard from "@/components/mainAppUI/ArticleCard";
import { ArticleType } from "@/types/data";
import SideBar from "@/components/Nav/SideBar";
import InputArea from "@/components/mainAppUI/InputArea";

export default function Home() {
  // 認証ローディング判定
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const { status, data } = useSession();
  useEffect(() => {
    setIsAuthLoading(status !== "authenticated");
  }, [status]);
  //useAuthGuard();

  // const [articleIds, setArticleIds] = useState<string[]>([]);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const resData = await fetch("http://localhost:3000/api/news/getnews", {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      const resultData = await resData.json();
      setArticles(resultData);
    };
    fetchNews();
    //console.log(articles);
  }, []);

  return (
    <>
      {/* {isAuthLoading ? (
        <h1>Loading...</h1>
      ) : ( */}
        <>

          {/* <SideBar isShownSideBar={isOpenMobileNav}/> */}

          <main className="flex flex-col w-full max-w-3xl mx-auto p-2">
            <ArticleCard article={articles[2]} />
            <CommentTab />
            <InputArea />
          </main>
        </>
      {/* )} */}
    </>
  );
}
