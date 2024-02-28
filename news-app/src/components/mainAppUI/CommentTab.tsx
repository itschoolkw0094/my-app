'use client'

import { useCallback, useState } from "react"
import CommentCardList from "./CommentCardList"

const CommentTab = () => {
  const [selectedTab, setSelectedTab] = useState<Number>(0)

  const onClickTab = useCallback((tabNumber: Number) => {
    setSelectedTab(tabNumber)
  }, [])


  return (
    <>
      <nav className="relative z-0 flex border rounded-xl overflow-hidden dark:border-gray-700" aria-label="Tabs" role="tablist">
  <button type="button" onClick={() => onClickTab(0)} className={`hs-tab-active:border-b-green-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white dark:hs-tab-active:border-b-blue-600 relative min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-400 ${selectedTab===0 ? "active" : ""}`} id="bar-with-underline-item-1" data-hs-tab="#bar-with-underline-1" aria-controls="bar-with-underline-1" role="tab">
    Pros
  </button>
  <button type="button" onClick={() => onClickTab(1)} className={`hs-tab-active:border-b-red-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white dark:hs-tab-active:border-b-blue-600 relative min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-400  ${selectedTab===1 ? "active" : ""}`} id="bar-with-underline-item-2" data-hs-tab="#bar-with-underline-2" aria-controls="bar-with-underline-2" role="tab">
    Cons
  </button>
  {/* <button type="button" className="hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white dark:hs-tab-active:border-b-blue-600 relative min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-400" id="bar-with-underline-item-3" data-hs-tab="#bar-with-underline-3" aria-controls="bar-with-underline-3" role="tab">
    Tab 3
  </button> */}
</nav>

<div className="mt-3">
  <div id="bar-with-underline-1" role="tabpanel" className={`${selectedTab===0 ? "" : "hidden"}`} aria-labelledby="bar-with-underline-item-1">
    {/* <p className="text-gray-500 dark:text-gray-400">
      This is the <em className="font-semibold text-gray-800 dark:text-gray-200">first</em> item's tab body.
    </p> */}
    <CommentCardList />
  </div>
  <div id="bar-with-underline-2"  role="tabpanel" className={`${selectedTab===1 ? "" : "hidden"}`} aria-labelledby="bar-with-underline-item-2">
    <p className="text-gray-500 dark:text-gray-400">
      This is the <em className="font-semibold text-gray-800 dark:text-gray-200">second</em> item's tab body.
    </p>
  </div>
  {/* <div id="bar-with-underline-3" className="hidden" role="tabpanel" aria-labelledby="bar-with-underline-item-3">
    <p className="text-gray-500 dark:text-gray-400">
      This is the <em className="font-semibold text-gray-800 dark:text-gray-200">third</em> item's tab body.
    </p>
  </div> */}
</div>
    </>
  )
}

export default CommentTab