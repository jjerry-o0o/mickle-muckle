import { useState } from 'react'
import { authApi } from '@/api/authApi'
import type { AxiosError } from 'axios'

type Props = {
  onSuccess: () => void;
  onSwitchSignup: () => void;
  onSwitchForgot: () => void;
}

const LoginForm = ({ onSuccess, onSwitchSignup, onSwitchForgot }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const { token } = await authApi.login({ email, password })
      localStorage.setItem('token', token)
      onSuccess()
    } catch (err) {
      const message = (err as AxiosError<{ message: string }>).response?.data?.message
      setError(message ?? '로그인에 실패했습니다.')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="email" placeholder="이메일" value={email}
             onChange={(e) => setEmail(e.target.value)} className="border rounded px-3 py-2 text-sm" />
      <input type="password" placeholder="비밀번호" value={password}
             onChange={(e) => setPassword(e.target.value)} className="border rounded px-3 py-2 text-sm" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-orange-500 text-white rounded py-2 text-sm">로그인</button>
      <div className="flex justify-between text-sm text-muted-foreground">
        <button type="button" onClick={onSwitchSignup} className="text-orange-500 hover:underline">회원가입</button>
        <button type="button" onClick={onSwitchForgot} className="hover:underline">비밀번호 찾기</button>
      </div>
    </form>
  )
}

export { LoginForm }