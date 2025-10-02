'use client'

import { useState, useEffect, Suspense } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, Newspaper } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { MediaCoverage } from '@/types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function MediaContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const [mediaItems, setMediaItems] = useState<MediaCoverage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMediaItems()
  }, [])

  const fetchMediaItems = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/media_coverage?select=*&order=published_at.desc`,
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
      const formattedItems: MediaCoverage[] = data.map((item: any) => ({
        id: item.id,
        mediaOutlet: item.media_outlet,
        title: item.title,
        articleUrl: item.article_url,
        publishedAt: new Date(item.published_at),
        createdAt: new Date(item.created_at),
      }))

      setMediaItems(formattedItems)
    } catch (error) {
      console.error('언론보도 데이터 로드 실패:', error)
      setMediaItems([])
    } finally {
      setIsLoading(false)
    }
  }

  // 페이지네이션
  const totalPages = Math.ceil(mediaItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = mediaItems.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white pt-24">
        <div className="container-main py-16">
          <h1 className="heading-1 text-center">언론보도</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            꿈을 짓는 학교의 활동이 언론에 보도된 기사를 모아놓았습니다.<br/>
            다양한 언론사에서 전하는 우리의 이야기를 만나보세요.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white">
        <div className="container-main py-12">

          {/* 로딩 상태 */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">언론보도를 불러오는 중...</p>
            </div>
          ) : currentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Newspaper className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-semibold text-orange-600">
                          {item.mediaOutlet}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      <button
                        onClick={() => window.open(item.articleUrl, '_blank', 'noopener,noreferrer')}
                        className="flex items-start gap-2 w-full text-left"
                      >
                        <span className="flex-1">{item.title}</span>
                        <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                      </button>
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>발행일: {format(new Date(item.publishedAt), 'yyyy.MM.dd', { locale: ko })}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : mediaItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Newspaper className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">언론보도가 없습니다</h3>
              <p className="text-gray-500">
                등록된 언론보도가 없습니다.
              </p>
            </div>
          ) : null}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function MediaPage() {
  return (
    <Suspense fallback={
      <div className="bg-gradient-to-b from-orange-50 to-white pt-24">
        <div className="container-main py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    }>
      <MediaContent />
    </Suspense>
  )
}
