import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET(req) {
  //const body = await req.json()
  const result = new Array();
  try {
    const data = await prisma.news.findMany({
      select: {
        id: true,
      },
    });
    data.map((v) => {
      result.push(v.id);
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
}
