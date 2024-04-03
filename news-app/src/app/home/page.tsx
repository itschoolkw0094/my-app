import CommentTab from "@/components/mainAppUI/CommentTab";
import ArticleCarousel from "@/components/mainAppUI/ArticleCarousel";
import ArticleCard from "@/components/mainAppUI/ArticleCard";
import InputArea from "@/components/mainAppUI/InputArea";
import { ArticleType, CommentSet, CommentType } from "@/types/data";
import Header from "@/components/Nav/Header";
import prisma from "@/libs/prisma";

// ニュース情報をサーバーサイドで取得する
// 24時間で再取得

// 2024/04/03追記:
// Vercelへのデプロイ時にエラーが発生するため、fetchの利用は避ける。
// SCで内部APIを叩こうとすると、APIがビルドされる前にfetchが走り
// 正常にレスポンスを得られないため。（jsonへのparse段階でエラー発生）
// apiを先にビルドし、後から新しいブランチでデータフェッチすると
// 上手くいくという説がある。

// const fetchNews = async () => {
//   console.log("URLTEST:" + process.env.NEXT_PUBLIC_VERCEL_URL);
//   console.log(process.env.VERCEL_URL);
//   const resArticle = await fetch(
//     `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/news/getnews`,
//     {
//       next: { revalidate: 60 * 60 * 24 },
//       method: "GET",
//     }
//   );
//   console.log(resArticle);
//   const resultArticle = await resArticle.json();
//   return resultArticle;
// };

const getNews = async () => {
  try {
    const result = await prisma.news.findMany();
    return result as ArticleType[];
  } catch (error) {
    console.error(error);
  }
};

const Page = async () => {
  // const articles = await fetchNews();
  const articles = await getNews();

  return (
    <>
      <Header />
      <main className="flex flex-col w-full max-w-3xl mx-auto p-2">
        {/* <ArticleCard article={articles[0]} /> */}
        <ArticleCarousel articles={articles || ({} as ArticleType[])} />
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
