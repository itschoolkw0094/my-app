import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomUUID, randomBytes } from "crypto";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compareSync } from "bcryptjs-react";
import prisma from "../prisma";

export const authOptions = {
  
  // providers
  providers: [
    // 認証用
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'メールアドレス', type: 'email', placeholder: 'メールアドレス' },
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials) {
        //console.log(credentials)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        console.log(user)
        if(!user) return null
        const isValid = await compareSync(
          credentials.password,
          user.hashedPassword,
        )
        if(isValid) return user

        return null
      },

    }),
  ],

  adapter: PrismaAdapter(prisma),

  callbacks: {
    
  },

  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    maxAge: 3 * 24 * 60 * 60
  },

  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  }
}