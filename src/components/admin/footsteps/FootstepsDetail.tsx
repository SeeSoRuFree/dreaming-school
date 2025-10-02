'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { useConfirm } from '@/hooks/useConfirm'
import { FootstepPost } from '@/types'
import { Edit, Trash2, ArrowLeft, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface FootstepsDetailProps {
  postId: string
}

export default function FootstepsDetail({ postId }: FootstepsDetailProps) {
  const router = useRouter()
  const { showAlert } = useAlert()
  const { showConfirm } = useConfirm()
  const [post, setPost] = useState<FootstepPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const categoryNames = {
    building: '집짓기',
    gardening: '원예',
    science: '과학창의',
    rural: '농촌활성화',
    remodeling: '리모델링',
    general: '기타'
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  const fetchPost = async () => {
    try {
      setIsLoading(true)
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
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = await showConfirm({ message: '정말 삭제하시겠습니까?' })
    if (!confirmed) return

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/footsteps?id=eq.${postId}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.')
      }

      showAlert('삭제되었습니다.', 'success')
      router.push('/admin/footsteps')
    } catch (error) {
      showAlert('삭제에 실패했습니다.', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push('/admin/footsteps')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          목록으로
        </Button>
        <div className="flex gap-2">
          <Button onClick={() => router.push(`/admin/footsteps/edit/${postId}`)}>
            <Edit className="w-4 h-4 mr-2" />
            수정
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2 text-red-600" />
            삭제
          </Button>
        </div>
      </div>

      {/* 게시글 내용 */}
      <Card className="p-8">
        {/* 메타 정보 */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
              {categoryNames[post.programCategory]}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">{post.programName}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(post.createdAt, 'yyyy년 MM월 dd일', { locale: ko })}</span>
            </div>
            {post.updatedAt && (
              <span className="text-gray-400">
                (수정: {format(post.updatedAt, 'yyyy-MM-dd HH:mm', { locale: ko })})
              </span>
            )}
          </div>
        </div>

        {/* 본문 */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Card>
    </div>
  )
}
