'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import FootstepsForm from '@/components/admin/footsteps/FootstepsForm'

export default function NewFootstepPage() {
  const router = useRouter()
  const { isAdmin, isLoading, currentUser } = useAdminAuth()

  useEffect(() => {
    if (isLoading) return
    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [isAdmin, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin || !currentUser) {
    return null
  }

  return (
    <AdminLayout>
      <FootstepsForm currentUser={currentUser} mode="create" />
    </AdminLayout>
  )
}
