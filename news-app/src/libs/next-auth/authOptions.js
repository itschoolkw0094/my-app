import CredentialsProvider from "next-auth/providers/credentials";
import { randomUUID, randomBytes } from "crypto";

export const authOptions = {
  // providers
  providers: [
    // 認証用
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'ユーザー名', type: 'text', placeholder: 'ユーザー名' },
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials) {
        const dataUsername = credentials.username
        const dataPassword = credentials.password
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify({username: dataUsername, password: dataPassword}),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        const user = res.json()

        if(res.ok && user) {
          return user
        }

        return null
      },

    }),
  ],

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