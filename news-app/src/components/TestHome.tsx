"use client"

import { AuthContextProvider } from "@/contexts/AuthContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { Content } from "next/font/google";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ApiContext } from "@/types/data";
import signin from "@/services/auth/signin";

const context: ApiContext = {
  apiRootUrl: process.env.JSON_SERVER_API_PATH || '/'
}

export type SigninFormData = {
  username: string
  password: string
}

export const onSignin = () => {
  console.log('successfully signed in')
}

export const onSubmit = async (data: SigninFormData) => {
  const { username, password }  = data
  try {
    const resp = await signin(context, data)
    console.log(resp)
  } catch(err: unknown) {
    if(err instanceof Error) {
      window.alert(err.message)
    }
  } finally {
    onSignin && onSignin()
  }
}

const TestHome = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>()

  return (
    <AuthContextProvider context={context}>
    <form onSubmit={handleSubmit(onSubmit)}>
        {/* サインインユーザー名の入力 */}
        <input
          {...register('username', { required: true })}
          name="username"
          type="text"
          placeholder="ユーザー名"
          //hasError={!!errors.username}
        />
        {errors.username && (
            <p>ユーザー名は必須です</p>
        )}
        {/* サインインパスワードの入力 */}
        <input
          {...register('password', { required: true })}
          name="password"
          type="password"
          placeholder="パスワード"
          //hasError={!!errors.password}
        />
        {errors.password && (
            <p>パスワードは必須です</p>
        )}
      <button type="submit">
        サインイン
      </button>
    </form>
  </AuthContextProvider>
  )
}

export default TestHome