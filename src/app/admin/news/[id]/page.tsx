'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { News } from '@/types'
import { Edit, ArrowLeft, Calendar, Star } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function NewsDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const { showAlert } = useAlert()

  const [item, setItem] = useState<News | null>(null)
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
        `${SUPABASE_URL}/rest/v1/news?id=eq.${id}&select=*`,
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
        throw new Error('해당 소식을 찾을 수 없습니다.')
      }

      const fetchedItem: News = {
        id: data[0].id,
        title: data[0].title,
        content: data[0].content,
        category: data[0].category,
        createdAt: new Date(data[0].created_at),
        updatedAt: data[0].updated_at ? new Date(data[0].updated_at) : undefined,
        featured: data[0].featured || false,
      }

      setItem(fetchedItem)
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '소식을 불러오는데 실패했습니다.')
      router.push('/admin/news')
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
          <Link href="/admin/news">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로
            </Button>
          </Link>
          <Link href={`/admin/news/${item.id}/edit`}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              수정하기
            </Button>
          </Link>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            {/* 카테고리 및 중요 표시 */}
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                item.category === 'notice'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {item.category === 'notice' ? '공지사항' : '소식'}
              </span>
              {item.featured && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  중요
                </span>
              )}
            </div>

            {/* 제목 */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
            </div>

            {/* 날짜 정보 */}
            <div className="flex items-center gap-4 text-sm text-gray-600 border-b pb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                작성일: {format(item.createdAt, 'yyyy.MM.dd HH:mm', { locale: ko })}
              </div>
              {item.updatedAt && (
                <div className="flex items-center gap-1">
                  수정일: {format(item.updatedAt, 'yyyy.MM.dd HH:mm', { locale: ko })}
                </div>
              )}
            </div>

            {/* 내용 */}
            <div
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
