import CommentTab from "@/components/mainAppUI/CommentTab";
import ArticleCarousel from "@/components/mainAppUI/ArticleCarousel";
import ArticleCard from "@/components/mainAppUI/ArticleCard";
import InputArea from "@/components/mainAppUI/InputArea";
import { ArticleType, CommentSet, CommentType } from "@/types/data";
import Header from "@/components/Nav/Header";

// ニュース情報をサーバーサイドで取得する
// 24時間で再取得
const fetchNews = async () => {
  console.log("URLTEST:" + process.env.NEXT_PUBLIC_VERCEL_URL);
  console.log(process.env.VERCEL_URL);
  const resArticle = await fetch(
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/news/getnews`,
    {
      next: { revalidate: 60 * 60 * 24 },
      method: "GET",
    }
  );
  console.log(resArticle.body);
  const resultArticle = await resArticle.json();
  return resultArticle;
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
