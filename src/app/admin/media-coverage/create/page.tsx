'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function MediaCoverageCreatePage() {
  const router = useRouter()
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const { showAlert } = useAlert()

  const [mediaOutlet, setMediaOutlet] = useState('')
  const [title, setTitle] = useState('')
  const [articleUrl, setArticleUrl] = useState('')
  const [publishedAt, setPublishedAt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (authLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [isAdmin, authLoading, router])

  const handleSubmit = async () => {
    if (!mediaOutlet.trim()) {
      showAlert('언론사명을 입력해주세요.')
      return
    }

    if (!title.trim()) {
      showAlert('기사 제목을 입력해주세요.')
      return
    }

    if (!articleUrl.trim()) {
      showAlert('기사 URL을 입력해주세요.')
      return
    }

    if (!publishedAt) {
      showAlert('발행일을 선택해주세요.')
      return
    }

    try {
      new URL(articleUrl)
    } catch {
      showAlert('올바른 URL 형식이 아닙니다.')
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/media_coverage`,
        {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
          },
          body: JSON.stringify({
            media_outlet: mediaOutlet.trim(),
            title: title.trim(),
            article_url: articleUrl.trim(),
            published_at: new Date(publishedAt).toISOString(),
          }),
        }
      )

      if (!response.ok) {
        throw new Error('언론보도 등록에 실패했습니다.')
      }

      showAlert('언론보도가 등록되었습니다.')
      router.push('/admin/media-coverage')
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">새 언론보도 등록</h3>
          <div className="flex gap-2">
            <Button
              onClick={() => router.push('/admin/media-coverage')}
              variant="outline"
            >
              취소
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                언론사명 *
              </label>
              <input
                type="text"
                value={mediaOutlet}
                onChange={(e) => setMediaOutlet(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 조선일보, KBS 뉴스"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기사 제목 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="기사 제목을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기사 URL *
              </label>
              <input
                type="url"
                value={articleUrl}
                onChange={(e) => setArticleUrl(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/article"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                발행일 *
              </label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
