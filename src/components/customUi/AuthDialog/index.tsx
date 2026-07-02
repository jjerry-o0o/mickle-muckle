import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui'
import { useState } from 'react'
import { LogIn } from 'lucide-react'
import { LoginForm } from '@/components/customUi/AuthDialog/LoginForm'
import { SignupForm } from '@/components/customUi/AuthDialog/SignupForm'
import { ForgotPasswordForm } from '@/components/customUi/AuthDialog/ForgotPasswordForm'

type Mode = 'login' | 'signup' | 'forgot';

type Props = {
  onLogin: () => void;
}
const AuthDialog = ({ onLogin }: Props) => {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('login')

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) setMode('login')
  }

  const titleMap: Record<Mode, string> = {
    login: '로그인',
    signup: '회원가입',
    forgot: '비밀번호 찾기',
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="w-10 h-10 rounded-full bg-[#f9fafb] border border-[#e5e7eb] flex items-center justify-center hover:bg-[#f3f4f6] transition-colors">
          <LogIn size={18} className="text-[#6b7280]" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{titleMap[mode]}</DialogTitle>
        </DialogHeader>
        {mode === 'login' && (
          <LoginForm
            onSuccess={() => { onLogin(); setOpen(false) }}
            onSwitchSignup={() => setMode('signup')}
            onSwitchForgot={() => setMode('forgot')} />
        )}
        {mode === 'signup' && (
          <SignupForm
            onSuccess={() => setMode('login')}
            onSwitchLogin={() => setMode('login')}
          />
        )}
        {mode === 'forgot' && (
          <ForgotPasswordForm onDone={() => setMode('login')} onSwitchLogin={() => setMode('login')} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export { AuthDialog }