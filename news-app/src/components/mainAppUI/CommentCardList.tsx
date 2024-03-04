"use client";

import { useState, useCallback } from "react";
import CommentCard from "./CommentCard";

const CommentCardList = () => {
  return (
    <ul className="w-full h-full flex flex-col">
      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white">
        Profile
      </li>
      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white">
        Settings
      </li>
      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white">
        Newsletter
      </li>
      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white">
        <CommentCard
          userIconUrl=""
          userName="Taro Tanaka"
          userId="@TaroTanaka"
          content="This is a sample comment.This is a sample comment. This is a sample comment."
          goodCount={0}
          badCount={0}
        />
      </li>
    </ul>
  );
};

export default CommentCardList;
