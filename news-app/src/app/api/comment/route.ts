import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import dayjs from "dayjs"
import { CommentTypeWithRated } from "@/types/data"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  try {
    const result = await prisma.comment.findMany({
      where: {
        newsId: searchParams.get('newsId') as string,
        type: searchParams.get('type') === 'true' ? true : false
      },
      orderBy: {
        date: 'desc',
      }
    })

    const commentsWithRated: CommentTypeWithRated[] = []

    await Promise.all(result.map(async (comment) => {
      const rate = await prisma.rateForComment.findFirst(
        {
          where: {
            userId: searchParams.get('userId') as string,
            commentId: comment.id
          }
        }
      )
      await commentsWithRated.push(
        {
            ...comment,
            isRated: rate ? rate.type : null,
        }
        )
    }))
    return NextResponse.json(commentsWithRated)
  } catch(error) {
    console.log(error)
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log(body)
  try {
    await prisma.comment.create({
      data: {
        authorId: body.authorId,
        authorName: body.authorName,
        newsId: body.newsId,
        date: dayjs().format(),
        type: body.type,
        content: body.content,
      }
    })
    return NextResponse.json({
      message: "successfully posted."
    })
  } catch(error) {
    console.log(error)
  }
}