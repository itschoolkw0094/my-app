import CommentCard from "./CommentCard";
import { CommentType, CommentTypeWithRated } from "@/types/data";

const CommentCardList = (props: { comments?: CommentTypeWithRated[] }) => {
  return (
    <ul className="w-full h-full flex flex-col mb-10">
      <>
        {props.comments?.map((comment, key) => {
          return (
            <li
              key={key}
              className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white"
            >
              <CommentCard comment={comment} />
            </li>
          );
        })}
      </>
    </ul>
  );
};

export default CommentCardList;
