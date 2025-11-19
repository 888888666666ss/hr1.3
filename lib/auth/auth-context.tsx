'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'
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
    // 检查当前的认证状态
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // 获取用户详细信息
          const { data: userData, error } = await supabase
            .from('users')
            .select('*, companies(*), roles(*)')
            .eq('id', session.user.id)
            .single()
          
          if (!error && userData) {
            const userInfo: User = {
              id: userData.id,
              name: userData.full_name || session.user.email || '用户',
              email: userData.email,
              role: userData.roles?.name as UserRole || 'employee'
            }
            setUser(userInfo)
            
            // 同时设置 cookie 以兼容现有的 middleware
            document.cookie = `auth_token=${session.access_token}; path=/; max-age=86400; SameSite=Lax`
          }
        } else {
          // 清除认证状态
          setUser(null)
          document.cookie = 'auth_token=; path=/; max-age=0'
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await checkAuth()
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          document.cookie = 'auth_token=; path=/; max-age=0'
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      if (data.user) {
        // 尝试获取用户信息，如果不存在则创建
        let { data: userData, error: userError } = await supabase
          .from('users')
          .select('*, companies(*), roles(*)')
          .eq('id', data.user.id)
          .single()
        
        if (userError && userError.code === 'PGRST116') {
          // 用户不存在，需要创建（这种情况在实际应用中应该在注册时处理）
          console.log('User not found in users table, creating...')
          
          // 这里可以添加创建用户记录的逻辑
          // 暂时使用默认用户信息
          const defaultUser: User = {
            id: data.user.id,
            name: data.user.email?.split('@')[0] || '用户',
            email: data.user.email || '',
            role: 'employee'
          }
          setUser(defaultUser)
        } else if (!userError && userData) {
          const userInfo: User = {
            id: userData.id,
            name: userData.full_name || data.user.email || '用户',
            email: userData.email,
            role: userData.roles?.name as UserRole || 'employee'
          }
          setUser(userInfo)
        }
        
        // 设置认证 cookie
        if (data.session) {
          document.cookie = `auth_token=${data.session.access_token}; path=/; max-age=86400; SameSite=Lax`
        }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error(error.message || '登录失败')
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      document.cookie = 'auth_token=; path=/; max-age=0'
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
      // 即使出错也要清除本地状态
      setUser(null)
      document.cookie = 'auth_token=; path=/; max-age=0'
      window.location.href = '/login'
    }
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      // 在实际应用中，这里应该调用 API 来更新用户角色
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
