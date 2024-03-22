import CommentTab from "@/components/mainAppUI/CommentTab"
import ArticleCard from "@/components/mainAppUI/ArticleCard"
import InputArea from "@/components/mainAppUI/InputArea"
import { ArticleType, CommentType } from "@/types/data"

// ニュース情報をサーバーサイドで取得する
// 24時間で再取得
const fetchNews = async() => {
  const resArticle = await fetch("http://localhost:3000/api/news/getnews", {
    next: {revalidate: 60 * 60 * 24},
    method: "GET",
  });
  const resultArticle = await resArticle.json();
  return resultArticle
}

// コメントを取得する
const fetchComments = async(articleId: string) => {
  const prosParams = {
    newsId: articleId,
    type: 'true'
  }
  const prosQuery= new URLSearchParams(prosParams)
  const consParams = {
    newsId: articleId,
    type: 'false'
  }
  const consQuery= new URLSearchParams(consParams)
  const resProsComment = await fetch(`http://localhost:3000/api/comment/getcomment?${prosQuery}`, {cache:"no-cache"})
  const resConsComment = await fetch(`http://localhost:3000/api/comment/getcomment?${consQuery}`, {cache:"no-cache"})

  const resultProsComment = await resProsComment.json()
  const resultConsComment = await resConsComment.json()

  return {resultProsComment, resultConsComment}
}

const Page = async() => {
  const artciles = await fetchNews()
  const comments = await fetchComments(artciles[0].id)

  return(
    <>
      <main className="flex flex-col w-full max-w-3xl mx-auto p-2">
        <ArticleCard article={artciles[0]} />
        <CommentTab prosComments={comments.resultProsComment} consComments={comments.resultConsComment} />
        <InputArea />
      </main>
    </>
  )
}

export default Page