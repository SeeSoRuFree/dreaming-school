'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import FootstepsList from '@/components/admin/footsteps/FootstepsList'

export default function AdminFootstepsPage() {
  const router = useRouter()
  const { isAdmin, isLoading } = useAdminAuth()

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

  if (!isAdmin) {
    return null
  }

  return (
    <AdminLayout>
      <FootstepsList />
    </AdminLayout>
  )
}
