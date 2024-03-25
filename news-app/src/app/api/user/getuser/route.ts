import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { UserForApp } from "@/types/data";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: searchParams.get('id') as string
      }
    })
    const user: UserForApp = {
      id: result?.id as string,
      name: result?.name as string,
      email: result?.email as string,
      image: result?.image as string,
    }
    return NextResponse.json(user)
  } catch(error) {
    console.log(error)
  }
}