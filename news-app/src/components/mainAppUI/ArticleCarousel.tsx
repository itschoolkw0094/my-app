"use client";

import { useEffect, useState } from "react";
import CommentTab from "./CommentTab";
import InputArea from "./InputArea";
import { ArticleType, CommentSet } from "@/types/data";
import Spinner from "../atoms/Spinner";
import apiRootUrl from "@/libs/val/apiRootUrl";
import { getCommentSetWithRated } from "@/services/commentFunctions";
import { useSession } from "next-auth/react";

// コメントを取得する（fetch）
const fetchComments = async (articleId: string, userId?: string) => {
  const prosParams = {
    newsId: articleId,
    userId: userId ? userId : "",
    type: "true",
  };
  const prosQuery = new URLSearchParams(prosParams);
  const consParams = {
    newsId: articleId,
    userId: userId ? userId : "",
    type: "false",
  };
  const consQuery = new URLSearchParams(consParams);
  const resProsComment = await fetch(`${apiRootUrl}/api/comment?${prosQuery}`, {
    cache: "no-cache",
  });
  const resConsComment = await fetch(`${apiRootUrl}/api/comment?${consQuery}`, {
    cache: "no-cache",
  });

  const resultProsComment = await resProsComment.json();
  const resultConsComment = await resConsComment.json();

  return {
    prosComments: resultProsComment,
    consComments: resultConsComment,
  } as CommentSet;
};

// コメントを取得する（Server Actions）
const fetchCommentsAlt = async (articleId: string, userId?: string) => {
  const prosComments = await getCommentSetWithRated(articleId, true, userId);
  const consComments = await getCommentSetWithRated(articleId, false, userId);

  return {
    prosComments: prosComments,
    consComments: consComments,
  } as CommentSet;
};

const ArticleCarousel = (props: { articles: ArticleType[] }) => {
  const { data, status } = useSession();
  const maxArticleNum = props.articles.length;
  const [articleNum, setArticleNum] = useState(0);
  const [comments, setComments] = useState<CommentSet>();
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(true);

  // 初期表示および記事ローテーション時にコメント取得
  useEffect(() => {
    setIsCommentLoading(true);
    fetchCommentsAlt(props.articles[articleNum].id, data?.user.id)
      .then((comments) => {
        setComments(comments);
      })
      .finally(() => setIsCommentLoading(false));
  }, [articleNum]);

  // 記事ローテーションボタン押下時のステート変更
  const rotate = (next: boolean) => {
    if (next) {
      setArticleNum((articleNum + 1) % maxArticleNum);
    } else {
      setArticleNum((articleNum + (maxArticleNum - 1)) % maxArticleNum);
    }
  };

  return (
    <>
      <div
        data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }'
        className="mt-[60px] relative"
      >
        <div className="hs-carousel relative overflow-hidden w-full min-h-[250px] bg-white rounded-lg sm:min-h-[198px]">
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
            <div className="hs-carousel-slide">
              <div className="bg-white sm:flex dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="flex-shrink-0 relative w-full overflow-hidden pt-[30%] sm:max-w-60 md:max-w-xs">
                  <img
                    className="bg-gray-300 size-full absolute top-0 start-0 object-contain"
                    src={props.articles[articleNum].image as string}
                    alt="Image Description"
                  />
                </div>
                <div className="flex flex-wrap w-full max-h-40">
                  <div className="w-full p-3 flex flex-col h-full sm:p-7">
                    <h3 className="text-md font-bold text-gray-800 dark:text-white">
                      {props.articles[articleNum].title}
                    </h3>
                    <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                      {props.articles[articleNum].content}
                      <span className="text-xs">※画像クリックで詳細</span>
                    </p>
                    <p className="text-xs mt-1 text-gray-500 dark:text-gray-500"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/[.1]"
          onClick={() => rotate(false)}
        >
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/[.1]"
          onClick={() => rotate(true)}
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </button>
      </div>
      {isCommentLoading ? (
        <div className="mx-auto mt-5">
          <Spinner />
        </div>
      ) : (
        <>
          <CommentTab comments={comments} />
          <InputArea articleId={props.articles[articleNum].id} />
        </>
      )}
    </>
  );
};

export default ArticleCarousel;
