"use client"

import { useForm } from 'react-hook-form'

export type SigninFormData = {
  username: string
  password: string
}

interface SigninFormProps {
  /**
   * サインインボタンを押した時のイベントハンドラ
   */
  onSignin?: (username: string, password: string) => void
}

/**
 * サインインフォーム
 */
const SigninForm = ({ onSignin }: SigninFormProps) => {
  // React Hook Formの使用
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>()
  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data
    onSignin && onSignin(username, password)
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
