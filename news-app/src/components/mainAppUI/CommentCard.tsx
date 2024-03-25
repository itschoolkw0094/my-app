import { CommentType } from "@/types/data";

const CommentCard = (props: {comment: CommentType}) => {
  return (
    <div className="w-full flex flex-col bg-white p-1 md:p-2">
      <h3 className="text-md font-bold text-gray-600 dark:text-white">
        {props.comment.authorName ? props.comment.authorName : 'Anonymous'}
      </h3>
      <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
        @{props.comment.authorId}
      </p>
      <p className="mt-2 text-gray-800 dark:text-gray-400">
        {props.comment.content}
      </p>
      <p className="text-right">
        Good: {props.comment.goodCount}  Bad: {props.comment.badCount}
      </p>
    </div>
  );
};

export default CommentCard;
