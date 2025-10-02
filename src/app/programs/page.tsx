'use client'

import { useState, useEffect } from 'react'
import { getPrograms } from '@/lib/supabase'
import { programImages, type ProgramCategory } from '@/lib/program-images'
import InfiniteScrollGallery from '@/components/ui/InfiniteScrollGallery'

interface ApiProgram {
  id: string
  title: string
  subtitle?: string
  description?: string
  category: string
  is_active: boolean
  sessions?: {
    id: string
    images?: { id: string; image_url: string }[]
  }[]
}

// 카테고리 매핑
const categoryMap: Record<string, { id: string; label: string; displayCategory: ProgramCategory }> = {
  'building': { id: 'building', label: '한평집짓기', displayCategory: 'building' },
  'model': { id: 'model', label: '모형집짓기', displayCategory: 'building' },
  'gardening': { id: 'gardening', label: '원예', displayCategory: 'gardening' },
  'science': { id: 'science', label: '과학창의', displayCategory: 'science' },
  'rural': { id: 'rural', label: '농촌활성화', displayCategory: 'rural' },
  'remodeling': { id: 'remodeling', label: '공간재창조', displayCategory: 'remodeling' }
}

export default function ProgramsPage() {
  const [apiPrograms, setApiPrograms] = useState<ApiProgram[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('building')
  const [isScrolling, setIsScrolling] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true)
        const programs = await getPrograms({ is_active: true })

        // 각 프로그램의 세션 및 이미지 정보 로드
        const programsWithSessions = await Promise.all(
          programs.map(async (program) => {
            try {
              const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
              const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

              // 세션 정보 조회
              const sessionsResponse = await fetch(
                `${SUPABASE_URL}/rest/v1/program_sessions?program_id=eq.${program.id}&order=order_num.asc`,
                {
                  headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                  }
                }
              )

              let sessions = []
              if (sessionsResponse.ok) {
                sessions = await sessionsResponse.json()

                // 각 세션의 이미지 조회
                for (const session of sessions) {
                  const imagesResponse = await fetch(
                    `${SUPABASE_URL}/rest/v1/program_session_images?session_id=eq.${session.id}&order=order_num.asc`,
                    {
                      headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                      }
                    }
                  )

                  if (imagesResponse.ok) {
                    session.images = await imagesResponse.json()
                  } else {
                    session.images = []
                  }
                }
              }

              return {
                ...program,
                sessions
              }
            } catch (error) {
              console.error(`프로그램 ${program.id} 세션 로딩 실패:`, error)
              return {
                ...program,
                sessions: []
              }
            }
          })
        )

        setApiPrograms(programsWithSessions)
      } catch (error) {
        console.error('프로그램 로딩 실패:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPrograms()
  }, [])

  // 카테고리 탭 데이터
  const categories = Object.values(categoryMap)

  // 탭 클릭 핸들러
  const handleCategoryClick = (categoryId: string) => {
    setIsScrolling(true)
    setActiveCategory(categoryId)

    const element = document.getElementById(`section-${categoryId}`)
    if (element) {
      const offset = 120
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })

      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }

  // Intersection Observer로 현재 보이는 섹션 감지
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id.replace('section-', '')
          setActiveCategory(categoryId)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    categories.forEach(category => {
      const element = document.getElementById(`section-${category.id}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [isScrolling])

  // URL 해시로 스크롤 처리
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const categoryId = hash.replace('section-', '')
      setIsScrolling(true)
      setActiveCategory(categoryId)

      setTimeout(() => {
        const element = document.getElementById(`section-${categoryId}`)
        if (element) {
          const offset = 120
          const elementPosition = element.offsetTop - offset
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })

          setTimeout(() => {
            setIsScrolling(false)
          }, 1000)
        }
      }, 100)
    }
  }, [])

  // 카테고리별 프로그램 렌더링 함수
  const renderCategoryPrograms = (categoryId: string, startIndex: number = 0) => {
    const programs = apiPrograms.filter(p => p.category === categoryId)
    const categoryInfo = categoryMap[categoryId]

    return programs.map((program, index) => (
      <div key={program.id} className="space-y-12">
        {/* 프로그램 설명 */}
        <div className="container-main">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="space-y-6">
              {/* 프로그램 번호와 제목 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                  {startIndex + index + 1}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                    {program.title}
                  </h2>
                  {program.subtitle && (
                    <p className="text-lg text-gray-700">{program.subtitle}</p>
                  )}
                </div>
              </div>

              {program.description && (
                <div className="ml-16">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{program.description}</p>
                </div>
              )}

              {/* 프로그램 자세히 보기 버튼 */}
              <div className="pt-6 ml-16">
                <a
                  href={`/programs/${program.id}`}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>프로그램 자세히 보기</span>
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 무한 스크롤 이미지 갤러리 */}
        {(() => {
          // 프로그램의 모든 세션 이미지 수집
          const allImages = program.sessions?.flatMap((session: any) =>
            session.images?.map((img: any) => ({
              src: img.image_url,
              alt: `${program.title} - ${session.title || ''}`
            })) || []
          ) || []

          // 이미지가 있을 때만 갤러리 표시
          return allImages.length > 0 ? (
            <div className="w-full overflow-hidden">
              <InfiniteScrollGallery
                images={allImages}
                speed={40}
              />
            </div>
          ) : null
        })()}
      </div>
    ))
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white pt-24">
        <div className="container-main py-16">
          <h1 className="heading-1 text-center">교육프로그램</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            꿈을 짓는 학교에서 제공하는 다양한 교육과정을 만나보세요.<br/>
            실제 현장의 생생한 모습을 통해 프로그램의 매력을 느껴보세요.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <nav className="sticky top-16 z-40 bg-white">
        <div className="container-main">
          <div className="flex justify-center gap-2 md:gap-4 py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`relative px-3 md:px-5 py-2 text-sm md:text-base font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.label}
                {activeCategory === category.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 프로그램 상세 섹션 */}
      <section className="bg-white">
        {loading ? (
          <div className="container-main py-32 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            <p className="mt-4 text-gray-600">프로그램을 불러오는 중...</p>
          </div>
        ) : (
          <div className="space-y-32">
            {categories.map((category, catIndex) => (
              <div key={category.id} id={`section-${category.id}`} className="space-y-16 pt-8">
                {renderCategoryPrograms(category.id, catIndex)}

                {/* 데이터가 없을 때 안내 메시지 */}
                {apiPrograms.filter(p => p.category === category.id).length === 0 && (
                  <div className="container-main py-16 text-center">
                    <p className="text-gray-500">등록된 {category.label} 프로그램이 없습니다.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container-main py-16 text-center">
          <h2 className="heading-2 mb-4">원하는 프로그램을 찾지 못하셨나요?</h2>
          <p className="body-text text-gray-700 mb-8 max-w-2xl mx-auto">
            새로운 교육 프로그램에 대한 제안이나 문의사항이 있으시면 언제든지 연락주세요.
          </p>
          <a href="/contact" className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg inline-block">
            프로그램 문의하기
          </a>
        </div>
      </section>
    </>
  )
}
