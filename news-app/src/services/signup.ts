import { hash } from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { PostDataType } from "@/types/data"

const prisma = new PrismaClient()

export default async function signUp(postData: PostDataType): Promise<string | undefined> {
  const hashed = await hash(postData.password, 12)
  try {
    await prisma.user.create({
      data: {
        email: postData.email,
        hashedPassword: hashed,
      }
    })
    return 'ok'
  } catch (error) {
    if(error instanceof PrismaClientKnownRequestError) {
      return error.code
    }
  }
}