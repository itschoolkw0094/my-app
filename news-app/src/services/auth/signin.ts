import { ApiContext, User } from "@/types/data"
import { fetcher } from "@/utils"
import axios from 'axios'


export type SigninParams = {
  username: string
  password: string
}

/**
 * 認証API（サインイン）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ログインユーザー
 */
const signin = async (
  context: ApiContext,
  params: SigninParams,
) : Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  )
  //return axios.post(`${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`, reqe)
}

export default signin
