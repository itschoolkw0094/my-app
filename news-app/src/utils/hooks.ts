import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export const useAuthGuard = async() => {
  const router = useRouter()

  const { data: session, status } = useSession()
  console.log('STATUS:', status)

  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    if(status === "unauthenticated") {
      router.push('/signinpage')
    }
  }, [router, session, status])
}


