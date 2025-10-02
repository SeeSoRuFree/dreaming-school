'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { MediaCoverage } from '@/types'
import { format } from 'date-fns'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function MediaCoverageEditPage() {
  const router = useRouter()
  const params = useParams()
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const { showAlert } = useAlert()

  const [mediaOutlet, setMediaOutlet] = useState('')
  const [title, setTitle] = useState('')
  const [articleUrl, setArticleUrl] = useState('')
  const [publishedAt, setPublishedAt] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (authLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    if (params.id) {
      fetchItem(params.id as string)
    }
  }, [isAdmin, authLoading, params.id, router])

  const fetchItem = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/media_coverage?id=eq.${id}&select=*`,
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
        throw new Error('해당 언론보도를 찾을 수 없습니다.')
      }

      const item: MediaCoverage = {
        id: data[0].id,
        mediaOutlet: data[0].media_outlet,
        title: data[0].title,
        articleUrl: data[0].article_url,
        publishedAt: new Date(data[0].published_at),
        createdAt: new Date(data[0].created_at),
      }

      setMediaOutlet(item.mediaOutlet)
      setTitle(item.title)
      setArticleUrl(item.articleUrl)
      setPublishedAt(format(item.publishedAt, 'yyyy-MM-dd'))
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '언론보도를 불러오는데 실패했습니다.')
      router.push('/admin/media-coverage')
    } finally {
      setIsLoading(false)
    }
  }

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
        `${SUPABASE_URL}/rest/v1/media_coverage?id=eq.${params.id}`,
        {
          method: 'PATCH',
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
        throw new Error('언론보도 수정에 실패했습니다.')
      }

      showAlert('언론보도가 수정되었습니다.')
      router.push('/admin/media-coverage')
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading || isLoading) {
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
          <h3 className="text-xl font-semibold">언론보도 수정</h3>
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
              {isSubmitting ? '수정 중...' : '수정하기'}
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
