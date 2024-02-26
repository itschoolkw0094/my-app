"use client"

import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { hashSync, genSaltSync, compare } from "bcryptjs-react";


export type SigninFormData = {
  email: string
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
    console.log('signin...')
    const salt = await genSaltSync(12)
    const hashedPassword = await hashSync(data.password, salt)
    signIn('Credentials', {
      redirect: false,
      email: data.email,
      password: hashedPassword,
      callbackUrl: '/'
    })
    .then((res) => {
      if (res?.error) {
        setError('email', { type: 'login' })
        setError('password', { type: 'login', message: 'emailかpassworが違います' })
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
        {/* サインインメールアドレスの入力 */}
        <input
          {...register('email', { required: true })}
          name="email"
          type="email"
          placeholder="メールアドレス"
          //hasError={!!errors.username}
        />
        {errors.email && (
            <p>メールアドレスは必須です</p>
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
