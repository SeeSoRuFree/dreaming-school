'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getProgramById } from '@/lib/supabase'

interface ProgramSession {
  id: string
  order_num: number
  title: string
  description?: string
  images?: { id: string; image_url: string; order_num: number }[]
}

interface ProgramData {
  id: string
  title: string
  subtitle?: string
  description?: string
  target?: string
  duration?: string
  max_participants?: string
  fee?: string
  location?: string
  category: string
  is_active: boolean
  sessions?: ProgramSession[]
}

export default function ProgramDetailPage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [program, setProgram] = useState<ProgramData | null>(null)
  const [loading, setLoading] = useState(true)

  const programId = params.id as string

  useEffect(() => {
    const loadProgram = async () => {
      try {
        setLoading(true)
        const data = await getProgramById(programId)
        setProgram(data)
      } catch (error) {
        console.error('프로그램 로딩 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProgram()
  }, [programId])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">프로그램을 찾을 수 없습니다</h1>
          <Link href="/programs">
            <Button variant="outline">
              <ChevronLeft className="w-4 h-4 mr-2" />
              프로그램 목록으로
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - 크루들의 방과 동일한 스타일 */}
      <section className="bg-gradient-to-b from-orange-50 to-white">
        <div className="container-main py-16">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              체험교육 프로그램
            </div>
          </div>
          <h1 className="heading-1 text-center">{program.title}</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            {program.subtitle}
          </p>
        </div>
      </section>

      {/* 프로그램 개요 섹션 */}
      <div className="container-main py-16">
          <div className="max-w-5xl mx-auto">
          {/* 프로그램 소개 - 간결하고 강조된 디자인 */}
          <div className="relative mb-16">
            {/* 배경 블러 효과 */}
            <div className="absolute inset-0 bg-blue-700 rounded-2xl blur-3xl opacity-20"></div>
            
            {/* 메인 컨텐츠 */}
            <div className="relative bg-white border-2 border-blue-100 rounded-2xl p-12">
              <p className="text-xl text-center text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto whitespace-pre-line">
                {program.description}
              </p>
              
              {/* 핵심 가치 - 미니멀한 디자인 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">인성교육</h4>
                  <p className="text-sm text-gray-600">12가지 인성 함양</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{program.duration}</h4>
                  <p className="text-sm text-gray-600">체계적인 프로그램</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔨</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">직접 체험</h4>
                  <p className="text-sm text-gray-600">실습 중심 교육</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">꿈과 비전</h4>
                  <p className="text-sm text-gray-600">미래 설계 지원</p>
                </div>
              </div>

              {/* 프로그램 정보 */}
              {(program.target || program.duration || program.max_participants || program.fee || program.location) && (
                <div className="border-t border-gray-200 pt-8 mb-8">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                    {program.target && (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">대상</p>
                        <p className="font-medium text-gray-900">{program.target}</p>
                      </div>
                    )}
                    {program.duration && (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">교육 기간</p>
                        <p className="font-medium text-gray-900 whitespace-pre-line">{program.duration}</p>
                      </div>
                    )}
                    {program.max_participants && (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">정원</p>
                        <p className="font-medium text-gray-900">{program.max_participants}명</p>
                      </div>
                    )}
                    {program.fee && (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">비용</p>
                        <p className="font-medium text-gray-900">{program.fee}</p>
                      </div>
                    )}
                    {program.location && (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">장소</p>
                        <p className="font-medium text-gray-900">{program.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 신청 버튼 - 심플한 디자인 */}
              <div className="flex justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  문의하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회차별 교육 내용 */}
      {program.sessions && program.sessions.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="space-y-20">
            <div className="container-main">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                {program.sessions.length}주 회차별 교육 내용
              </h2>
              <p className="text-center text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
                체계적인 커리큘럼으로 진행됩니다.
              </p>
          </div>
          
          {/* 회차별 교육 내용 */}
          <div className="space-y-16">
            {program.sessions.map((session, index) => (
              <div key={session.id} className="space-y-6">
                {/* 회차 설명 */}
                <div className="container-main">
                  <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-lg rounded-full w-14 h-14 flex items-center justify-center mr-4 shadow-lg">
                        {session.order_num}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{session.title}</h3>
                      </div>
                    </div>
                    {session.description && (
                      <p className="text-lg text-gray-700 ml-18 whitespace-pre-line">{session.description}</p>
                    )}
                  </div>
                </div>

                {/* 이미지 그리드 */}
                {session.images && session.images.length > 0 && (
                  <div className="container-main">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {session.images.map((image) => (
                        <div
                          key={image.id}
                          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                          onClick={() => setSelectedImage(image.image_url)}
                        >
                          <img
                            src={image.image_url}
                            alt={session.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>
        </div>
      )}

      {/* 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-[80vh]">
            <img
              src={selectedImage}
              alt="확대 이미지"
              className="w-full h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 신청 모달 */}
    </div>
  )
}