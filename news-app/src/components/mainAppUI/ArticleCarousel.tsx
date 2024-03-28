"use client";

import { useEffect, useState } from "react";
import CommentTab from "./CommentTab";
import CommentCardList from "./CommentCardList";
import InputArea from "./InputArea";
import { ArticleType, CommentType, CommentSet } from "@/types/data";

// コメントを取得する
const fetchComments = async (articleId: string) => {
  const prosParams = {
    newsId: articleId,
    type: "true",
  };
  const prosQuery = new URLSearchParams(prosParams);
  const consParams = {
    newsId: articleId,
    type: "false",
  };
  const consQuery = new URLSearchParams(consParams);
  const resProsComment = await fetch(
    `http://localhost:3000/api/comment?${prosQuery}`
  );
  const resConsComment = await fetch(
    `http://localhost:3000/api/comment?${consQuery}`
  );

  const resultProsComment = await resProsComment.json();
  const resultConsComment = await resConsComment.json();

  return {
    prosComments: resultProsComment,
    consComments: resultConsComment,
  } as CommentSet;
};

const ArticleCarousel = (props: { articles: ArticleType[] }) => {
  const [articleNum, setArticleNum] = useState(0);
  const [comments, setComments] = useState<CommentSet>();

  // useEffect(() => {
  //   fetchComments(props.articles[articleNum].id).then((comments) => {
  //     setComments(comments);
  //   });
  // }, [articleNum]);

  return (
    <>
      <div
        data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }'
        className="relative"
      >
        <div className="hs-carousel relative overflow-hidden w-full min-h-[250px] bg-white rounded-lg sm:min-h-[198px]">
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
            {props.articles.map((article) => (
              <>
                <div className="hs-carousel-slide">
                  <div className="bg-white sm:flex dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <div className="flex-shrink-0 relative w-full overflow-hidden pt-[30%] sm:max-w-60 md:max-w-xs">
                      <img
                        className="bg-gray-300 size-full absolute top-0 start-0 object-contain"
                        src={article.image as string}
                        alt="Image Description"
                      />
                    </div>
                    <div className="flex flex-wrap w-full max-h-40">
                      <div className="w-full p-3 flex flex-col h-full sm:p-7">
                        <h3 className="text-md font-bold text-gray-800 dark:text-white">
                          {article.title}
                        </h3>
                        <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                          {article.content}
                          <span className="text-xs">※画像クリックで詳細</span>
                        </p>
                        <p className="text-xs mt-1 text-gray-500 dark:text-gray-500"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/[.1]"
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
    </>
  );
};

export default ArticleCarousel;
