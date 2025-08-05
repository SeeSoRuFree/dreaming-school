'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useAlert } from '@/hooks/useAlert'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireCrew?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = false, 
  requireCrew = false, 
  requireAdmin = false,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { isAuthenticated, isCrew, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const { showAlert } = useAlert()

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !isAuthenticated) {
      showAlert('로그인이 필요합니다.')
      router.push(redirectTo)
      return
    }

    if (requireCrew && !isCrew) {
      showAlert('크루 봉사자만 접근할 수 있습니다.')
      router.push('/')
      return
    }

    if (requireAdmin && !isAdmin) {
      showAlert('관리자만 접근할 수 있습니다.')
      router.push('/')
      return
    }
  }, [isAuthenticated, isCrew, isAdmin, isLoading, requireAuth, requireCrew, requireAdmin, router, redirectTo])

  if (isLoading) {
    return (
      <div className="container-main section-padding">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) return null
  if (requireCrew && !isCrew) return null
  if (requireAdmin && !isAdmin) return null

  return <>{children}</>
}