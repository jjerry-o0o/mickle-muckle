import type { AxiosError } from 'axios';
import { useState } from 'react';
import { authApi } from '@/api/authApi';

type Props = {
  onSuccess: () => void;
  onSwitchLogin: () => void;
}

const SignupForm = ({ onSuccess, onSwitchLogin }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await authApi.signup({ email, password, nickname });
      onSuccess();
    } catch (err) {
      const message = (err as AxiosError<{ message: string }>).response?.data?.message;
      setError(message ?? '회원가입에 실패했습니다.');
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="email" placeholder="이메일" value={email}
             onChange={(e) => setEmail(e.target.value)} className="border rounded px-3 py-2 text-sm" />
      <input type="password" placeholder="비밀번호" value={password}
             onChange={(e) => setPassword(e.target.value)} className="border rounded px-3 py-2 text-sm" />
      <input type="text" placeholder="닉네임" value={nickname}
             onChange={(e) => setNickname(e.target.value)} className="border rounded px-3 py-2 text-sm" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-orange-500 text-white rounded py-2 text-sm">회원가입</button>
      <p className="text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{' '}
        <button type="button" onClick={onSwitchLogin} className="text-orange-500 hover:underline">로그인</button>
      </p>
    </form>
  )
}

export { SignupForm };