'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { News } from '@/types'
import { Calendar, ChevronRight, Bell, Newspaper, Search, Star } from 'lucide-react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function NewsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'news' | 'notice'>('all')
  const [selectedNews, setSelectedNews] = useState<News | null>(null)
  const [newsData, setNewsData] = useState<News[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // 뉴스 데이터 로드
  useEffect(() => {
    const loadNewsData = async () => {
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
        const formattedNews: News[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          category: item.category,
          createdAt: new Date(item.created_at),
          updatedAt: item.updated_at ? new Date(item.updated_at) : undefined,
          featured: item.featured || false,
        }))

        setNewsData(formattedNews)
      } catch (error) {
        console.error('Failed to load news:', error)
        setNewsData([])
      } finally {
        setIsLoading(false)
      }
    }
    loadNewsData()
  }, [])

  // URL 파라미터에서 뉴스 ID 읽기
  useEffect(() => {
    const newsId = searchParams.get('id')
    if (newsId && newsData.length > 0) {
      const news = newsData.find(n => n.id === newsId)
      if (news) {
        setSelectedNews(news)
      }
    } else {
      setSelectedNews(null)
    }
  }, [searchParams, newsData])

  const filteredNews = newsData.filter(news => {
    // 카테고리 필터
    const categoryMatch = selectedCategory === 'all' || news.category === selectedCategory
    
    // 검색 필터
    const searchMatch = searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    return categoryMatch && searchMatch
  })

  const sortedNews = filteredNews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryName = (category: string) => {
    return category === 'news' ? '소식' : '공지'
  }

  const getCategoryIcon = (category: string) => {
    return category === 'news' 
      ? <Newspaper className="w-4 h-4" />
      : <Bell className="w-4 h-4" />
  }

  if (selectedNews) {
    return (
      <>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-orange-50 to-white pt-24">
          <div className="container-main py-16">
            <button
              onClick={() => router.push('/news')}
              className="flex items-center text-blue-700 hover:text-blue-800 mb-6 transition-colors font-medium"
            >
              <ChevronRight className="w-5 h-5 rotate-180 mr-2" />
              목록으로 돌아가기
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                {getCategoryIcon(selectedNews.category)}
                <span>{getCategoryName(selectedNews.category)}</span>
              </div>
              {selectedNews.featured && (
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>중요</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(selectedNews.createdAt)}</span>
              </div>
            </div>
            <h1 className="heading-1">{selectedNews.title}</h1>
          </div>
        </section>

        <div className="container-main section-padding">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedNews.content }}
              />
            </Card>
          </div>
        </div>
      </>
    )
  }

  if (isLoading) {
    return (
      <div className="container-main py-32 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white pt-24">
        <div className="container-main py-16">
          <h1 className="heading-1 text-center">소식·공지</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            꿈을짓는학교의 소식과 공지사항을 확인하세요
          </p>
        </div>
      </section>

      {/* Tab Navigation & Search */}
      <section className="bg-white">
        <div className="container-main py-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Tab Navigation */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'all', label: '전체' },
                  { key: 'news', label: '소식' },
                  { key: 'notice', label: '공지' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedCategory(tab.key as 'all' | 'news' | 'notice')}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                      selectedCategory === tab.key
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="제목 또는 내용으로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-main py-8">

        {/* 소식 목록 */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {sortedNews.map((news) => (
              <Card
                key={news.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm hover:-translate-y-1"
                onClick={() => router.push(`/news?id=${news.id}`)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                          {getCategoryIcon(news.category)}
                          <span>{getCategoryName(news.category)}</span>
                        </div>
                        {news.featured && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                            <Star className="w-3 h-3" />
                            <span>중요</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(news.createdAt)}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-700 transition-colors leading-tight">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-2">
                        {news.content.replace(/<[^>]*>?/gm, '').replace(/\n/g, ' ').substring(0, 180)}...
                      </p>
                    </div>
                    <div className="ml-6 flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-200 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 빈 상태 */}
        {sortedNews.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-500 mb-2">등록된 소식이 없습니다</h3>
            <p className="text-gray-400">선택한 카테고리에 해당하는 소식이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="container-main py-16 text-center">로딩 중...</div>}>
      <NewsContent />
    </Suspense>
  )
}