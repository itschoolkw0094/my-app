import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { hashSync, genSaltSync } from "bcryptjs-react";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req) {
  const body = await req.json()
  console.log(body)
  // const salt = genSaltSync(12)
  // const hashed = hashSync(body.password, salt)
  try {
    await prisma.user.create({
      data: {
        email: body.email,
        hashedPassword: body.password,
      }
    })
    console.log(prisma.user.findUnique())
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