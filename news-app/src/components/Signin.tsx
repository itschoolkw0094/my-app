import type { NextPage } from "next";
import { useRouter } from "next/navigation"
import SigninFormContainer from "@/containers/SigninFormContainer";

const Signin: NextPage = () => {
  const router = useRouter()
  const handleSignin = async (err?: Error) => {
    const redirectTo =  '/'

    console.log('Redirecting', redirectTo)
    await router.push(redirectTo)
  }

  return (
    <SigninFormContainer onSignin={handleSignin} />
  )
}

export default Signin