import { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { IndexTab } from '@/components/customUi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { authApi } from '@/api/authApi';

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setNickname('');
    setError('');
  };

  const switchMode = (next: 'login' | 'signup') => {
    setMode(next);
    resetForm();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { token } = await authApi.login({ email, password });
      localStorage.setItem('token', token);
      setLoggedIn(true);
      setOpen(false);
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await authApi.signup({ email, password, nickname });
      switchMode('login');
    } catch {
      setError('회원가입에 실패했습니다. 이미 사용 중인 이메일 입니다.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      resetForm();
      setMode('login');
    }
  };

  return (
    <div className="w-[70px] h-full flex flex-col items-center px-[14px] py-[18px] gap-4 bg-white border-r border-[#e5e7eb]">
      <div className="flex flex-col items-end gap-3 w-full">
        <IndexTab
          linkTo="/"
          menuName="Month"
          borderColor="color-mix(in srgb, var(--income) 35%, transparent)"
          textColor="var(--income)"
          extraClass="shadow-[0px_12px_18px_0px_rgba(88,191,150,0.18)]"
        />
        <IndexTab
          linkTo="/total"
          menuName="TotalAssets"
          borderColor="var(--expense)"
          textColor="var(--expense)"
        />
        <IndexTab
          linkTo="/finance"
          menuName="Finance"
          borderColor="#839bbd"
          textColor="#111827"
        />
      </div>

      <div className="flex-1" />

      {loggedIn ? (
        <button
          onClick={handleLogout}
          className="w-10 h-10 rounded-full bg-[#f9fafb] border border-[#e5e7eb] flex items-center justify-center hover:bg-[#f3f4f6] transition-colors"
        >
          <LogOut size={18} className="text-[#6b7280]" />
        </button>
      ) : (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <button className="w-10 h-10 rounded-full bg-[#f9fafb] border border-[#e5e7eb] flex items-center justify-center hover:bg-[#f3f4f6] transition-colors">
              <LogIn size={18} className="text-[#6b7280]" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>{mode === 'login' ? '로그인' : '회원가입'}</DialogTitle>
            </DialogHeader>
            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="bg-orange-500 text-white rounded py-2 text-sm">
                  로그인
                </button>
                <p className="text-center text-sm text-muted-foreground">
                  계정이 없으신가요?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-orange-500 hover:underline"
                  >
                    회원가입
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="bg-orange-500 text-white rounded py-2 text-sm">
                  회원가입
                </button>
                <p className="text-center text-sm text-muted-foreground">
                  이미 계정이 있으신가요?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-orange-500 hover:underline"
                  >
                    로그인
                  </button>
                </p>
              </form>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export { SideBar };
