'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User, UserRole } from './roles'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: 'Admin User',
      email,
      role: 'hr_admin',
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    document.cookie = 'auth_token=mock-token; path=/; max-age=86400'
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    document.cookie = 'auth_token=; path=/; max-age=0'
    window.location.href = '/login'
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      window.location.reload()
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
