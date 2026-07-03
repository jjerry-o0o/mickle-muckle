/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/api/authApi'

interface AuthContextValue {
  loggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
  const queryClient = useQueryClient()

  const login = async (email: string, password: string) => {
    const { token } = await authApi.login({ email, password })
    localStorage.setItem('token', token)
    setLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    queryClient.clear()
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

export { AuthProvider, useAuth }