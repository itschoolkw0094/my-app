import { CommentType } from "@/types/data";

const CommentCard = (props: {comment: CommentType}) => {
  return (
    <div className="w-full flex flex-col bg-white p-4 md:p-5">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {props.comment.authorId}
      </h3>
      <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
        {props.comment.authorId}
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        {props.comment.content}
      </p>
    </div>
  );
};

export default CommentCard;
