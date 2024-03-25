import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req) {
  const body = await req.json()
  console.log(body)
  try {
    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashedPassword: body.password,
      }
    })
    return NextResponse.json({
      message: "successfully registered."
    })
  } catch(error) {
    if(error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({
        message: error.code
      })
    }
  }
}