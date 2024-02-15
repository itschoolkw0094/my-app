import { signIn } from "next-auth/react"

type SigninData = {
  username: string,
  password: string,
}

const signin = async (data: SigninData) => {

  const { username, password } = data

    const result = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password
    })

    if(result?.error) {
      console.log('ERROR')
      return false
    } else {
      console.log('Logged in: ', username)
      return true
    }
}

export default signin