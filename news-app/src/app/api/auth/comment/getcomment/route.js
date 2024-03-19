import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req) {
  try {
    const result = prisma.comment.findMany();
  }
}