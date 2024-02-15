"use client"

import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export type SigninFormData = {
  username: string
  password: string
}

/**
 * サインインフォーム
 */
const SigninForm = () => {
  const router = useRouter()

  // React Hook Formの使用
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<SigninFormData>()

  const onSubmit = async (data: SigninFormData) => {
    signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl: '/'
    })
    .then((res) => {
      if (res?.error) {
        setError('username', { type: 'login' })
        setError('password', { type: 'login', message: 'usernameかpassworが違います' })
        return
      }
      router.push('/')
    })
    .catch((err) => {
      console.error(err)
    })
  }

  return (
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
  )
}

export default SigninForm
