import LoggedIn from "@/components/LoggedIn"
import { useAuthContext } from "@/contexts/AuthContext"
import Signin from "@/components/Signin"
import NotLoggedIn from "@/components/NotLoggedIn"

const Page = () => {
  return (
    <>
      <Signin />
      <NotLoggedIn />
    </> 
  )
}

export default Page