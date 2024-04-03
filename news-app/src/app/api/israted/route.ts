import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  try {
    const result = await prisma.rateForComment.findFirst({
      where: {
        userId: searchParams.get("userId") as string,
        commentId: searchParams.get("commentId") as string,
      },
    });

    if (result) return NextResponse.json({ rate: result.type ? 1 : -1 });
    else return NextResponse.json({ rate: 0 });
  } catch (error) {
    console.error(error);
  }
}
