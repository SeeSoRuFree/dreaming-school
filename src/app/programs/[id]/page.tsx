'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ApplicationModal from '@/components/programs/ApplicationModal'

interface Session {
  order: number
  title: string
  description: string
  images: string[]
}

const programDetails: Record<string, {
  title: string
  subtitle: string
  description: string
  objectives: string[]
  target: string
  duration: string
  maxParticipants: number
  fee: string
  location: string
  sessions: Session[]
}> = {
  '1': {
    title: '소형 집짓기 체험교육',
    subtitle: '세상에서 가장 위대한 한평 집짓기',
    description: '세상에서 가장 위대한 한평 집 짓기는 인성교육과 함께 8주간 아이들이 직접 집을 지으며 꿈과 비전을 키우는 프로그램입니다.',
    objectives: [
      '학생들이 주관하는 건축활동',
      '이론과 실습 조화로운 병행'
    ],
    target: '초중고 학생',
    duration: '8주 과정',
    maxParticipants: 20,
    fee: '무료 (재료비 별도)',
    location: '꿈을짓는학교 목공실',
    sessions: [
      {
        order: 1,
        title: '오리엔테이션 <건축장비 실습>',
        description: '집이란 무엇인가? 건축 도구 사용법 및 안전 교육',
        images: [
          '/images/program-detail/20200910_095511.jpg',
          '/images/program-detail/20200917_103041.jpg'
        ]
      },
      {
        order: 2,
        title: '벽체골조작업',
        description: '효과성 패러다임 - 벽체 프레임 제작 및 조립',
        images: [
          '/images/program-detail/20200917_103051.jpg',
          '/images/program-detail/20200917_114233(0).jpg'
        ]
      },
      {
        order: 3,
        title: '지붕골조작업',
        description: '자기 정체성 - 지붕 구조 이해 및 제작',
        images: [
          '/images/program-detail/20200917_114245.jpg',
          '/images/program-detail/20200917_115705.jpg'
        ]
      },
      {
        order: 4,
        title: '벽체 지붕작업',
        description: '꿈과비전 - 벽체와 지붕 결합 작업',
        images: [
          '/images/program-detail/20200917_115712.jpg',
          '/images/program-detail/20200917_120828.jpg'
        ]
      },
      {
        order: 5,
        title: '외부 마감작업',
        description: '삶의 원칙 - 외부 마감재 설치 및 방수 작업',
        images: [
          '/images/program-detail/20200918_112159.jpg',
          '/images/program-detail/20200924_110945.jpg'
        ]
      },
      {
        order: 6,
        title: '내부작업(창문,틀)',
        description: '감정의습리자 - 창문 설치 및 내부 프레임 작업',
        images: [
          '/images/program-detail/20201015_101250.jpg',
          '/images/program-detail/20201016_104806.jpg'
        ]
      },
      {
        order: 7,
        title: '내외부마감공사',
        description: '진정한아름다움 - 내외부 최종 마감 및 도색 작업',
        images: [
          '/images/program-detail/20201016_105805.jpg',
          '/images/program-detail/20201016_110634.jpg'
        ]
      },
      {
        order: 8,
        title: '완공행사(수료식)',
        description: '소감문,사진전 - 완성된 집 견학 및 수료식',
        images: [
          '/images/program-detail/20201030_102755.jpg',
          '/images/program-detail/20201030_102811.jpg',
          '/images/program-detail/20201105_101304.jpg'
        ]
      }
    ]
  },
  '2': {
    title: '과학창의교육 및 체험학습',
    subtitle: 'IT 교육으로 미래를 만들어가는 창의력 개발',
    description: '과학과 IT 기술을 융합하여 아이들의 창의력과 문제해결 능력을 키우는 체험 중심 교육 프로그램입니다.',
    objectives: [
      '과학적 사고력 증진',
      '창의적 문제해결 능력 향상'
    ],
    target: '초중고 학생',
    duration: '6주 과정',
    maxParticipants: 15,
    fee: '무료 (재료비 별도)',
    location: '꿈을짓는학교 과학실',
    sessions: [
      {
        order: 1,
        title: '과학의 기초',
        description: '기초 과학 이론 학습 및 실험 도구 사용법',
        images: [
          '/images/program/2/20200917_103051.jpg',
          '/images/program/2/20200917_114245.jpg'
        ]
      },
      {
        order: 2,
        title: '비행기 원리 탐구',
        description: '양력과 항력의 원리 이해 및 실험',
        images: [
          '/images/program/2/20201015_101250.jpg',
          '/images/program/2/20200917_103051.jpg'
        ]
      },
      {
        order: 3,
        title: '비행기 제작',
        description: '모형 비행기 설계 및 제작',
        images: [
          '/images/program/2/20200917_114245.jpg',
          '/images/program/2/20201015_101250.jpg'
        ]
      },
      {
        order: 4,
        title: 'IT 메이커 교육',
        description: '아두이노를 활용한 기초 코딩 학습',
        images: [
          '/images/program/2/20200917_103051.jpg',
          '/images/program/2/20200917_114245.jpg'
        ]
      },
      {
        order: 5,
        title: '영상 제작 기초',
        description: '디지털 미디어 제작 및 편집 기초',
        images: [
          '/images/program/2/20201015_101250.jpg',
          '/images/program/2/20200917_103051.jpg'
        ]
      },
      {
        order: 6,
        title: '프로젝트 발표',
        description: '개인/팀 프로젝트 발표 및 시연',
        images: [
          '/images/program/2/20200917_114245.jpg',
          '/images/program/2/20201015_101250.jpg'
        ]
      }
    ]
  },
  '3': {
    title: '공간 재창조 리모델링',
    subtitle: '낡은 공간을 새롭게, 함께 만드는 변화',
    description: '학교의 유휴공간을 학생들과 함께 교육적 환경으로 재창조하는 참여형 리모델링 프로그램입니다.',
    objectives: [
      '공간 설계 능력 개발',
      '협업과 소통 능력 향상'
    ],
    target: '중고등학생',
    duration: '10주 과정',
    maxParticipants: 12,
    fee: '무료',
    location: '참여 학교 내',
    sessions: [
      {
        order: 1,
        title: '공간 분석',
        description: '현재 공간의 문제점 파악 및 개선 방향 설정',
        images: [
          '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg'
        ]
      },
      {
        order: 2,
        title: '디자인 기획',
        description: '공간 활용 아이디어 구상 및 설계',
        images: [
          '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
          '/images/program/3/KakaoTalk_20220611_132307516_08.jpg'
        ]
      },
      {
        order: 3,
        title: '재료 준비',
        description: '필요한 재료 선정 및 준비',
        images: [
          '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg'
        ]
      },
      {
        order: 4,
        title: '철거 작업',
        description: '기존 구조물 철거 및 정리',
        images: [
          '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
          '/images/program/3/KakaoTalk_20220611_132307516_08.jpg'
        ]
      },
      {
        order: 5,
        title: '기초 공사',
        description: '바닥 및 벽면 기초 작업',
        images: [
          '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg'
        ]
      },
      {
        order: 6,
        title: '인테리어 작업',
        description: '벽면 도색 및 장식 작업',
        images: [
          '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
          '/images/program/3/KakaoTalk_20220611_132307516_08.jpg'
        ]
      },
      {
        order: 7,
        title: '가구 제작',
        description: '맞춤형 가구 제작 및 설치',
        images: [
          '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg'
        ]
      },
      {
        order: 8,
        title: '마감 작업',
        description: '세부 마감 및 청소',
        images: [
          '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
          '/images/program/3/KakaoTalk_20220611_132307516_08.jpg'
        ]
      },
      {
        order: 9,
        title: '조명 설치',
        description: '조명 계획 및 설치',
        images: [
          '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg'
        ]
      },
      {
        order: 10,
        title: '완성 및 개관식',
        description: '공간 완성 및 개관 행사',
        images: [
          '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
          '/images/program/3/KakaoTalk_20220611_132307516_08.jpg'
        ]
      }
    ]
  },
  '4': {
    title: '원예프로그램',
    subtitle: '흙을 만지며 마음을 키우는 시간',
    description: '텃밭과 꽃밭을 가꾸며 자연과 교감하고 생명의 소중함을 배우는 힐링 원예 프로그램입니다.',
    objectives: [
      '자연 친화적 감성 개발',
      '책임감과 인내심 함양'
    ],
    target: '초중고 학생',
    duration: '10주 과정',
    maxParticipants: 20,
    fee: '무료 (종자 및 재료비 별도)',
    location: '꿈을짓는학교 텃밭',
    sessions: [
      {
        order: 1,
        title: '원예의 기초',
        description: '식물의 이해와 재배 기초 이론',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      },
      {
        order: 2,
        title: '토양 준비',
        description: '텃밭 조성 및 토양 개량',
        images: [
          '/images/program/4/IMG_8745.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      },
      {
        order: 3,
        title: '파종과 모종',
        description: '씨앗 파종 및 모종 심기',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      },
      {
        order: 4,
        title: '물주기와 관리',
        description: '적절한 물주기와 일상 관리법',
        images: [
          '/images/program/4/IMG_8745.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      },
      {
        order: 5,
        title: '병충해 관리',
        description: '친환경 병충해 예방 및 관리',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      },
      {
        order: 6,
        title: '꽃밭 조성',
        description: '계절꽃 심기 및 화단 디자인',
        images: [
          '/images/program/4/IMG_8745.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      },
      {
        order: 7,
        title: '허브 가든',
        description: '허브 식물 재배 및 활용법',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      },
      {
        order: 8,
        title: '수확의 기쁨',
        description: '채소 수확 및 요리 체험',
        images: [
          '/images/program/4/IMG_8745.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      },
      {
        order: 9,
        title: '화분 만들기',
        description: '실내 가드닝을 위한 화분 제작',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      },
      {
        order: 10,
        title: '수확 축제',
        description: '텃밭 수확물 나눔 행사',
        images: [
          '/images/program/4/IMG_8745.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      }
    ]
  },
  '5': {
    title: '농촌활성화 주거역량강화',
    subtitle: '농촌에 새로운 활력을 불어넣는 프로젝트',
    description: '농촌 지역의 주거 환경을 개선하고 다양한 체험 활동을 통해 농촌 활성화에 기여하는 프로그램입니다.',
    objectives: [
      '농촌 이해도 증진',
      '지역사회 공헌 의식 함양'
    ],
    target: '중고등학생 및 대학생',
    duration: '8주 과정',
    maxParticipants: 15,
    fee: '무료',
    location: '협력 농촌 마을',
    sessions: [
      {
        order: 1,
        title: '농촌 이해하기',
        description: '농촌의 현실과 가치 이해',
        images: [
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg'
        ]
      },
      {
        order: 2,
        title: '주거 실태 조사',
        description: '농촌 주거 환경 현장 조사',
        images: [
          '/images/program/5/5555.JPG',
          '/images/program/5/GOPR0430.JPG'
        ]
      },
      {
        order: 3,
        title: '개선 계획 수립',
        description: '주거 환경 개선 방안 기획',
        images: [
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg'
        ]
      },
      {
        order: 4,
        title: '기초 보수 작업',
        description: '노후 주택 기초 보수',
        images: [
          '/images/program/5/5555.JPG',
          '/images/program/5/GOPR0430.JPG'
        ]
      },
      {
        order: 5,
        title: '벽체 보강',
        description: '단열 및 방수 작업',
        images: [
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg'
        ]
      },
      {
        order: 6,
        title: '지붕 수리',
        description: '지붕 보수 및 개량',
        images: [
          '/images/program/5/5555.JPG',
          '/images/program/5/GOPR0430.JPG'
        ]
      },
      {
        order: 7,
        title: '마을 가꾸기',
        description: '공동 공간 정비 및 미화',
        images: [
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg'
        ]
      },
      {
        order: 8,
        title: '마을 잔치',
        description: '주민과 함께하는 완공 축하 행사',
        images: [
          '/images/program/5/5555.JPG',
          '/images/program/5/GOPR0430.JPG'
        ]
      }
    ]
  }
}

export default function ProgramDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)

  const programId = params.id as string
  const program = programDetails[programId]

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
      <section className="bg-gradient-to-b from-blue-50 to-white">
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
              <p className="text-xl text-center text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
                {program.description}
              </p>
              
              {/* 핵심 가치 - 미니멀한 디자인 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">인성교육</h4>
                  <p className="text-sm text-gray-600">7가지 인성 함양</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">8주 과정</h4>
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
              <div className="border-t border-gray-200 pt-8 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">대상</p>
                    <p className="font-medium text-gray-900">{program.target}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">교육 기간</p>
                    <p className="font-medium text-gray-900">{program.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">정원</p>
                    <p className="font-medium text-gray-900">{program.maxParticipants}명</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">비용</p>
                    <p className="font-medium text-gray-900">{program.fee}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">장소</p>
                    <p className="font-medium text-gray-900">{program.location}</p>
                  </div>
                </div>
              </div>
              
              {/* 신청 버튼 - 심플한 디자인 */}
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8"
                  onClick={() => setIsApplicationModalOpen(true)}
                >
                  프로그램 신청하기
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 font-semibold px-8"
                  onClick={() => router.push('/contact')}
                >
                  문의하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회차별 교육 내용 */}
      <div className="bg-gray-50 py-16">
        <div className="container-main">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">회차별 교육 내용</h2>
            
            {/* 타임라인 스타일 */}
            <div className="relative">
              {/* 세로선 */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-12">
                {program.sessions.map((session, index) => (
                  <div key={session.order} className="relative flex gap-8">
                    {/* 주차 번호 */}
                    <div className="flex-shrink-0 w-16 h-16 bg-white border-4 border-blue-700 rounded-full flex items-center justify-center shadow-sm z-10">
                      <span className="text-xl font-bold text-blue-700">{session.order}</span>
                    </div>
                    
                    {/* 내용 카드 */}
                    <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{session.title}</h3>
                      <p className="text-gray-600 mb-4">{session.description}</p>
                      
                      {/* 이미지 그리드 */}
                      <div className="grid grid-cols-2 gap-3">
                        {session.images.slice(0, 2).map((image, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImage(image)}
                          >
                            <Image
                              src={image}
                              alt={`${session.title} - 사진 ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-[80vh]">
            <Image
              src={selectedImage}
              alt="확대 이미지"
              fill
              className="object-contain"
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
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        programTitle={program.title}
      />
    </div>
  )
}