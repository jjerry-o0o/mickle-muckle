import { useState } from 'react'
import { authApi } from '@/api/authApi'
import type { AxiosError } from 'axios'

type Step = 'email' | 'verify' | 'reset'

type Props = {
  onDone: () => void;
  onSwitchLogin: () => void;
}

const ForgotPasswordForm = ({ onDone, onSwitchLogin }: Props) => {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await authApi.sendEmailCode(email)
      setStep('verify')
    } catch (err) {
      const message = (err as AxiosError<{ message: string }>).response?.data?.message
      setError(message ?? '이메일 발송에 실패했습니다.')
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await authApi.verifyEmailCode(email, code)
      setStep('reset')
    } catch (err) {
      const message = (err as AxiosError<{ message: string }>).response?.data?.message
      setError(message ?? '인증에 실패했습니다.')
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await authApi.resetPassword(email, newPassword)
      onDone()
    } catch (err) {
      const message = (err as AxiosError<{ message: string }>).response?.data?.message
      setError(message ?? '비밀번호 재설정에 실패했습니다.')
    }
  }

  if (step === 'email') return (
    <form onSubmit={handleSendCode} className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">가입한 이메일을 입력하면 인증코드를 보내드립니다.</p>
      <input type="email" placeholder="이메일" value={email}
             onChange={(e) => setEmail(e.target.value)} className="border rounded px-3 py-2 text-sm" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-orange-500 text-white rounded py-2 text-sm">인증코드 발송</button>
      <p className="text-center text-sm text-muted-foreground">
        <button type="button" onClick={onSwitchLogin} className="text-orange-500 hover:underline">로그인 화면으로 돌아가기</button>
      </p>
    </form>
  )

  if (step === 'verify') return (
    <form onSubmit={handleVerify} className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">{email}로 발송된 인증코드를 입력하세요.</p>
      <input type="text" placeholder="인증코드 6자리" value={code}
             onChange={(e) => setCode(e.target.value)} className="border rounded px-3 py-2 text-sm" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-orange-500 text-white rounded py-2 text-sm">확인</button>
    </form>
  )

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">새 비밀번호를 입력하세요.</p>
      <input type="password" placeholder="새 비밀번호" value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)} className="border rounded px-3 py-2 text-sm" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-orange-500 text-white rounded py-2 text-sm">비밀번호 재설정</button>
    </form>
  )
}

export { ForgotPasswordForm }