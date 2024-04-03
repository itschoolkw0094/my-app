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
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [prosComment, setProsComment] = useState<CommentType[]>([]);
  const [consComment, setConsComment] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const resArticle = await fetch("/api/news/getnews", {
        method: "GET",
      });
      const resultArticle = await resArticle.json();
      await setArticles(resultArticle);
    };
    fetchNews();
  }, []);

  const fetchComments = async () => {
    if (articles[0] === undefined) return;

    const prosParams = {
      newsId: articles[0].id,
      type: "true",
    };
    const prosQuery = new URLSearchParams(prosParams);
    const consParams = {
      newsId: articles[0].id,
      type: "false",
    };
    const consQuery = new URLSearchParams(consParams);
    const resProsComment = await fetch(
      `http://localhost:3000/api/comment/getcomment?${prosQuery}`
    );
    const resConsComment = await fetch(
      `http://localhost:3000/api/comment/getcomment?${consQuery}`
    );

    const resultProsComment = await resProsComment.json();
    const resultConsComment = await resConsComment.json();

    setProsComment(resultProsComment);
    setConsComment(resultConsComment);
  };
  fetchComments();

  return (
    <main className="flex flex-col w-full max-w-3xl mx-auto p-2">
      <ArticleCard article={articles[0]} />
      <CommentTab prosComments={prosComment} consComments={consComment} />
      <InputArea />
    </main>
  );
}
