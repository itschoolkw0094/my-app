import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { hash } from "bcryptjs-react";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req) {
  const body = req.json()
  const hashed = await hash(body.password, 12)
  try {
    await prisma.user.create({
      data: {
        email: body.email,
        hashedPassword: hashed,
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