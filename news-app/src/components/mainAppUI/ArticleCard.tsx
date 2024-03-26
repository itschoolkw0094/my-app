import { ArticleType } from "@/types/data";

const ArticleCard = (props: { article: ArticleType }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm sm:flex dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[30%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
        <img
          className="bg-gray-300 size-full absolute top-0 start-0 object-contain"
          src={props.article?.image as string}
          alt="Image Description"
        />
      </div>
      <div className="flex flex-wrap w-full max-h-40">
        <div className="w-full p-3 flex flex-col h-full sm:p-7">
          <h3 className="text-md font-bold text-gray-800 dark:text-white">
            {props.article?.title}
          </h3>
          <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
            {props.article?.content}
            <span className="text-xs">※画像クリックで詳細</span>
          </p>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-500"></p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
