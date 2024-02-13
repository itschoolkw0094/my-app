import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'

export const useAuthGuard = (): void => {
  const router = useRouter()
  const { authUser, isLoading } = useAuthContext()
  console.log('User:', authUser)

  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    console.log(`${authUser} & ${isLoading}`)
    if (!authUser && !isLoading) {
    //const currentPath = router.pathname

    //   router.push({
    //     pathname: '/signinpage',
    //     query: {
    //       redirect_to: currentPath,
    //     },
    //   })
    // }
      console.log('FAILED')
      router.push('/signinpage')
    }
  }, [router, authUser, isLoading])
}
