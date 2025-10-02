'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useAlert } from '@/hooks/useAlert'
import { AdminLayout } from '@/components/admin/AdminLayout'
import FootstepsForm from '@/components/admin/footsteps/FootstepsForm'
import { FootstepPost } from '@/types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function EditFootstepPage() {
  const router = useRouter()
  const params = useParams()
  const { showAlert } = useAlert()
  const { isAdmin, isLoading, currentUser } = useAdminAuth()
  const [post, setPost] = useState<FootstepPost | null>(null)
  const [isLoadingPost, setIsLoadingPost] = useState(true)
  const postId = params.id as string

  useEffect(() => {
    if (isLoading) return
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }
    fetchPost()
  }, [isAdmin, isLoading])

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/footsteps?id=eq.${postId}&select=*`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('데이터를 불러오지 못했습니다.')
      }

      const data = await response.json()
      if (data.length === 0) {
        showAlert('게시글을 찾을 수 없습니다.', 'error')
        router.push('/admin/footsteps')
        return
      }

      const item = data[0]
      const formattedData = {
        id: item.id,
        title: item.title,
        content: item.content,
        programCategory: item.program_category,
        programName: item.program_name,
        authorId: item.author_id,
        authorName: item.author_name,
        createdAt: new Date(item.created_at),
        updatedAt: item.updated_at ? new Date(item.updated_at) : undefined
      }
      setPost(formattedData)
    } catch (error) {
      showAlert('데이터를 불러오는데 실패했습니다.', 'error')
      router.push('/admin/footsteps')
    } finally {
      setIsLoadingPost(false)
    }
  }

  if (isLoading || isLoadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin || !currentUser || !post) {
    return null
  }

  return (
    <AdminLayout>
      <FootstepsForm currentUser={currentUser} initialData={post} mode="edit" />
    </AdminLayout>
  )
}
