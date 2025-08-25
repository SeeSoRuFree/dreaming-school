'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAdminAuth()
  }, [])

  const checkAdminAuth = () => {
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
        } else {
          // 세션 만료
          localStorage.removeItem('adminAuth')
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('Admin auth check failed:', error)
      setIsAdmin(false)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('adminAuth')
    setIsAdmin(false)
    router.push('/admin/login')
  }

  return {
    isAdmin,
    isLoading,
    logout,
    checkAdminAuth
  }
}