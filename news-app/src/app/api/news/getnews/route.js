import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.news.findMany();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
}
