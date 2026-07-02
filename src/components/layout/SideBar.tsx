import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { IndexTab } from '@/components/customUi'
import { AuthDialog } from '@/components/customUi/AuthDialog'

const SideBar = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

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
        <AuthDialog onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  )
}

export { SideBar }
