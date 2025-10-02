'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { MediaCoverage } from '@/types'
import { Edit, ArrowLeft, ExternalLink, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function MediaCoverageDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const { showAlert } = useAlert()

  const [item, setItem] = useState<MediaCoverage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

      const fetchedItem: MediaCoverage = {
        id: data[0].id,
        mediaOutlet: data[0].media_outlet,
        title: data[0].title,
        articleUrl: data[0].article_url,
        publishedAt: new Date(data[0].published_at),
        createdAt: new Date(data[0].created_at),
      }

      setItem(fetchedItem)
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '언론보도를 불러오는데 실패했습니다.')
      router.push('/admin/media-coverage')
    } finally {
      setIsLoading(false)
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

  if (!isAdmin || !item) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/admin/media-coverage">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로
            </Button>
          </Link>
          <Link href={`/admin/media-coverage/${item.id}/edit`}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              수정하기
            </Button>
          </Link>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                언론사명
              </label>
              <p className="text-lg font-semibold text-gray-900">{item.mediaOutlet}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                기사 제목
              </label>
              <p className="text-lg text-gray-900">{item.title}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                기사 URL
              </label>
              <a
                href={item.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                {item.articleUrl}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                발행일
              </label>
              <p className="text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(item.publishedAt, 'yyyy년 MM월 dd일', { locale: ko })}
              </p>
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                등록일
              </label>
              <p className="text-sm text-gray-600">
                {format(item.createdAt, 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
