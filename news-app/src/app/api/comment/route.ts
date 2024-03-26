import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import dayjs from "dayjs"
import ja from 'dayjs/locale/ja'

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
    return NextResponse.json(result)
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
        type: false,
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