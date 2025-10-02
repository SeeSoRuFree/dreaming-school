'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { News } from '@/types'
import { Plus, Edit, Trash2, Eye, Calendar, Search, Star } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function NewsPage() {
  const router = useRouter()
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const { showAlert } = useAlert()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<'all' | 'news' | 'notice'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [newsItems, setNewsItems] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    fetchNewsItems()
  }, [isAdmin, authLoading, router])

  const fetchNewsItems = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/news?select=*&order=created_at.desc`,
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
      const formattedItems: News[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        category: item.category,
        createdAt: new Date(item.created_at),
        updatedAt: item.updated_at ? new Date(item.updated_at) : undefined,
        featured: item.featured || false,
      }))

      setNewsItems(formattedItems)
    } catch (error) {
      showAlert('소식을 불러오는데 실패했습니다.')
      setNewsItems([])
    } finally {
      setIsLoading(false)
    }
  }

  const filteredItems = newsItems.filter(item => {
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 소식을 삭제하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/news?id=eq.${id}`,
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

      showAlert('소식이 삭제되었습니다.')
      fetchNewsItems()
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.')
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

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">소식/공지 관리</h3>
          <Link href="/admin/news/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              새 소식 작성
            </Button>
          </Link>
        </div>

        {/* 검색 및 필터 */}
        <Card className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="제목으로 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="news">소식</option>
              <option value="notice">공지사항</option>
            </select>
          </div>
        </Card>

        {/* 통계 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            총 <span className="font-bold">{filteredItems.length}</span>개의 소식
          </p>
        </div>

        {/* 소식 목록 */}
        <div className="space-y-4">
          {currentItems.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">
                {searchQuery || filterCategory !== 'all' ? '검색 결과가 없습니다.' : '작성된 소식이 없습니다.'}
              </p>
            </Card>
          ) : (
            currentItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
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
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(item.createdAt, 'yyyy.MM.dd', { locale: ko })}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <div
                      className="text-sm text-gray-600 mb-2 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'
                      }}
                    />
                    {item.updatedAt && (
                      <div className="text-xs text-gray-500">
                        수정일: {format(item.updatedAt, 'yyyy.MM.dd HH:mm', { locale: ko })}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link href={`/admin/news/${item.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/news/${item.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                size="sm"
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
