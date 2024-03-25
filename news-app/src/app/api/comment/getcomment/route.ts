import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  try {
    const result = await prisma.comment.findMany({
      where: {
        newsId: searchParams.get('newsId') as string,
        type: searchParams.get('type') === 'true' ? true : false
      }
    })
    return NextResponse.json(result)
  } catch(error) {
    console.log(error)
  }
}