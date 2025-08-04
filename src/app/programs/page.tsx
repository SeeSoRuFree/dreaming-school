'use client'

import { useState, useEffect } from 'react'
import { mockPrograms } from '@/lib/mock-data'
import type { Program } from '@/types'

// 프로그램 상세 이미지 데이터
const programDetailImages = [
  {
    category: 'building',
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
    ],
    image: '/images/programs/building-detail.jpg'
  },
  {
    category: 'science',
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
    ],
    image: '/images/programs/science-detail.jpg'
  },
  {
    category: 'remodeling',
    title: '공간 재창조 리모델링 사업 (실내,실외)',
    items: [
      {
        subtitle: '공간 재창조 리모델링 사업',
        details: [
          '학교의 유휴공간을 교육적 환경으로 리모델링 (운동장 환경 조성, 교실공간의 재창조)',
          '학생들과 함께하는 리모델링 (실기, 이론, 인성의 복합교육 제시)'
        ]
      }
    ],
    image: '/images/programs/remodeling-detail.jpg'
  },
  {
    category: 'gardening',
    title: '원예프로그램',
    items: [
      {
        subtitle: '원예프로그램(10차수 수업)',
        details: [
          '텃밭/꽃밭수업',
          '단기수업 및 심화단계로 차수수업'
        ]
      }
    ],
    image: '/images/programs/gardening-detail.jpg'
  },
  {
    category: 'rural',
    title: '농촌활성화 사업',
    items: [
      {
        subtitle: '주거역량강화 체험학습 사업',
        details: [
          '창의목공, 분경, 텃밭/꽃밭수업, 교육,영상수업 등 다양한 체험 수업 제공',
          '단기수업 및 심화단계로 차수수업'
        ]
      }
    ],
    image: '/images/programs/rural-detail.jpg'
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
      <section className="gradient-hero">
        <div className="container-main py-20 text-center">
          <h1 className="heading-1">교육프로그램</h1>
          <p className="body-text text-gray-700 mt-4 max-w-2xl mx-auto">
            꿈을 짓는 학교에서 제공하는 다양한 교육과정을 만나보세요.
            모든 연령대를 위한 맞춤형 프로그램이 준비되어 있습니다.
          </p>
        </div>
      </section>

      {/* 프로그램 요약 섹션 */}
      <section className="bg-white">
        <div className="container-main section-padding">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* 왼쪽 컬럼 */}
            <div className="space-y-10">
              {/* 소형 집짓기 체험교육 사업 */}
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6">소형 집짓기 체험교육 사업</h3>
                <div className="pl-6 border-l-4 border-blue-700">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">소형 집 짓기 체험교육 사업</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>학생들이 직접 짓는 세상에서 가장 위대한 한 평 집 짓기</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>실기, 이론, 품성교육의 복합교육 제시</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>키자니아식 현장감있는 교육 운영</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>10~12회기(회당 2~3시간) 구성</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 과학창의교육 및 체험학습 사업 */}
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6">과학창의교육 및 체험학습 사업</h3>
                <div className="pl-6 border-l-4 border-blue-700">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">IT 교육 및 체험학습 사업</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>과학교육(비행기 원리 및 비행기만들어 비행하기)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>창의목공, 분경, 텃밥/꽃밭수업, IT접목메이커 교육,영상수업 등 다양한 체험 수업 제공</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>단기수업 및 심화단계로 차수수업</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 공간 재창조 리모델링 사업 */}
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6">공간 재창조 리모델링 사업 (실내,실외)</h3>
                <div className="pl-6 border-l-4 border-blue-700">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">공간 재창조 리모델링 사업</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>학교의 유휴공간을 교육적 환경으로 리모델링<br/><span className="text-sm text-gray-500 ml-6">(운동장 환경 조성, 교실공간의 재창조)</span></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>학생들과 함께하는 리모델링<br/><span className="text-sm text-gray-500 ml-6">(실기, 이론, 인성의 복합교육 제시)</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 오른쪽 컬럼 */}
            <div className="space-y-10">
              {/* 원예프로그램 */}
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6">원예프로그램</h3>
                <div className="pl-6 border-l-4 border-blue-700">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">원예프로그램(10차수 수업)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>텃밭/꽃밭수업</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>단기수업 및 심화단계로 차수수업</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 농촌활성화 사업 */}
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6">농촌활성화 사업</h3>
                <div className="pl-6 border-l-4 border-blue-700">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">주거역량강화 체험학습 사업</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>창의목공, 분경, 텃밭/꽃밭수업, 교육,영상수업 등 다양한 체험 수업 제공</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">•</span>
                      <span>단기수업 및 심화단계로 차수수업</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 프로그램 상세 섹션 */}
      <section className="bg-blue-50">
        <div className="container-main section-padding">
          <h2 className="heading-2 text-center mb-16">프로그램 상세 안내</h2>
          
          <div className="space-y-16">
            {programDetailImages.map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* 이미지 영역 */}
                  <div className="md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-50">
                    <div className="h-full min-h-[400px] flex items-center justify-center p-12">
                      <div className="text-center text-blue-300">
                        <svg className="w-24 h-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg text-blue-400">영상 사진 위주로 역동성 있게...</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 텍스트 영역 */}
                  <div className="md:w-1/2 p-8 md:p-12">
                    <h3 className="text-2xl font-bold text-blue-900 mb-8">{program.title}</h3>
                    
                    <div className="space-y-8">
                      {program.items.map((item, idx) => (
                        <div key={idx}>
                          <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-blue-100">
                            {item.subtitle}
                          </h4>
                          {item.details.length > 0 && (
                            <ul className="space-y-2 text-gray-600">
                              {item.details.map((detail, detailIdx) => (
                                <li key={detailIdx} className="flex items-start">
                                  <span className="text-blue-700 mr-2 mt-1">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-10">
                      <button className="btn-primary">
                        프로그램 자세히 보기
                      </button>
                    </div>
                  </div>
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
          <a href="/contact" className="btn-primary inline-block">
            프로그램 문의하기
          </a>
        </div>
      </section>
    </>
  )
}