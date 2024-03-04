"use client";

import { useAuthGuard } from "@/utils/hooks";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CommentTab from "@/components/mainAppUI/CommentTab";
import ArticleCard from "@/components/mainAppUI/ArticleCard";
import { ArticleType } from "@/types/data";

export default function Home() {
  // 認証ローディング判定
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const { status, data } = useSession();
  useEffect(() => {
    setIsAuthLoading(status !== "authenticated");
  }, [status]);
  useAuthGuard();

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

  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setIsOpenMobileNav(!isOpenMobileNav);
  };

  return (
    <>
      {isAuthLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
            <nav
              className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
              aria-label="Global"
            >
              <div className="flex items-center justify-between">
                <a
                  className="flex-none text-xl font-semibold dark:text-white"
                  href="#"
                >
                  Brand
                </a>
                <div className="sm:hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileNav()}
                    className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    data-hs-collapse="#navbar-with-collapse"
                    aria-controls="navbar-with-collapse"
                    aria-label="Toggle navigation"
                  >
                    <svg
                      className="hs-collapse-open:hidden flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                    <svg
                      className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                id="navbar-with-collapse"
                className={`${
                  isOpenMobileNav ? "" : "hidden"
                } basis-full grow sm:block`}
              >
                <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                  <a
                    className="font-medium text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                    aria-current="page"
                  >
                    Landing
                  </a>
                  <a
                    className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Account
                  </a>
                  <a
                    className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Work
                  </a>
                  <a
                    className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Blog
                  </a>
                </div>
              </div>
            </nav>
          </header>

          <main className="flex flex-col w-full max-w-3xl mx-auto p-2">
            <h1>You are successfully logged in</h1>
            <h2>as {data?.user?.email}.</h2>
            <button
              onClick={() =>
                signOut({ callbackUrl: "/signin", redirect: false })
              }
            >
              ログアウト
            </button>
            <ArticleCard article={articles[2]} />
            <CommentTab />
          </main>
        </>
      )}
    </>
  );
}
