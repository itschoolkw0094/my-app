import { CredentialsProvider } from "next-auth/providers";
import { randomUUID, randomBytes } from "crypto";

export const authOptions = {
  // providers
  providers: [
    // 認証用
    CredentialsProvider({
      id: 'user',
      name: 'User',
      credentials: {
        username: { label: 'ユーザー名', type: 'text', placeholder: 'メールアドレス' },
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/user`, {
            method: 'POST',
            body: JSON.stringify(credentials),
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