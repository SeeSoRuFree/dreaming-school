'use client'

import { useState, useEffect } from 'react'
import { mockPrograms } from '@/lib/mock-data'
import { programImages, programTitles, type ProgramCategory } from '@/lib/program-images'
import { ProgramImageCarousel } from '@/components/ui/ProgramImageCarousel'
import type { Program } from '@/types'

// 프로그램 상세 데이터
const programDetails = [
  {
    category: 'building' as ProgramCategory,
    title: '소형 집짓기 체험교육 사업',
    items: [
      {
        subtitle: '소형 집 짓기 체험교육 사업',
        details: [
          '학생들이 직접 짓는 세상에서 가장 위대한 한 평 집 짓기',
          '실기, 이론, 품성교육의 복합교육 제시',
          '키자니아식 현장감있는 교육 운영',
          '10~12회기(회당 2~3시간) 구성'
        ]
      },
      {
        subtitle: '모형집짓기 체험교육 사업',
        details: []
      }
    ]
  },
  {
    category: 'science' as ProgramCategory,
    title: '과학창의교육 및 체험학습 사업',
    items: [
      {
        subtitle: 'IT 교육 및 체험학습 사업',
        details: [
          '과학교육(비행기 원리 및 비행기만들어 비행하기)',
          '창의목공, 분경, 텃밭/꽃밭수업, IT접목메이커',
          '교육,영상수업 등 다양한 체험 수업 제공',
          '단기수업 및 심화단계로 차수수업'
        ]
      }
    ]
  },
  {
    category: 'remodeling' as ProgramCategory,
    title: '공간 재창조 리모델링 사업 (실내,실외)',
    items: [
      {
        subtitle: '공간 재창조 리모델링 사업',
        details: [
          '학교의 유휴공간을 교육적 환경으로 리모델링 (운동장 환경 조성, 교실공간의 재창조)',
          '학생들과 함께하는 리모델링 (실기, 이론, 인성의 복합교육 제시)'
        ]
      }
    ]
  },
  {
    category: 'gardening' as ProgramCategory,
    title: '원예프로그램',
    items: [
      {
        subtitle: '원예프로그램(10차수 수업)',
        details: [
          '텃밭/꽃밭수업',
          '단기수업 및 심화단계로 차수수업'
        ]
      }
    ]
  },
  {
    category: 'rural' as ProgramCategory,
    title: '농촌활성화 사업',
    items: [
      {
        subtitle: '주거역량강화 체험학습 사업',
        details: [
          '창의목공, 분경, 텃밭/꽃밭수업, 교육,영상수업 등 다양한 체험 수업 제공',
          '단기수업 및 심화단계로 차수수업'
        ]
      }
    ]
  }
]

export default function ProgramsPage() {
  const [, setPrograms] = useState<Program[]>([])

  useEffect(() => {
    // 항상 최신 mock data 사용 (개발 중)
    setPrograms(mockPrograms)
    localStorage.setItem('programs', JSON.stringify(mockPrograms))
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container-main py-16">
          <h1 className="heading-1 text-center">교육프로그램</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            꿈을 짓는 학교에서 제공하는 다양한 교육과정을 만나보세요.
            실제 현장의 생생한 모습을 통해 프로그램의 매력을 느껴보세요.
          </p>
        </div>
      </section>

      {/* 프로그램 상세 섹션 */}
      <section className="bg-white">
        <div className="container-main section-padding">
          <div className="space-y-20">
            {programDetails.map((program, index) => (
              <div key={program.category} className="max-w-7xl mx-auto">
                <div className={`grid lg:grid-cols-5 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  {/* 이미지 캐러셀 */}
                  <div className={`lg:col-span-3 ${
                    index % 2 === 1 ? 'lg:col-start-3' : ''
                  }`}>
                    <ProgramImageCarousel
                      images={programImages[program.category]}
                      programTitle={program.title}
                      className="w-full"
                    />
                  </div>

                  {/* 프로그램 설명 */}
                  <div className={`lg:col-span-2 ${
                    index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                          {program.title}
                        </h2>
                      </div>

                      {program.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-4">
                          {item.subtitle && (
                            <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-600 pl-4">
                              {item.subtitle}
                            </h3>
                          )}
                          
                          {item.details.length > 0 && (
                            <ul className="space-y-3">
                              {item.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-start">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="text-gray-700 leading-relaxed">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}

                      {/* 프로그램 자세히 보기 버튼 */}
                      <div className="pt-4">
                        <a 
                          href={`/programs/${program.category === 'building' ? '1' : program.category === 'science' ? '2' : program.category === 'remodeling' ? '3' : program.category === 'gardening' ? '4' : '5'}`} 
                          className="inline-flex items-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                          <span>프로그램 자세히 보기</span>
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 구분선 (마지막 항목 제외) */}
                {index < programDetails.length - 1 && (
                  <div className="mt-16 pt-4">
                    <hr className="border-gray-200" />
                  </div>
                )}
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
          <a href="/contact" className="btn-primary inline-block">
            프로그램 문의하기
          </a>
        </div>
      </section>
    </>
  )
}