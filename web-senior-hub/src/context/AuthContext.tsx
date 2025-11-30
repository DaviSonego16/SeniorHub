import { createContext, useContext, useState } from 'react'
import { api } from '../api/api'

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextProps {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>(null!)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  async function login(email: string, password: string) {
    setLoading(true)
    const response = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', response.data.token)
    setUser(response.data.user)
    setLoading(false)
  }

  async function register(data: any) {
    setLoading(true)
    await api.post('/user', data)
    setLoading(false)
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
