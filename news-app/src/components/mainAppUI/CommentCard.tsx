'use client'

import { CommentPropsType } from "@/types/data"


const CommentCard = (commentProps: CommentPropsType) => {

  return (
    <div className="w-full flex flex-col bg-white p-4 md:p-5">
  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
    {commentProps.userName}
  </h3>
  <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
    {commentProps.userId}
  </p>
  <p className="mt-2 text-gray-500 dark:text-gray-400">
    {commentProps.content}
  </p>
  {/* <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
    Card link
    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  </a> */}
</div>
  )
}

export default CommentCard