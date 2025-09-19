'use client'

import { useState, useEffect, useRef } from 'react'
import { getAllProgramDetails } from '@/lib/program-data'
import { programImages, type ProgramCategory } from '@/lib/program-images'
import InfiniteScrollGallery from '@/components/ui/InfiniteScrollGallery'
import type { ProgramDetail } from '@/types'

// 프로그램 상세 데이터 - 원래 하드코딩된 내용
const programDetails = [
  {
    id: '1',
    category: 'building' as ProgramCategory,
    title: '한평 집짓기',
    items: [
      {
        subtitle: '실제 집짓기 체험교육',
        details: [
          '학생들이 직접 짓는 세상에서 가장 위대한 한 평 집 짓기',
          '실기, 이론, 품성교육의 복합교육 제시',
          '키자니아식 현장감있는 교육 운영',
          '10~12회기(회당 2~3시간) 구성'
        ]
      }
    ]
  },
  {
    id: '2',
    category: 'building' as ProgramCategory,
    title: '모형집짓기 체험교육',
    items: [
      {
        subtitle: '수준별 맞춤형 모형 집짓기 프로그램',
        details: [
          '벽걸이용 모형집짓기 (저학년용) - 2시간 과정, 이론교육 포함',
          '한평형 모형집짓기 - 3시간 과정, 이론교육 포함',
          '두평형 모형집짓기 - 2일~3일 과정',
          '단기수업 및 심화단계로 차수수업 진행'
        ]
      }
    ]
  },
  {
    id: '3',
    category: 'gardening' as ProgramCategory,
    title: '원예프로그램',
    items: [
      {
        subtitle: '자연과 교감하는 창의 체험 교육',
        details: [
          '분경수업 - 작은 화분에 자연의 아름다움을 담아보는 수업',
          '테라리움수업 - 유리병 속 작은 생태계 만들기',
          '플렌테리어수업 - 식물을 활용한 실내 인테리어',
          '정원만들기수업 - 직접 가꾸는 나만의 작은 정원',
          '압화캐릭터수업 - 꽃과 잎을 이용한 창작 활동',
          '리스화관수업 - 자연 소재로 만드는 화관',
          '축하꽃양초수업 - 꽃 장식 양초 만들기',
          '아로마 꽃 비누수업 - 꽃향 가득한 천연 비누 제작',
          '우드버닝화수업 - 나무에 그리는 꽃 그림'
        ]
      }
    ]
  },
  {
    id: '7',
    category: 'science' as ProgramCategory,
    title: '과학창의교육 및 체험학습',
    items: [
      {
        subtitle: '창의적 과학 체험 프로그램',
        details: [
          '과학교육 - 실험을 통한 과학 원리 탐구',
          '창의목공 - 과학과 목공 기술을 결합한 창작 활동'
        ]
      }
    ]
  },
  {
    id: '5',
    category: 'rural' as ProgramCategory,
    title: '농촌활성화 사업',
    items: [
      {
        subtitle: '농촌 지역 활성화 프로그램',
        details: [
          '농촌주민들과 함께하는 세상에서 가장 위대한 한평집짓기 - 지역 주민과 함께하는 집짓기 체험',
          '농촌주민들과 함께하는 원예치유프로그램 - 자연 치유와 원예 활동 결합',
          '함께하는 농촌지역 살리기 컨설팅 - 지역 발전을 위한 맞춤형 컨설팅'
        ]
      }
    ]
  },
  {
    id: '6',
    category: 'remodeling' as ProgramCategory,
    title: '공간 재창조 리모델링 사업 (실내,실외)',
    items: [
      {
        subtitle: '공간 활용 프로그램',
        details: [
          '학교의 유휴공간을 교육적 환경으로 리모델링',
          '학생들과 함께하는 리모델링'
        ]
      }
    ]
  }
]

export default function ProgramsPage() {
  const [storagePrograms, setStoragePrograms] = useState<ProgramDetail[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('building')
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({})

  useEffect(() => {
    // localStorage 데이터는 ID 확인용으로만 사용
    const programList = getAllProgramDetails()
    setStoragePrograms(programList)
  }, [])

  // 카테고리 탭 데이터
  const categories = [
    { id: 'building', label: '한평집짓기' },
    { id: 'model', label: '모형집짓기' },
    { id: 'gardening', label: '원예' },
    { id: 'science', label: '과학창의' },
    { id: 'rural', label: '농촌활성화' },
    { id: 'remodeling', label: '공간재창조' }
  ]

  // 탭 클릭 핸들러 - 해당 섹션으로 스크롤
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    const element = document.getElementById(`section-${categoryId}`)
    if (element) {
      const offset = 120 // 네비게이션 바 높이 고려
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
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
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id.replace('section-', '')
          setActiveCategory(categoryId)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // 각 섹션 관찰 시작
    categories.forEach(category => {
      const element = document.getElementById(`section-${category.id}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24">
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
        <div className="space-y-32">
          {/* 한평 집짓기 프로그램 섹션 */}
          <div id="section-building" className="space-y-16 pt-8">
            {programDetails.filter(p => p.id === '1').map((program, index) => (
              <div key={program.id} className="space-y-12">
              {/* 프로그램 설명 */}
              <div className="container-main">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
                  <div className="space-y-6">
                    {/* 프로그램 번호와 제목 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                        1
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                          {program.title}
                        </h2>
                      </div>
                    </div>

                    {program.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-4 ml-16">
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-lg">
                            {item.subtitle}
                          </h3>
                        )}
                        
                        {item.details.length > 0 && (
                          <ul className="space-y-3 ml-4">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {/* 프로그램 자세히 보기 버튼 */}
                    <div className="pt-6 ml-16">
                      <a 
                        href={`/programs/${program.id}`} 
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
              
              {/* 무한 스크롤 이미지 갤러리 - 전체 너비 */}
              <div className="w-full overflow-hidden">
                <InfiniteScrollGallery
                  images={programImages[program.category].map((src, idx) => ({ 
                    src, 
                    alt: `${program.title} ${idx + 1}` 
                  }))}
                  speed={40} // 모든 프로그램 동일한 속도
                />
              </div>

            </div>
            ))}
          </div>

          {/* 모형집짓기 프로그램 섹션 */}
          <div id="section-model" className="space-y-16 pt-8">
            {programDetails.filter(p => p.id === '2').map((program, index) => (
              <div key={program.id} className="space-y-12">
              {/* 프로그램 설명 */}
              <div className="container-main">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
                  <div className="space-y-6">
                    {/* 프로그램 번호와 제목 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                        2
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                          {program.title}
                        </h2>
                      </div>
                    </div>

                    {program.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-4 ml-16">
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-lg">
                            {item.subtitle}
                          </h3>
                        )}

                        {item.details.length > 0 && (
                          <ul className="space-y-3 ml-4">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {/* 프로그램 자세히 보기 버튼 */}
                    <div className="pt-6 ml-16">
                      <a
                        href={`/programs/${program.id}`}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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

              {/* 무한 스크롤 이미지 갤러리 - 전체 너비 */}
              <div className="w-full overflow-hidden">
                <InfiniteScrollGallery
                  images={programImages[program.category].map((src, idx) => ({
                    src,
                    alt: `${program.title} ${idx + 1}`
                  }))}
                  speed={40} // 모든 프로그램 동일한 속도
                />
              </div>
            </div>
            ))}
          </div>

          {/* 원예 프로그램 섹션 */}
          <div id="section-gardening" className="space-y-16 pt-8">
            {programDetails.filter(p => p.category === 'gardening').map((program, index) => (
              <div key={program.id} className="space-y-12">
              {/* 프로그램 설명 */}
              <div className="container-main">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
                  <div className="space-y-6">
                    {/* 프로그램 번호와 제목 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                        3
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                          {program.title}
                        </h2>
                      </div>
                    </div>

                    {program.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-4 ml-16">
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-lg">
                            {item.subtitle}
                          </h3>
                        )}

                        {item.details.length > 0 && (
                          <ul className="space-y-3 ml-4">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {/* 프로그램 자세히 보기 버튼 */}
                    <div className="pt-6 ml-16">
                      <a
                        href={`/programs/${program.id}`}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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

              {/* 무한 스크롤 이미지 갤러리 - 전체 너비 */}
              <div className="w-full overflow-hidden">
                <InfiniteScrollGallery
                  images={programImages[program.category].map((src, idx) => ({
                    src,
                    alt: `${program.title} ${idx + 1}`
                  }))}
                  speed={40} // 모든 프로그램 동일한 속도
                />
              </div>
            </div>
            ))}
          </div>

          {/* 과학창의 프로그램 섹션 */}
          <div id="section-science" className="space-y-16 pt-8">
            {programDetails.filter(p => p.category === 'science').map((program, index) => (
              <div key={program.id} className="space-y-12">
              {/* 프로그램 설명 */}
              <div className="container-main">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
                  <div className="space-y-6">
                    {/* 프로그램 번호와 제목 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                        4
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                          {program.title}
                        </h2>
                      </div>
                    </div>

                    {program.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-4 ml-16">
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-lg">
                            {item.subtitle}
                          </h3>
                        )}

                        {item.details.length > 0 && (
                          <ul className="space-y-3 ml-4">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {/* 프로그램 자세히 보기 버튼 */}
                    <div className="pt-6 ml-16">
                      <a
                        href={`/programs/${program.id}`}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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

              {/* 무한 스크롤 이미지 갤러리 - 전체 너비 */}
              <div className="w-full overflow-hidden">
                <InfiniteScrollGallery
                  images={programImages[program.category].map((src, idx) => ({
                    src,
                    alt: `${program.title} ${idx + 1}`
                  }))}
                  speed={40} // 모든 프로그램 동일한 속도
                />
              </div>
            </div>
            ))}
          </div>

          {/* 농촌활성화 프로그램 섹션 */}
          <div id="section-rural" className="space-y-16 pt-8">
            {programDetails.filter(p => p.category === 'rural').map((program, index) => (
              <div key={program.id} className="space-y-12">
              {/* 프로그램 설명 */}
              <div className="container-main">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
                  <div className="space-y-6">
                    {/* 프로그램 번호와 제목 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                        5
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                          {program.title}
                        </h2>
                      </div>
                    </div>

                    {program.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-4 ml-16">
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-lg">
                            {item.subtitle}
                          </h3>
                        )}

                        {item.details.length > 0 && (
                          <ul className="space-y-3 ml-4">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {/* 프로그램 자세히 보기 버튼 */}
                    <div className="pt-6 ml-16">
                      <a
                        href={`/programs/${program.id}`}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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

              {/* 무한 스크롤 이미지 갤러리 - 전체 너비 */}
              <div className="w-full overflow-hidden">
                <InfiniteScrollGallery
                  images={programImages[program.category].map((src, idx) => ({
                    src,
                    alt: `${program.title} ${idx + 1}`
                  }))}
                  speed={40} // 모든 프로그램 동일한 속도
                />
              </div>
            </div>
            ))}
          </div>

          {/* 리모델링 프로그램 섹션 */}
          <div id="section-remodeling" className="space-y-16 pt-8">
            {programDetails.filter(p => p.category === 'remodeling').map((program, index) => (
              <div key={program.id} className="space-y-12">
              {/* 프로그램 설명 */}
              <div className="container-main">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
                  <div className="space-y-6">
                    {/* 프로그램 번호와 제목 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                        6
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                          {program.title}
                        </h2>
                      </div>
                    </div>

                    {program.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-4 ml-16">
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-400 pl-4 bg-white p-4 rounded-lg">
                            {item.subtitle}
                          </h3>
                        )}

                        {item.details.length > 0 && (
                          <ul className="space-y-3 ml-4">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {/* 프로그램 자세히 보기 버튼 */}
                    <div className="pt-6 ml-16">
                      <a
                        href={`/programs/${program.id}`}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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

              {/* 무한 스크롤 이미지 갤러리 - 전체 너비 */}
              <div className="w-full overflow-hidden">
                <InfiniteScrollGallery
                  images={programImages[program.category].map((src, idx) => ({
                    src,
                    alt: `${program.title} ${idx + 1}`
                  }))}
                  speed={40} // 모든 프로그램 동일한 속도
                />
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-50 to-amber-50">
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