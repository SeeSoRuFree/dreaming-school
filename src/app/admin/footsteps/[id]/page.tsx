'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import FootstepsDetail from '@/components/admin/footsteps/FootstepsDetail'

export default function FootstepDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isAdmin, isLoading } = useAdminAuth()
  const postId = params.id as string

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
      <FootstepsDetail postId={postId} />
    </AdminLayout>
  )
}
