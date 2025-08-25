import { CrewApplication } from '@/types'

// Mock 미디어 파일 데이터
export const mockMediaFiles = [
  {
    id: 'media_1',
    name: '히어로_배경_영상.mp4',
    url: '/images/hero-video.mp4',
    type: 'video' as const,
    category: 'hero' as const,
    order: 0,
    uploadedAt: new Date('2024-01-15'),
    size: 15728640 // 15MB
  },
  {
    id: 'media_2',
    name: '히어로_배경_이미지1.jpg',
    url: '/images/hero-bg1.jpg',
    type: 'image' as const,
    category: 'hero' as const,
    order: 1,
    uploadedAt: new Date('2024-01-15'),
    size: 2097152 // 2MB
  },
  {
    id: 'media_3',
    name: '히어로_배경_이미지2.jpg',
    url: '/images/hero-bg2.jpg',
    type: 'image' as const,
    category: 'hero' as const,
    order: 2,
    uploadedAt: new Date('2024-01-15'),
    size: 1572864 // 1.5MB
  },
  
  // 소형 집짓기 체험교육 이미지들
  {
    id: 'media_4',
    name: '집짓기_메인.jpg',
    url: '/images/programs/building-main.jpg',
    type: 'image' as const,
    category: 'program' as const,
    programId: 'building',
    order: 0,
    uploadedAt: new Date('2024-01-20'),
    size: 3145728 // 3MB
  },
  {
    id: 'media_5',
    name: '집짓기_활동1.jpg',
    url: '/images/programs/building-1.jpg',
    type: 'image' as const,
    category: 'program' as const,
    programId: 'building',
    order: 1,
    uploadedAt: new Date('2024-01-20'),
    size: 2621440 // 2.5MB
  },
  {
    id: 'media_6',
    name: '집짓기_활동2.jpg',
    url: '/images/programs/building-2.jpg',
    type: 'image' as const,
    category: 'program' as const,
    programId: 'building',
    order: 2,
    uploadedAt: new Date('2024-01-20'),
    size: 2097152 // 2MB
  },
  
  // 과학창의교육 이미지들
  {
    id: 'media_7',
    name: '과학_실험1.jpg',
    url: '/images/programs/science-1.jpg',
    type: 'image' as const,
    category: 'program' as const,
    programId: 'science',
    order: 0,
    uploadedAt: new Date('2024-01-22'),
    size: 1835008 // 1.75MB
  },
  {
    id: 'media_8',
    name: '과학_실험2.jpg',
    url: '/images/programs/science-2.jpg',
    type: 'image' as const,
    category: 'program' as const,
    programId: 'science',
    order: 1,
    uploadedAt: new Date('2024-01-22'),
    size: 2359296 // 2.25MB
  },
  {
    id: 'media_9',
    name: '과학_체험_영상.mp4',
    url: '/images/programs/science-video.mp4',
    type: 'video' as const,
    category: 'program' as const,
    programId: 'science',
    order: 2,
    uploadedAt: new Date('2024-01-22'),
    size: 10485760 // 10MB
  },
  
  // 원예프로그램 이미지들
  {
    id: 'media_10',
    name: '원예_정원1.jpg',
    url: '/images/programs/gardening-1.jpg',
    type: 'image' as const,
    category: 'program' as const,
    programId: 'gardening',
    order: 0,
    uploadedAt: new Date('2024-01-25'),
    size: 2883584 // 2.75MB
  },
  {
    id: 'media_11',
    name: '원예_활동.jpg',
    url: '/images/programs/gardening-2.jpg',
    type: 'image' as const,
    category: 'program' as const,
    programId: 'gardening',
    order: 1,
    uploadedAt: new Date('2024-01-25'),
    size: 1572864 // 1.5MB
  },
  
  // 갤러리 이미지들
  {
    id: 'media_12',
    name: '갤러리_2024_봄_행사.jpg',
    url: '/images/gallery/spring-event.jpg',
    type: 'image' as const,
    category: 'gallery' as const,
    order: 0,
    uploadedAt: new Date('2024-02-01'),
    size: 3670016 // 3.5MB
  },
  {
    id: 'media_13',
    name: '갤러리_여름_캠프.jpg',
    url: '/images/gallery/summer-camp.jpg',
    type: 'image' as const,
    category: 'gallery' as const,
    order: 1,
    uploadedAt: new Date('2024-02-01'),
    size: 4194304 // 4MB
  },
  {
    id: 'media_14',
    name: '갤러리_가을_축제.jpg',
    url: '/images/gallery/autumn-festival.jpg',
    type: 'image' as const,
    category: 'gallery' as const,
    order: 2,
    uploadedAt: new Date('2024-02-01'),
    size: 3145728 // 3MB
  }
]

// Mock 크루 신청 데이터
export const mockCrewApplications: CrewApplication[] = [
  {
    id: 'crew_app_1',
    userId: 'user_pending_1',
    status: 'pending',
    appliedAt: new Date('2024-12-20T10:00:00'),
    motivation: `안녕하세요! 저는 교육에 대한 열정이 많은 대학생입니다.
    
꿈을짓는학교의 비전과 가치에 깊이 공감하며, 아이들의 꿈을 함께 키워나가는 일에 참여하고 싶습니다.
    
특히 과학 교육 프로그램에 관심이 많으며, 제가 가진 지식과 경험을 나누고 싶습니다.`,
    experience: `- 대학교 과학 동아리 3년 활동
- 지역 아동센터 과학 멘토링 1년 경험
- 초등학교 방과후 과학 수업 보조교사 6개월
- 청소년 과학캠프 진행 스태프 경험`,
    availableTime: `평일: 오후 3시 ~ 7시
주말: 전일 가능
방학 기간: 전일 가능`,
    skills: ['과학교육', '멘토링', '프로그램 기획', '아동교육']
  },
  {
    id: 'crew_app_2',
    userId: 'user_pending_2',
    status: 'pending',
    appliedAt: new Date('2024-12-21T14:30:00'),
    motivation: `지역사회에 의미있는 기여를 하고 싶어 지원합니다.
    
은퇴 후 제 경험과 시간을 아이들을 위해 사용하고 싶습니다. 목공과 DIY에 대한 경험이 있어 집짓기 체험교육 프로그램에 도움이 될 것 같습니다.`,
    experience: `- 30년 건축업 종사
- 목공 DIY 동호회 5년 활동
- 주말 목공 교실 강사 2년`,
    availableTime: `평일: 오전 9시 ~ 오후 5시
주말: 토요일 오전`,
    skills: ['목공', '건축', 'DIY', '안전교육', '프로젝트 관리']
  },
  {
    id: 'crew_app_3',
    userId: 'user_pending_3',
    status: 'pending',
    appliedAt: new Date('2024-12-22T09:15:00'),
    motivation: `원예치료사 자격증을 보유하고 있으며, 아이들과 함께 정원을 가꾸며 마음의 안정과 성장을 돕고 싶습니다.
    
자연과 함께하는 교육의 중요성을 알리고, 아이들이 생명의 소중함을 배울 수 있도록 돕고 싶습니다.`,
    experience: `- 원예치료사 자격증 보유
- 도시농업 전문가 과정 수료
- 커뮤니티 가든 3년 운영
- 유치원 텃밭 프로그램 진행 경험`,
    availableTime: `화, 목: 오전 10시 ~ 오후 2시
토요일: 오전 9시 ~ 오후 1시`,
    skills: ['원예', '원예치료', '텃밭관리', '환경교육', '생태교육']
  },
  {
    id: 'crew_app_4',
    userId: 'user_approved_1',
    status: 'approved',
    appliedAt: new Date('2024-12-10T11:00:00'),
    processedAt: new Date('2024-12-12T15:00:00'),
    processedBy: 'admin_default',
    motivation: `미술 전공자로서 아이들의 창의력 개발에 도움을 주고 싶습니다.`,
    experience: `- 미술교육 전공
- 아동미술 지도사 자격증
- 방과후 미술교사 3년`,
    availableTime: `월, 수, 금: 오후 2시 ~ 6시`,
    skills: ['미술교육', '창의력개발', '아동미술'],
    notes: '미술 프로그램 담당 크루로 승인. 매우 열정적이고 준비가 잘 되어있음.'
  },
  {
    id: 'crew_app_5',
    userId: 'user_approved_2',
    status: 'approved',
    appliedAt: new Date('2024-12-08T16:20:00'),
    processedAt: new Date('2024-12-09T10:00:00'),
    processedBy: 'admin_default',
    motivation: `IT 교육을 통해 디지털 격차를 해소하고 싶습니다.`,
    experience: `- 프로그래밍 강사 5년
- 코딩교육 봉사 2년
- 스크래치, 엔트리 교육 경험`,
    availableTime: `주말 전일 가능`,
    skills: ['코딩교육', '로봇공학', 'IT교육', '프로그래밍'],
    notes: 'IT/코딩 교육 프로그램 개발 및 운영 담당'
  },
  {
    id: 'crew_app_6',
    userId: 'user_rejected_1',
    status: 'rejected',
    appliedAt: new Date('2024-12-05T13:45:00'),
    processedAt: new Date('2024-12-06T09:30:00'),
    processedBy: 'admin_default',
    motivation: `시간이 날 때 가끔 봉사하고 싶습니다.`,
    experience: `특별한 경험 없음`,
    availableTime: `불규칙`,
    skills: [],
    notes: '활동 시간이 불규칙하고 경험이 부족하여 현재는 보류. 추후 재지원 권유.'
  }
]

// Mock 사용자 데이터 (크루 신청자들)
export const mockCrewUsers = [
  {
    id: 'user_pending_1',
    name: '김민수',
    email: 'minsu.kim@example.com',
    phone: '010-1234-5678',
    password: '',
    role: 'member' as const,
    gender: 'male' as const,
    crewStatus: 'pending' as const,
    joinPath: '온라인 검색',
    firstImpression: '교육 봉사에 관심이 있어 지원했습니다.',
    createdAt: new Date('2024-12-15')
  },
  {
    id: 'user_pending_2',
    name: '박영희',
    email: 'younghee.park@example.com',
    phone: '010-2345-6789',
    password: '',
    role: 'member' as const,
    gender: 'female' as const,
    crewStatus: 'pending' as const,
    joinPath: '지인 추천',
    firstImpression: '은퇴 후 재능기부를 하고 싶습니다.',
    createdAt: new Date('2024-12-16')
  },
  {
    id: 'user_pending_3',
    name: '이정원',
    email: 'jungwon.lee@example.com',
    phone: '010-3456-7890',
    password: '',
    role: 'member' as const,
    gender: 'female' as const,
    crewStatus: 'pending' as const,
    joinPath: 'SNS',
    firstImpression: '원예치료를 통해 아이들을 돕고 싶습니다.',
    createdAt: new Date('2024-12-17')
  },
  {
    id: 'user_approved_1',
    name: '최수진',
    email: 'sujin.choi@example.com',
    phone: '010-4567-8901',
    password: '',
    role: 'crew' as const,
    gender: 'female' as const,
    crewStatus: 'approved' as const,
    joinPath: '대학교 게시판',
    firstImpression: '미술교육으로 아이들과 소통하고 싶습니다.',
    createdAt: new Date('2024-12-01')
  },
  {
    id: 'user_approved_2',
    name: '장현우',
    email: 'hyunwoo.jang@example.com',
    phone: '010-5678-9012',
    password: '',
    role: 'crew' as const,
    gender: 'male' as const,
    crewStatus: 'approved' as const,
    joinPath: '봉사 포털',
    firstImpression: 'IT 교육 봉사를 하고 싶습니다.',
    createdAt: new Date('2024-11-28')
  },
  {
    id: 'user_rejected_1',
    name: '정태호',
    email: 'taeho.jung@example.com',
    phone: '010-6789-0123',
    password: '',
    role: 'member' as const,
    gender: 'male' as const,
    crewStatus: 'rejected' as const,
    joinPath: '기타',
    firstImpression: '시간 날 때 봉사',
    createdAt: new Date('2024-11-20')
  }
]

// localStorage 초기화 함수
export function initializeAdminMockData() {
  // 미디어 파일 초기화
  const existingMedia = localStorage.getItem('media-files')
  if (!existingMedia) {
    localStorage.setItem('media-files', JSON.stringify(mockMediaFiles))
  }
  
  // 크루 신청 초기화
  const existingApplications = localStorage.getItem('crew-applications')
  if (!existingApplications) {
    localStorage.setItem('crew-applications', JSON.stringify(mockCrewApplications))
  }
  
  // 크루 사용자 추가
  const existingUsers = localStorage.getItem('dream-house-users')
  if (existingUsers) {
    const users = JSON.parse(existingUsers)
    const existingUserIds = users.map((u: any) => u.id)
    
    // 중복되지 않는 사용자만 추가
    const newUsers = mockCrewUsers.filter(u => !existingUserIds.includes(u.id))
    if (newUsers.length > 0) {
      const updatedUsers = [...users, ...newUsers]
      localStorage.setItem('dream-house-users', JSON.stringify(updatedUsers))
    }
  } else {
    localStorage.setItem('dream-house-users', JSON.stringify(mockCrewUsers))
  }
}