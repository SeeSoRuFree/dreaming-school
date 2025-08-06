'use client'

import { useState, useEffect } from 'react'
import { authUtils } from '@/lib/auth'
import { User } from '@/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authUtils.getCurrentUser()
      setUser(currentUser)
      setIsLoading(false)
    }

    checkAuth()

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'dream-house-auth' || e.key === 'dream-house-users') {
        const currentUser = authUtils.getCurrentUser()
        setUser(currentUser)
      }
    }

    // Listen for auth state changes (login/logout in same tab)
    const handleAuthStateChange = () => {
      const currentUser = authUtils.getCurrentUser()
      setUser(currentUser)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(authUtils.getAuthStateChangeEvent(), handleAuthStateChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(authUtils.getAuthStateChangeEvent(), handleAuthStateChange)
    }
  }, [])

  const login = (email: string, password: string) => {
    const result = authUtils.login(email, password)
    if (result.success) {
      setUser(result.user!)
    }
    return result
  }

  const logout = () => {
    authUtils.logout()
    setUser(null)
  }

  const register = (userData: Omit<User, 'id' | 'createdAt' | 'role' | 'crewStatus'>) => {
    const result = authUtils.register(userData)
    if (result.success) {
      setUser(result.user!)
    }
    return result
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return false
    
    const success = authUtils.updateUser(user.id, updates)
    if (success) {
      setUser({ ...user, ...updates })
    }
    return success
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isCrew: (user?.role === 'crew' && user?.crewStatus === 'approved') || user?.role === 'admin',
    isAdmin: user?.role === 'admin',
    login,
    logout,
    register,
    updateUser
  }
}