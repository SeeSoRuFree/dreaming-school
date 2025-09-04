import { ProgramDetail, ProgramSession } from '@/types'

const STORAGE_KEY = 'programDetails'

const initialProgramData: Record<string, ProgramDetail> = {
  '1': {
    id: '1',
    title: '세상에서 가장 위대한 한평 집짓기',
    subtitle: '실제 집짓기 체험교육',
    description: '세상에서 가장 위대한 한평 집 짓기는 인성교육과 함께 10주~12주간 아이들이 직접 집을 지으며 꿈과 비전을 키우는 프로그램입니다.',
    target: '초중고학생, 성인',
    duration: '10주~12주간',
    maxParticipants: 20,
    fee: '문의',
    location: '문의',
    category: 'building',
    createdAt: new Date(),
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
    id: '2',
    title: '모형집짓기 체험교육 사업',
    subtitle: '수준별 맞춤형 모형 집짓기 프로그램',
    description: '연령과 수준에 맞는 다양한 모형 집짓기 프로그램을 통해 건축의 기초 원리를 이해하고 창의력과 공간 설계 능력을 키우는 체험 교육입니다.',
    target: '초등학생 전 학년',
    duration: '프로그램별 상이\n(2시간~3일)',
    maxParticipants: 20,
    fee: '문의',
    location: '문의',
    category: 'building',
    createdAt: new Date(),
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
    id: '3',
    title: '원예프로그램',
    subtitle: '자연과 교감하는 창의 체험 교육',
    description: '분경, 테라리움, 플렌테리어 등 다양한 원예 프로그램을 통해\n자연과 교감하고 창의력을 키우는 체험 교육입니다.',
    target: '전 연령',
    duration: '프로그램별 상이',
    maxParticipants: 20,
    fee: '문의',
    location: '문의',
    category: 'gardening',
    createdAt: new Date(),
    sessions: [
      {
        order: 1,
        title: '분경수업',
        description: '최소 소요시간: 1일(3시간)',
        images: [
          '/images/program/4/1620363947652-3.jpg',
          '/images/program/4/IMG_8547.jpg',
          '/images/program/1/20200925_115529.jpg',
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
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
          '/images/program/4/IMG_8547.jpg'
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
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
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
          '/images/program/4/IMG_8547.jpg'
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
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
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
          '/images/program/4/IMG_8547.jpg'
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
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
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
          '/images/program/4/IMG_8547.jpg'
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
          '/images/program/4/KakaoTalk_20210605_133031925_07.jpg'
        ]
      }
    ]
  },
  '4': {
    id: '4',
    title: '원예프로그램',
    subtitle: '흙을 만지며 마음을 키우는 시간',
    description: '텃밭과 꽃밭을 가꾸며 자연과 교감하고 생명의 소중함을 배우는 힐링 원예 프로그램입니다.',
    target: '초중고 학생',
    duration: '10주 과정',
    maxParticipants: 20,
    fee: '무료 (종자 및 재료비 별도)',
    location: '꿈을짓는학교 텃밭',
    category: 'gardening',
    createdAt: new Date(),
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
    id: '5',
    title: '농촌활성화 사업',
    subtitle: '농촌에 새로운 활력을 불어넣는 프로젝트',
    description: '농촌 지역과 함께 성장하는 상생 프로그램을 통해 농촌 활성화에 기여합니다.',
    target: '전 연령',
    duration: '프로그램별 상이',
    maxParticipants: 15,
    fee: '문의',
    location: '협력 농촌 마을',
    category: 'rural',
    createdAt: new Date(),
    sessions: [
      {
        order: 1,
        title: '농촌주민들과 함께하는 세상에서 가장 위대한 한평집짓기',
        description: '농촌 지역 주민들과 함께 한평집을 지으며 공동체 의식을 함양하고 주거 환경을 개선합니다.',
        images: [
          '/images/program/5/14.JPG',
          '/images/program/5/20210521_095311.jpg',
          '/images/program/5/5555.JPG',
          '/images/program/5/GOPR0430.JPG'
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
          '/images/program/5/20210521_095311.jpg'
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
          '/images/program/5/GOPR0430.JPG'
        ]
      }
    ]
  },
  '6': {
    id: '6',
    title: '공간 재창조 리모델링 사업',
    subtitle: '우리가 만드는 새로운 공간',
    description: '학교와 지역 공간을 학생들과 함께 리모델링하며 창의력과 협동심을 기르는 프로그램입니다.',
    target: '중고등학생',
    duration: '프로그램별 상이',
    maxParticipants: 15,
    fee: '무료 (재료비 지원)',
    location: '프로젝트 현장',
    category: 'remodeling',
    createdAt: new Date(),
    sessions: [
      {
        order: 1,
        title: '학교의 유휴공간을 교육적 환경으로 리모델링',
        description: '운동장 환경 조성, 교실공간의 재창조 등 학교 공간을 새롭게 디자인하고 변화시킵니다.',
        images: [
          '/images/program/3/KakaoTalk_20211013_123434390_19.jpg',
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg',
          '/images/program/3/KakaoTalk_20220604_102553556_01.jpg',
          '/images/program/3/KakaoTalk_20220611_132307516_08.jpg'
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
          '/images/program/3/KakaoTalk_20211013_123532460_14.jpg'
        ]
      }
    ]
  },
  '7': {
    id: '7',
    title: '과학창의교육 및 체험학습',
    subtitle: '창의적 사고력을 키우는 체험 교육',
    description: '과학 원리를 배우고 직접 만들어보는 체험 중심의 창의 교육 프로그램입니다.',
    target: '초중고 학생',
    duration: '프로그램별 상이',
    maxParticipants: 15,
    fee: '무료 (재료비 별도)',
    location: '꿈을짓는학교 과학실',
    category: 'science',
    createdAt: new Date(),
    sessions: [
      {
        order: 1,
        title: '과학교육 - 비행기 원리 및 비행기 만들어 비행하기',
        description: '',
        images: [
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
          '/images/program/2/20200917_114245.jpg'
        ]
      }
    ]
  }
}

export const initializeProgramData = () => {
  if (typeof window === 'undefined') return
  
  const existingData = localStorage.getItem(STORAGE_KEY)
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgramData))
  }
}

export const getAllProgramDetails = (): ProgramDetail[] => {
  if (typeof window === 'undefined') return []
  
  initializeProgramData()
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  
  const programDetails = JSON.parse(data)
  return Object.values(programDetails)
}

export const getProgramDetailById = (id: string): ProgramDetail | null => {
  if (typeof window === 'undefined') return null
  
  initializeProgramData()
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return null
  
  const programDetails = JSON.parse(data)
  return programDetails[id] || null
}

export const updateProgramDetail = (id: string, updatedProgram: ProgramDetail): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    const programDetails = data ? JSON.parse(data) : {}
    
    programDetails[id] = {
      ...updatedProgram,
      id,
      updatedAt: new Date()
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(programDetails))
    return true
  } catch (error) {
    console.error('Failed to update program:', error)
    return false
  }
}

export const addProgramSession = (programId: string, session: ProgramSession): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const program = getProgramDetailById(programId)
    if (!program) return false
    
    const updatedProgram = {
      ...program,
      sessions: [...program.sessions, session]
    }
    
    return updateProgramDetail(programId, updatedProgram)
  } catch (error) {
    console.error('Failed to add session:', error)
    return false
  }
}

export const updateProgramSession = (
  programId: string, 
  sessionIndex: number, 
  updatedSession: ProgramSession
): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const program = getProgramDetailById(programId)
    if (!program) return false
    
    const sessions = [...program.sessions]
    sessions[sessionIndex] = updatedSession
    
    const updatedProgram = {
      ...program,
      sessions
    }
    
    return updateProgramDetail(programId, updatedProgram)
  } catch (error) {
    console.error('Failed to update session:', error)
    return false
  }
}

export const deleteProgramSession = (programId: string, sessionIndex: number): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const program = getProgramDetailById(programId)
    if (!program) return false
    
    const sessions = program.sessions.filter((_, index) => index !== sessionIndex)
    
    const updatedProgram = {
      ...program,
      sessions
    }
    
    return updateProgramDetail(programId, updatedProgram)
  } catch (error) {
    console.error('Failed to delete session:', error)
    return false
  }
}

export const reorderProgramSessions = (
  programId: string, 
  fromIndex: number, 
  toIndex: number
): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const program = getProgramDetailById(programId)
    if (!program) return false
    
    const sessions = [...program.sessions]
    const [movedSession] = sessions.splice(fromIndex, 1)
    sessions.splice(toIndex, 0, movedSession)
    
    const reorderedSessions = sessions.map((session, index) => ({
      ...session,
      order: index + 1
    }))
    
    const updatedProgram = {
      ...program,
      sessions: reorderedSessions
    }
    
    return updateProgramDetail(programId, updatedProgram)
  } catch (error) {
    console.error('Failed to reorder sessions:', error)
    return false
  }
}