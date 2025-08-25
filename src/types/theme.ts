export type ThemeType = 'default' | 'modern' | 'vibrant' | 'eco'

export interface ThemeConfig {
  id: ThemeType
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    hero: string
  }
  heroTexts: string[]
  keywords: string[]
  features: {
    title: string
    description: string
    icon: string
  }[]
}

export const themes: Record<ThemeType, ThemeConfig> = {
  default: {
    id: 'default',
    name: '기본 메인',
    description: '꿈을짓는학교 기본 소개 페이지',
    colors: {
      primary: 'rgb(29 78 216)', // blue-700
      secondary: 'rgb(251 191 36)', // amber-400
      accent: 'rgb(16 185 129)', // emerald-500
      background: 'rgb(239 246 255)', // blue-50
      text: 'rgb(31 41 55)', // gray-800
      hero: 'linear-gradient(135deg, rgb(29 78 216) 0%, rgb(59 130 246) 100%)'
    },
    heroTexts: [
      '꿈을 짓는 교육',
      '배움의 행복을 전하고',
      '삶의 가치를 나누는',
      '사회적협동조합'
    ],
    keywords: ['사회적협동조합', '교육서비스', '청소년 행복', '지역사회'],
    features: [
      {
        title: '집짓기 체험교육',
        description: '집단성취감을 통한 바른 품성과 자긍심 회복',
        icon: 'HOME'
      },
      {
        title: '과학창의교육',
        description: '체험형 STEAM 교육으로 미래 인재 양성',
        icon: 'SCIENCE'
      },
      {
        title: '원예 프로그램',
        description: '자연과 함께하는 힐링 교육',
        icon: 'NATURE'
      }
    ]
  },
  modern: {
    id: 'modern',
    name: '모던 프로페셔널',
    description: '깔끔하고 신뢰감 있는 전문 교육기관',
    colors: {
      primary: 'rgb(29 78 216)', // blue-700
      secondary: 'rgb(99 102 241)', // indigo-500
      accent: 'rgb(59 130 246)', // blue-500
      background: 'rgb(248 250 252)', // gray-50
      text: 'rgb(31 41 55)', // gray-800
      hero: 'linear-gradient(135deg, rgb(29 78 216) 0%, rgb(99 102 241) 100%)'
    },
    heroTexts: [
      '체계적이고 전문적인',
      '미래 교육의 시작',
      '신뢰할 수 있는 교육 파트너',
      '꿈을 짓는 학교'
    ],
    keywords: ['전문성', '체계적 교육', '신뢰성', '미래 교육'],
    features: [
      {
        title: '체계적 커리큘럼',
        description: '단계별 맞춤형 교육 프로그램',
        icon: 'CURRICULUM'
      },
      {
        title: '전문 강사진',
        description: '검증된 전문가와 함께하는 교육',
        icon: 'EXPERT'
      },
      {
        title: '성과 관리',
        description: '데이터 기반 학습 성과 분석',
        icon: 'ANALYTICS'
      }
    ]
  },
  vibrant: {
    id: 'vibrant',
    name: '활기찬 커뮤니티',
    description: '웃음과 배움이 가득한 교육 공동체',
    colors: {
      primary: 'rgb(251 146 60)', // orange-400
      secondary: 'rgb(236 72 153)', // pink-500
      accent: 'rgb(251 191 36)', // amber-400
      background: 'rgb(255 247 237)', // orange-50
      text: 'rgb(31 41 55)', // gray-800
      hero: 'linear-gradient(135deg, rgb(251 146 60) 0%, rgb(236 72 153) 100%)'
    },
    heroTexts: [
      '행복한 배움의',
      '활기찬 공동체',
      '친구들과 함께 성장하는',
      '즐거운 교육'
    ],
    keywords: ['공동체', '즐거운 배움', '친구', '행복'],
    features: [
      {
        title: '함께하는 프로젝트',
        description: '친구들과 협력하는 즐거운 활동',
        icon: 'TOGETHER'
      },
      {
        title: '창의적 놀이',
        description: '놀이를 통한 자연스러운 학습',
        icon: 'PLAY'
      },
      {
        title: '소통과 나눔',
        description: '서로 돕고 나누는 따뜻한 관계',
        icon: 'SHARE'
      }
    ]
  },
  eco: {
    id: 'eco',
    name: '에코 교육',
    description: '자연과 함께하는 지속가능한 교육',
    colors: {
      primary: 'rgb(5 150 105)', // emerald-600
      secondary: 'rgb(34 197 94)', // green-500
      accent: 'rgb(16 185 129)', // emerald-500
      background: 'rgb(236 253 245)', // emerald-50
      text: 'rgb(31 41 55)', // gray-800
      hero: 'linear-gradient(135deg, rgb(5 150 105) 0%, rgb(34 197 94) 100%)'
    },
    heroTexts: [
      '자연과 함께',
      '지속가능한 교육',
      '환경을 생각하고',
      '지구를 보호하는 배움'
    ],
    keywords: ['친환경', '지속가능', '생태교육', '환경보호'],
    features: [
      {
        title: '친환경 프로그램',
        description: '재활용과 업사이클링 교육',
        icon: 'RECYCLE'
      },
      {
        title: '자연 탐구',
        description: '생태계와 환경 이해하기',
        icon: 'EXPLORE'
      },
      {
        title: '그린 프로젝트',
        description: '지구를 위한 작은 실천',
        icon: 'GREEN'
      }
    ]
  }
}