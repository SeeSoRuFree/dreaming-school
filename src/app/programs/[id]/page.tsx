'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import InfiniteScrollGallery from '@/components/ui/InfiniteScrollGallery'

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
    title: '세상에서 가장 위대한 한평 집짓기',
    subtitle: '실제 집짓기 체험교육',
    description: '세상에서 가장 위대한 한평 집 짓기는 인성교육과 함께 10주~12주간 아이들이 직접 집을 지으며 꿈과 비전을 키우는 프로그램입니다.',
    objectives: [
      '학생들이 주관하는 건축활동',
      '이론과 실습 조화로운 병행'
    ],
    target: '초중고학생, 성인',
    duration: '10주~12주간',
    maxParticipants: 20,
    fee: '문의',
    location: '문의',
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
        title: '도색 및 페인트 작업',
        description: '내외부 도색 및 마감 페인트',
        images: [
          '/images/program-detail/20201030_102755.jpg',
          '/images/program-detail/20201030_102811.jpg',
          '/images/program-detail/20201105_101304.jpg',
          '/images/program-detail/20200910_095511.jpg'
        ]
      },
      {
        order: 9,
        title: '조경 및 외부 환경 조성',
        description: '주변 환경 정리 및 조경 작업',
        images: [
          '/images/program-detail/20201105_101304.jpg',
          '/images/program-detail/20200910_095511.jpg',
          '/images/program-detail/20200917_103041.jpg',
          '/images/program-detail/20200917_103051.jpg'
        ]
      },
      {
        order: 10,
        title: '최종 점검 및 보완',
        description: '전체 구조 점검 및 세부 보완 작업',
        images: [
          '/images/program-detail/20200917_103041.jpg',
          '/images/program-detail/20200917_103051.jpg',
          '/images/program-detail/20200917_114233(0).jpg',
          '/images/program-detail/20200917_114245.jpg'
        ]
      },
      {
        order: 11,
        title: '품평회 및 프레젠테이션',
        description: '작업 과정 공유 및 학습 내용 발표',
        images: [
          '/images/program-detail/20201016_105805.jpg',
          '/images/program-detail/20201016_110634.jpg',
          '/images/program-detail/20201016_104806.jpg',
          '/images/program-detail/20201015_101250.jpg'
        ]
      },
      {
        order: 12,
        title: '완공행사(수료식)',
        description: '소감문,사진전 - 완성된 집 견학 및 수료식',
        images: [
          '/images/program-detail/20201030_102755.jpg',
          '/images/program-detail/20201030_102811.jpg',
          '/images/program-detail/20201105_101304.jpg',
          '/images/program-detail/20200918_112159.jpg'
        ]
      }
    ]
  },
  '2': {
    title: '모형집짓기 체험교육 사업',
    subtitle: '수준별 맞춤형 모형 집짓기 프로그램',
    description: '연령과 수준에 맞는 다양한 모형 집짓기 프로그램을 통해 건축의 기초 원리를 이해하고 창의력과 공간 설계 능력을 키우는 체험 교육입니다.',
    objectives: [
      '건축 기초 원리 이해',
      '공간 설계 및 창의력 개발',
      '협동심과 성취감 함양'
    ],
    target: '초등학생 전 학년',
    duration: '프로그램별 상이\n(2시간~3일)',
    maxParticipants: 20,
    fee: '문의',
    location: '문의',
    sessions: [
      {
        order: 1,
        title: '벽걸이용 모형집짓기 (저학년용)',
        description: '2시간 과정 - 이론교육 포함. 초등 저학년을 위한 간단한 벽걸이형 모형집 제작',
        images: [
          '/images/program/1/20200910_104741.jpg',
          '/images/program/1/20200925_104354.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/1/20201015_115153.jpg'
        ]
      },
      {
        order: 2,
        title: '한평형 모형집짓기',
        description: '3시간 과정 - 이론교육 포함. 한 평 크기의 모형집을 제작하며 건축의 기본 구조 학습',
        images: [
          '/images/program/1/20200925_104354.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/1/20201015_115153.jpg',
          '/images/program/1/20200910_104741.jpg'
        ]
      },
      {
        order: 3,
        title: '두평형 모형집짓기',
        description: '2일~3일 과정 - 단기수업 및 심화단계로 차수수업. 두 평 크기의 정교한 모형집 제작',
        images: [
          '/images/program/1/20201015_115153.jpg',
          '/images/program/1/20200910_104741.jpg',
          '/images/program/1/20200925_104354.jpg',
          '/images/program/1/20200925_115529.jpg'
        ]
      }
    ]
  },
  '3': {
    title: '원예프로그램',
    subtitle: '자연과 교감하는 창의 체험 교육',
    description: '분경, 테라리움, 플렌테리어 등 다양한 원예 프로그램을 통해\n자연과 교감하고 창의력을 키우는 체험 교육입니다.',
    objectives: [
      '자연 친화적 감성 개발',
      '창의력과 예술 감각 함양',
      '집중력과 인내심 향상'
    ],
    target: '전 연령',
    duration: '프로그램별 상이',
    maxParticipants: 20,
    fee: '문의',
    location: '문의',
    sessions: [
      {
        order: 1,
        title: '분경수업',
        description: '최소 소요시간: 1일(3시간)',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      },
      {
        order: 2,
        title: '테라리움수업',
        description: '최소 소요시간: 1일(3시간)',
        images: [
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      },
      {
        order: 3,
        title: '플렌테리어수업',
        description: '최소 소요시간: 1일(3시간)',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      },
      {
        order: 4,
        title: '정원만들기수업',
        description: '최소 소요시간: 1일(2시간) - 3일',
        images: [
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      },
      {
        order: 5,
        title: '압화캐릭터수업',
        description: '최소 소요시간: 1일(2시간)',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      },
      {
        order: 6,
        title: '리스화관수업',
        description: '최소 소요시간: 1일(3시간)',
        images: [
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      },
      {
        order: 7,
        title: '축하꽃양초수업',
        description: '최소 소요시간: 1일(3시간)',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      },
      {
        order: 8,
        title: '아로마 꽃 비누수업',
        description: '최소 소요시간: 1일(3시간)',
        images: [
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      },
      {
        order: 9,
        title: '우드버닝화수업',
        description: '최소 소요시간: 1일(4시간)',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg',
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg'
        ]
      }
    ]
  },
  '7': {
    title: '과학창의교육 및 체험학습',
    subtitle: '창의적 사고력을 키우는 체험 교육',
    description: '과학 원리를 배우고 직접 만들어보는 체험 중심의 창의 교육 프로그램입니다.',
    objectives: [
      '과학적 사고력 증진',
      '창의적 문제해결 능력 향상'
    ],
    target: '초중고 학생',
    duration: '프로그램별 상이',
    maxParticipants: 15,
    fee: '무료 (재료비 별도)',
    location: '꿈을짓는학교 과학실',
    sessions: [
      {
        order: 1,
        title: '과학교육 - 비행기 원리 및 비행기 만들어 비행하기',
        description: '',
        images: [
          '/images/program/2/20200917_103051.jpg',
          '/images/program/2/20200917_114245.jpg',
          '/images/program/2/20201015_101250.jpg',
          '/images/program/2/20200917_103051.jpg',
          '/images/program/2/20200917_114245.jpg',
          '/images/program/2/20201015_101250.jpg'
        ]
      },
      {
        order: 2,
        title: '창의목공',
        description: '',
        images: [
          '/images/program/2/20201015_101250.jpg',
          '/images/program/2/20200917_103051.jpg',
          '/images/program/2/20200917_114245.jpg',
          '/images/program/2/20201015_101250.jpg',
          '/images/program/2/20200917_103051.jpg',
          '/images/program/2/20200917_114245.jpg'
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
          '/images/program/1/20200925_115529.jpg',
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
          '/images/program/1/20200925_115529.jpg',
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
          '/images/program/1/20200925_115529.jpg',
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
          '/images/program/1/20200925_115529.jpg',
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
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      }
    ]
  },
  '5': {
    title: '농촌활성화 사업',
    subtitle: '농촌에 새로운 활력을 불어넣는 프로젝트',
    description: '농촌 지역과 함께 성장하는 상생 프로그램을 통해 농촌 활성화에 기여합니다.',
    objectives: [
      '농촌 이해도 증진',
      '지역사회 공헌 의식 함양'
    ],
    target: '전 연령',
    duration: '프로그램별 상이',
    maxParticipants: 15,
    fee: '문의',
    location: '협력 농촌 마을',
    sessions: [
      {
        order: 1,
        title: '농촌주민들과 함께하는 세상에서 가장 위대한 한평집짓기',
        description: '농촌 지역 주민들과 함께 한평집을 지으며 공동체 의식을 함양하고 주거 환경을 개선합니다.',
        images: [
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg',
          '/images/program/5/5555.JPG',
          '/images/program/5/GOPR0430.JPG',
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg'
        ]
      },
      {
        order: 2,
        title: '농촌주민들과 함께하는 원예치유프로그램',
        description: '원예 활동을 통해 농촌 주민들의 정서적 치유와 공동체 활성화를 도모합니다.',
        images: [
          '/images/program/5/5555.JPG',
          '/images/program/5/GOPR0430.JPG',
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg',
          '/images/program/5/5555.JPG',
          '/images/program/5/GOPR0430.JPG'
        ]
      },
      {
        order: 3,
        title: '함께하는 농촌지역 살리기 컨설팅',
        description: '농촌 지역의 특성을 살린 맞춤형 발전 방안을 제시하고 실행을 지원합니다.',
        images: [
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg',
          '/images/program/5/5555.JPG',
          '/images/program/5/GOPR0430.JPG',
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg'
        ]
      }
    ]
  },
  '6': {
    title: '공간 재창조 리모델링 사업',
    subtitle: '우리가 만드는 새로운 공간',
    description: '학교와 지역 공간을 학생들과 함께 리모델링하며 창의력과 협동심을 기르는 프로그램입니다.',
    objectives: [
      '공간 활용 능력 개발',
      '협동과 소통 능력 향상'
    ],
    target: '중고등학생',
    duration: '프로그램별 상이',
    maxParticipants: 15,
    fee: '무료 (재료비 지원)',
    location: '프로젝트 현장',
    sessions: [
      {
        order: 1,
        title: '학교의 유휴공간을 교육적 환경으로 리모델링',
        description: '운동장 환경 조성, 교실공간의 재창조 등 학교 공간을 새롭게 디자인하고 변화시킵니다.',
        images: [
          '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg',
          '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
          '/images/program/3/KakaoTalk_20220611_132307516_08.jpg',
          '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg'
        ]
      },
      {
        order: 2,
        title: '학생들과 함께하는 리모델링',
        description: '실기, 이론, 인성의 복합교육을 통해 학생들이 직접 참여하는 공간 변화 프로젝트입니다.',
        images: [
          '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
          '/images/program/3/KakaoTalk_20220611_132307516_08.jpg',
          '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg',
          '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
          '/images/program/3/KakaoTalk_20220611_132307516_08.jpg'
        ]
      }
    ]
  }
}

export default function ProgramDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
                  <p className="text-sm text-gray-600">7가지 인성 함양</p>
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
              <div className="border-t border-gray-200 pt-8 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">대상</p>
                    <p className="font-medium text-gray-900">{program.target}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">교육 기간</p>
                    <p className="font-medium text-gray-900 whitespace-pre-line">{program.duration}</p>
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
      <div className="bg-gray-50 py-16">
        <div className="space-y-20">
          <div className="container-main">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              {programId === '2' ? '3가지 프로그램 과정' : 
               programId === '3' ? '9가지 원예 프로그램' :
               programId === '4' ? '2가지 프로그램' :
               programId === '5' ? '3가지 프로그램' :
               programId === '6' ? '2가지 프로그램' : 
               `${program.sessions.length}주 회차별 교육 내용`}
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
              {programId === '2' 
                ? '학년과 수준에 맞는 다양한 모형집짓기 프로그램을 선택하여 참여할 수 있습니다.'
                : programId === '3'
                ? '작품(고급과정)에 따라 소요시간은 변경될 수 있습니다.\n단기수업 및 심화단계로 차수수업이 진행됩니다.'
                : programId === '4'
                ? '과학 원리를 배우고 직접 만들어보는 체험 중심의 창의 교육 프로그램입니다.'
                : programId === '5'
                ? '농촌 지역과 함께 성장하고 발전하는 상생 프로그램입니다.'
                : programId === '6'
                ? '학교와 지역 공간을 새롭게 디자인하고 변화시키는 프로젝트입니다.'
                : '매주 단계별로 진행되는 체계적인 교육 과정을 통해 완성도 높은 결과물을 만들어갑니다.'}
            </p>
          </div>
          
          {/* 회차별 교육 내용 */}
          <div className="space-y-16">
            {program.sessions.map((session, index) => (
              <div key={session.order} className="space-y-6">
                {/* 회차 설명 */}
                <div className="container-main">
                  <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-lg rounded-full w-14 h-14 flex items-center justify-center mr-4 shadow-lg">
                        {programId === '2' || programId === '3' || programId === '4' || programId === '5' || programId === '6' ? session.order : `${session.order}주`}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{session.title}</h3>
                      </div>
                    </div>
                    {session.description && (
                      <p className="text-lg text-gray-700 ml-18">{session.description}</p>
                    )}
                  </div>
                </div>
                
                {/* 무한 스크롤 이미지 갤러리 */}
                <div className="w-full overflow-hidden">
                  <InfiniteScrollGallery
                    images={session.images.map((src, idx) => ({ 
                      src, 
                      alt: `${session.order}주차: ${session.title} - 이미지 ${idx + 1}` 
                    }))}
                    speed={35 + (index % 3) * 5} // 각 회차마다 약간 다른 속도
                  />
                </div>
              </div>
            ))}
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
    </div>
  )
}