import CommentTab from "@/components/mainAppUI/CommentTab";
import ArticleCarousel from "@/components/mainAppUI/ArticleCarousel";
import ArticleCard from "@/components/mainAppUI/ArticleCard";
import InputArea from "@/components/mainAppUI/InputArea";
import { ArticleType, CommentSet, CommentType } from "@/types/data";
import Header from "@/components/Nav/Header";

// ニュース情報をサーバーサイドで取得する
// 24時間で再取得
const fetchNews = async () => {
  const resArticle = await fetch(
    `${process.env.NEXT_API_ROUTE}/api/news/getnews`,
    {
      next: { revalidate: 60 * 60 * 24 },
      method: "GET",
    }
  );
  const resultArticle = await resArticle.json();
  return resultArticle;
};

// コメントを取得する
const fetchComments = async (articleId: string) => {
  const prosParams = {
    newsId: articleId,
    type: "true",
  };
  const prosQuery = new URLSearchParams(prosParams);
  const consParams = {
    newsId: articleId,
    type: "false",
  };
  const consQuery = new URLSearchParams(consParams);
  const resProsComment = await fetch(
    `http://localhost:3000/api/comment?${prosQuery}`,
    { cache: "no-cache" }
  );
  const resConsComment = await fetch(
    `http://localhost:3000/api/comment?${consQuery}`,
    { cache: "no-cache" }
  );

  const resultProsComment = await resProsComment.json();
  const resultConsComment = await resConsComment.json();

  return { prosComments: resultProsComment, consComments: resultConsComment };
};

const Page = async () => {
  const articles = await fetchNews();
  //const comments = await fetchComments(articles[0].id);

  return (
    <>
      <Header />
      <main className="flex flex-col w-full max-w-3xl mx-auto p-2">
        {/* <ArticleCard article={articles[0]} /> */}
        <ArticleCarousel articles={articles} />
        {/* <CommentTab
          prosComments={comments.resultProsComment}
          consComments={comments.resultConsComment}
        />
        <InputArea articleId={articles[0].id} /> */}
      </main>
    </>
  );
};

export default Page;
