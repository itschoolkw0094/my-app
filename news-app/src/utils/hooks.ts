'user client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'


export const useAuthGuard = (): void => {
  const router = useRouter()

  const { data: session, status } = useSession()

  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    if(status !== "authenticated") {
      router.push('/signinpage')
    }
  }, [router, session, status])
}
