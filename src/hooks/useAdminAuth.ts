'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types'

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const router = useRouter()

  const checkAdminAuth = useCallback(() => {
    try {
      const adminAuth = localStorage.getItem('adminAuth')
      if (adminAuth) {
        const auth = JSON.parse(adminAuth)
        // 24시간 후 자동 로그아웃
        const loginTime = new Date(auth.loginTime)
        const now = new Date()
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)

        if (hoursDiff < 24 && auth.isAdmin) {
          setIsAdmin(true)
          // currentUser 설정
          if (auth.user) {
            setCurrentUser(auth.user)
          }
        } else {
          // 세션 만료
          localStorage.removeItem('adminAuth')
          setIsAdmin(false)
          setCurrentUser(null)
        }
      } else {
        setIsAdmin(false)
        setCurrentUser(null)
      }
    } catch (error) {
      console.error('Admin auth check failed:', error)
      setIsAdmin(false)
      setCurrentUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAdminAuth()
  }, [checkAdminAuth])

  const logout = useCallback(() => {
    localStorage.removeItem('adminAuth')
    setIsAdmin(false)
    setCurrentUser(null)
    router.push('/admin/login')
  }, [router])

  return {
    isAdmin,
    isLoading,
    currentUser,
    logout,
    checkAdminAuth
  }
}