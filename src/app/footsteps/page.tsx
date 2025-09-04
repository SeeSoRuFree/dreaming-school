'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FootstepPost } from '@/types'
import { mockFootstepPosts, initializeMockData } from '@/lib/mock-data'
import { Calendar, Search, Filter, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

function FootstepsContent() {
  const [posts, setPosts] = useState<FootstepPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<FootstepPost[]>([])
  const [selectedProgram, setSelectedProgram] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // 초기 데이터 로드
  useEffect(() => {
    initializeMockData()
    loadPosts()
  }, [])

  const loadPosts = () => {
    const savedPosts = localStorage.getItem('footstep-posts')
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts)
      const postsWithDates = parsedPosts.map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined
      }))
      // 최신순으로 정렬
      postsWithDates.sort((a: FootstepPost, b: FootstepPost) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      setPosts(postsWithDates)
      setFilteredPosts(postsWithDates)
    } else {
      setPosts(mockFootstepPosts)
      setFilteredPosts(mockFootstepPosts)
    }
  }

  // 필터링
  useEffect(() => {
    let filtered = posts

    // 카테고리 필터
    if (selectedProgram !== 'all') {
      filtered = filtered.filter(post => post.programCategory === selectedProgram)
    }

    // 검색 필터
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [posts, selectedProgram, searchQuery])

  // 프로그램 카테고리별 필터 옵션
  const categoryFilterOptions = [
    { value: 'all', label: '전체 프로그램' },
    { value: 'building', label: '집짓기' },
    { value: 'gardening', label: '원예' },
    { value: 'science', label: '과학창의' },
    { value: 'rural', label: '농촌활성화' },
    { value: 'remodeling', label: '리모델링' },
    { value: 'general', label: '기타' }
  ]
  
  const categoryNames = {
    all: '전체',
    building: '집짓기',
    gardening: '원예',
    science: '과학창의',
    rural: '농촌활성화',
    remodeling: '리모델링',
    general: '기타'
  }

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24">
        <div className="container-main py-16">
          <h1 className="heading-1 text-center">걸어온 발자취</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            꿈을 짓는 학교에서 진행된 다양한 프로그램들의 소중한 순간들을<br/>
            함께 나누며, 우리가 걸어온 발자취를 기록합니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white">
        <div className="container-main py-12">

        {/* 검색 및 필터 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="제목, 프로그램명, 내용으로 검색..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm min-w-[200px] cursor-pointer hover:border-gray-400 transition-colors"
              style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
            >
              {categoryFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* 커스텀 드롭다운 화살표 */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-10">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 게시글 목록 - 게시판 스타일 */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          {/* 게시판 헤더 */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
              <div className="col-span-1">번호</div>
              <div className="col-span-2 hidden md:block">프로그램</div>
              <div className="col-span-6 md:col-span-5">제목</div>
              <div className="col-span-2 hidden md:block">작성자</div>
              <div className="col-span-3 md:col-span-2">작성일</div>
            </div>
          </div>
          
          {/* 게시글 목록 */}
          {currentPosts.map((post, index) => (
            <div key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* 번호 */}
                  <div className="col-span-1">
                    <span className="text-sm font-medium text-gray-900">
                      {filteredPosts.length - (startIndex + index)}
                    </span>
                  </div>
                  
                  {/* 프로그램 (데스크톱만) */}
                  <div className="col-span-2 hidden md:block">
                    <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {categoryNames[post.programCategory]}
                    </span>
                  </div>
                  
                  {/* 제목 */}
                  <div className="col-span-6 md:col-span-5">
                    <Link href={`/footsteps/${post.id}`}>
                      <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                      {post.programName}
                    </p>
                    {/* 모바일에서 프로그램 카테고리 */}
                    <div className="md:hidden mt-2">
                      <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {categoryNames[post.programCategory]}
                      </span>
                    </div>
                  </div>
                  
                  {/* 작성자 (데스크톱만) */}
                  <div className="col-span-2 hidden md:block">
                    <span className="text-sm text-gray-600">{post.authorName}</span>
                  </div>
                  
                  {/* 작성일 */}
                  <div className="col-span-3 md:col-span-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(post.createdAt, 'yy.MM.dd', { locale: ko })}
                    </span>
                    {/* 모바일에서 작성자 */}
                    <div className="md:hidden">
                      <span className="text-xs text-gray-500">{post.authorName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 게시글이 없는 경우 */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">게시글이 없습니다</h3>
            <p className="text-gray-500">
              {searchQuery || selectedProgram !== 'all' 
                ? '검색 조건을 변경해 보세요.' 
                : '아직 작성된 게시글이 없습니다.'
              }
            </p>
          </div>
        )}

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

export default function FootstepsPage() {
  return (
    <Suspense fallback={
      <div className="bg-gradient-to-b from-blue-50 to-white pt-24">
        <div className="container-main py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    }>
      <FootstepsContent />
    </Suspense>
  )
}