import { CommentType } from "@/types/data";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { sendRate } from "@/services/rates";

const CommentCard = (props: { comment: CommentType }) => {
  const [isPending, startTransition] = useTransition();
  const { data, status } = useSession();

  return (
    <div className="w-full flex flex-col bg-white p-0.5 md:p-0.5">
      <h3 className="text-lg font-bold text-gray-600 dark:text-white">
        {props.comment.authorName || "Anonymous"}
      </h3>
      <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
        @{props.comment.authorId}
      </p>
      <p className="mt-2 text-gray-800 dark:text-gray-400">
        {props.comment.content}
      </p>
      <p className="text-right">
        {/* Rating */}
        <div className="mt-2 flex flex-row justify-end items-center gap-x-2">
          {/* <h3 className="text-gray-800 dark:text-white">Rate This Comment !</h3> */}
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={() =>
              startTransition(() =>
                sendRate(data?.user.id || "Anonymous", props.comment.id, true)
              )
            }
          >
            <svg
              className="flex-shrink-0 size-4"
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
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            Good
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              className="flex-shrink-0 size-4"
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
              <path d="M17 14V2" />
              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
            </svg>
            Bad
          </button>
        </div>
        {/* Good: {props.comment.goodCount} Bad: {props.comment.badCount} */}
      </p>
    </div>
  );
};

export default CommentCard;
