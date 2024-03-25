"use client"

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {

  const { status, data } = useSession();

  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setIsOpenMobileNav(!isOpenMobileNav);
    //console.log(isOpenMobileNav)
  }

  return (
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
                  {!isOpenMobileNav ? 
                  <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                :
                <svg
                      className="hs-collapse-open:block flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                }    
                    
                  </button>
                </div>
              </div>

              <div
                id="navbar-with-collapse"
                className="basis-full grow sm:block" 
              >
                <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                  {data ? 
                    <>
                      <p>You are successfully logged in</p>
                    <p>as {data?.user?.email}.</p>
                    <button
                      onClick={() =>
                        signOut({ callbackUrl: "/signin", redirect: false })
                      }
                    >
                      ログアウト
                    </button>
                    </>
                    :
                    <>
                      <p>You are not logged in.</p>
                      <Link href="/signin">Log in</Link>
                    </>
                  }
              </div>
                  </div>
              
            </nav>
          </header>
  )
}

export default Header