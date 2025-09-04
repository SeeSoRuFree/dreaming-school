import { Program, News, HistoryItem, GeneralInquiry, User, CrewApplication, CrewPost, FootstepPost } from '@/types'

export const mockPrograms: Program[] = [
  // 소형 집짓기 체험교육 사업
  {
    id: '1',
    title: '소형 집짓기 체험교육 사업',
    description: '학생들이 직접 짓는 세상에서 가장 위대한 한 평 집 짓기',
    duration: '10~12회기(회당 2~3시간)',
    target: '초·중·고등학생',
    fee: 0,
    category: 'building',
    details: [
      '학생들이 직접 짓는 세상에서 가장 위대한 한 평 집 짓기',
      '실기, 이론, 품성교육의 복합교육 제시',
      '기자니아식 현장감있는 교육 운영',
      '10~12회기(회당 2~3시간) 구성'
    ],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: '모형집짓기 체험교육 사업',
    description: '1평형, 2평형, 데크 등 학교요구조건 수용',
    duration: '단기수업 및 심화단계로 차수수업',
    target: '초·중·고등학생',
    fee: 0,
    category: 'building',
    details: [
      '1평형, 2평형, 데크 등 학교요구조건 수용',
      '단기수업 및 심화단계로 차수수업'
    ],
    createdAt: new Date('2024-01-15')
  },

  // 원예프로그램
  {
    id: '3',
    title: '원예프로그램(10차수 수업)',
    description: '분경, 텃밭/꽃밭수업 등 다양한 원예 활동',
    duration: '10차수',
    target: '전 연령대',
    fee: 0,
    category: 'gardening',
    details: [
      '분경',
      '텃밭/꽃밭수업',
      '단기수업 및 심화단계로 차수수업'
    ],
    createdAt: new Date('2024-02-01')
  },

  // 과학창의교육 및 체험학습 사업
  {
    id: '4',
    title: 'IT 교육 및 체험학습 사업',
    description: '과학교육(비행기 원리 및 비행기만들어 비행하기)',
    duration: '단기수업 및 심화단계',
    target: '초·중·고등학생',
    fee: 30000,
    category: 'science',
    details: [
      '과학교육(비행기 원리 및 비행기만들어 비행하기)',
      '창의목공, 분경, 텃밭/꽃밭수업, IT접목메이커',
      '교육,영상수업 등 다양한 체험 수업 제공',
      '단기수업 및 심화단계로 차수수업'
    ],
    createdAt: new Date('2024-03-10')
  },

  // 농촌활성화 사업
  {
    id: '5',
    title: '주거역량강화 체험학습 사업',
    description: '창의목공, 분경, 텃밭/꽃밭수업 등',
    duration: '단기수업 및 심화단계',
    target: '전 연령대',
    fee: 0,
    category: 'rural',
    details: [
      '창의목공, 분경, 텃밭/꽃밭수업',
      '교육,영상수업 등 다양한 체험 수업 제공',
      '단기수업 및 심화단계로 차수수업'
    ],
    createdAt: new Date('2024-04-01')
  },

  // 공간 재창조 리모델링 사업
  {
    id: '6',
    title: '공간 재창조 리모델링 사업',
    description: '학교의 유휴공간을 교육적 환경으로 리모델링',
    duration: '실기, 이론, 인성의 복합교육 제시',
    target: '학교/교육기관',
    fee: 0,
    category: 'remodeling',
    details: [
      '학교의 유휴공간을 교육적 환경으로 리모델링',
      '(운동장 환경 조성, 교실공간의 재창조)',
      '학생들과 함께하는 리모델링',
      '(실기, 이론, 인성의 복합교육 제시)'
    ],
    createdAt: new Date('2024-05-01')
  }
]

export const mockNews: News[] = [
  // 최신 소식
  {
    id: '1',
    title: '2025년 아산나눔재단 성장트랙사업 선정 소식',
    content: '꿈을짓는학교가 2025년 아산나눔재단 성장트랙사업에 선정되어 더욱 다양하고 전문적인 교육프로그램을 제공할 수 있게 되었습니다. 이번 선정으로 교육 인프라 확대와 프로그램 품질 향상에 집중할 예정입니다.',
    category: 'news',
    createdAt: new Date('2025-01-15'),
    featured: true
  },
  {
    id: '2',
    title: '산청군 신안면 교육거점 확장 개소',
    content: '지역 교육 접근성 향상을 위해 산청군 신안면에 새로운 교육거점을 개소하였습니다. 이로써 더 많은 농촌 지역 학생들이 양질의 교육기회를 제공받을 수 있게 되었습니다.',
    category: 'news',
    createdAt: new Date('2025-01-10')
  },
  {
    id: '3',
    title: '2024년 경남을 살리는 아이디어경진대회 최우수상 수상',
    content: '꿈을짓는학교의 혁신적인 교육모델이 인정받아 2024년 경남을 살리는 아이디어경진대회에서 최우수상을 수상하였습니다. 농촌 교육 활성화에 기여한 공로를 인정받았습니다.',
    category: 'news',
    createdAt: new Date('2024-12-20')
  },
  {
    id: '4',
    title: '함안군 3개면 목공교육 프로그램 성공적 종료',
    content: '함안군 3개면에서 진행된 작은집짓기 목공수업이 성공적으로 종료되었습니다. 총 120명의 학생들이 참여하여 높은 만족도를 보였으며, 내년에도 확대 운영할 예정입니다.',
    category: 'news',
    createdAt: new Date('2024-12-15')
  },
  {
    id: '5',
    title: '북면초등학교 원예힐링프로그램 운영 중',
    content: '북면초등학교 전학년을 대상으로 원예힐링프로그램을 운영하고 있습니다. 학생들의 정서적 안정과 자연친화적 감성 발달에 도움이 되고 있어 학부모들의 호응이 높습니다.',
    category: 'news',
    createdAt: new Date('2024-11-30')
  },

  // 공지사항
  {
    id: '6',
    title: '2025년 상반기 교육프로그램 신청 안내',
    content: '2025년 상반기 교육프로그램 신청을 받습니다.\n\n• 신청기간: 2025년 2월 1일 ~ 2월 28일\n• 대상: 초·중·고등학생 및 일반인\n• 프로그램: 집짓기 체험, 원예교육, IT융합교육 등\n• 신청방법: 온라인 신청 또는 전화 신청\n\n자세한 내용은 홈페이지를 참고하시기 바랍니다.',
    category: 'notice',
    createdAt: new Date('2025-01-20'),
    featured: true
  },
  {
    id: '7',
    title: '조합원 정기총회 개최 안내',
    content: '2025년 정기총회를 다음과 같이 개최합니다.\n\n• 일시: 2025년 3월 15일(토) 오후 2시\n• 장소: 꿈을짓는학교 본관 강당\n• 안건: 2024년 사업보고, 2025년 사업계획 등\n\n모든 조합원들의 참석을 부탁드립니다.',
    category: 'notice',
    createdAt: new Date('2025-01-18')
  },
  {
    id: '8',
    title: '설 연휴 교육센터 운영 안내',
    content: '설 연휴 기간 동안 교육센터 운영 일정을 안내드립니다.\n\n• 휴무기간: 2025년 1월 28일(화) ~ 2월 2일(일)\n• 정상운영: 2025년 2월 3일(월)부터\n\n연휴 기간 중 긴급 문의사항은 비상연락처로 연락 바랍니다.',
    category: 'notice',
    createdAt: new Date('2025-01-12')
  },
  {
    id: '9',
    title: '2025년 강사진 모집 공고',
    content: '꿈을짓는학교에서 함께할 전문 강사진을 모집합니다.\n\n• 모집분야: 목공교육, 원예교육, IT교육 강사\n• 자격요건: 해당 분야 경력 3년 이상\n• 우대사항: 청소년 교육 경험, 관련 자격증 보유\n• 지원방법: 이메일 접수\n\n자세한 사항은 채용공고를 확인해 주세요.',
    category: 'notice',
    createdAt: new Date('2025-01-08')
  },
  {
    id: '10',
    title: 'COVID-19 방역수칙 안내',
    content: '안전한 교육환경 조성을 위한 방역수칙을 안내드립니다.\n\n• 교육장 입장 시 체온 측정 및 손소독 필수\n• 마스크 착용 권장\n• 발열, 기침 등 증상 시 참여 자제\n• 교육장 내 충분한 환기 실시\n\n모든 교육생들의 협조를 부탁드립니다.',
    category: 'notice',
    createdAt: new Date('2024-12-25')
  }
]

export const mockHistory: HistoryItem[] = [
  {
    id: '1',
    year: 2020,
    month: 3,
    title: '꿈을 짓는 학교 사회적협동조합 설립',
    description: '지역사회 교육 발전을 위한 사회적협동조합 설립'
  },
  {
    id: '2',
    year: 2020,
    month: 6,
    title: '첫 번째 교육프로그램 시작',
    description: '청소년 대상 창업 교육프로그램 첫 개강'
  },
  {
    id: '3',
    year: 2021,
    month: 4,
    title: '성인 평생교육 프로그램 신설',
    description: '성인 대상의 다양한 평생교육 과정 신설'
  },
  {
    id: '4',
    year: 2022,
    month: 1,
    title: '디지털 교육 프로그램 도입',
    description: '디지털 시대에 맞는 교육 컨텐츠 개발 및 도입'
  },
  {
    id: '5',
    year: 2023,
    month: 9,
    title: '새로운 교육 시설 이전',
    description: '더 나은 교육 환경을 위한 신축 교육 시설로 이전'
  }
]

export const mockGeneralInquiries: GeneralInquiry[] = [
  {
    id: '1',
    name: '김학부모',
    email: 'parent.kim@email.com',
    title: '소형 집짓기 체험교육 문의',
    content: '안녕하세요. 초등학교 5학년 아이가 있는데, 소형 집짓기 체험교육에 참여하고 싶습니다.\n\n몇 가지 궁금한 점이 있어서 문의드립니다.\n1. 교육 일정은 어떻게 되나요?\n2. 아이가 혼자 참여해도 괜찮을까요?\n3. 준비물이 따로 있나요?\n\n답변 부탁드립니다.',
    category: '교육프로그램',
    isPublic: true,
    createdAt: new Date('2025-01-20'),
    replies: [
      {
        id: 'r1',
        content: '안녕하세요. 문의 주셔서 감사합니다.\n\n1. 교육 일정: 매주 토요일 오전 10시~12시 (총 12회기)\n2. 혼자 참여 가능하며, 안전을 위해 강사가 개별 지도합니다.\n3. 작업복과 간단한 간식만 준비해 주시면 됩니다.\n\n추가 문의사항이 있으시면 언제든 연락 주세요.',
        author: '꿈을짓는학교',
        isOfficial: true,
        createdAt: new Date('2025-01-21')
      }
    ]
  },
  {
    id: '2',
    name: '이선생님',
    email: 'teacher.lee@school.edu',
    title: '학급 단체 프로그램 신청 관련',
    content: '안녕하세요. 중학교 기술가정 교사입니다.\n\n2학년 한 학급(30명)이 함께 참여할 수 있는 프로그램이 있는지 문의드립니다. 모형집짓기나 목공 체험을 생각하고 있는데, 가능한 일정과 비용을 알려주시면 감사하겠습니다.\n\n학교에서는 버스 이용해서 방문 예정입니다.',
    category: '교육프로그램',
    isPublic: true,
    createdAt: new Date('2025-01-18'),
    replies: [
      {
        id: 'r2',
        content: '선생님, 안녕하세요!\n\n30명 단체 프로그램 가능합니다. 모형집짓기 체험을 추천드리며, 3시간 과정으로 진행됩니다.\n\n- 비용: 학생 1인당 15,000원\n- 일정: 평일 오전 9시~12시 (협의 가능)\n- 준비사항: 작업복, 점심 도시락\n\n자세한 상담을 위해 전화 연락드리겠습니다.',
        author: '꿈을짓는학교',
        isOfficial: true,
        createdAt: new Date('2025-01-19')
      }
    ]
  },
  {
    id: '3',
    name: '박지민',
    email: 'jimin.park@email.com',
    title: '원예프로그램 개인 참여 가능한가요?',
    content: '안녕하세요. 원예에 관심이 많은 고등학생입니다.\n\n원예프로그램에 개인적으로 참여하고 싶은데 가능한가요? 특히 분경에 관심이 있어서 자세히 배우고 싶습니다.',
    category: '교육프로그램',
    isPublic: true,
    createdAt: new Date('2025-01-15'),
    replies: []
  },
  {
    id: '4',
    name: '정관리자',
    email: 'admin.jung@office.go.kr',
    title: '교육센터 시설 견학 문의',
    content: '안녕하세요. 교육청 관계자입니다.\n\n타 지역 교육프로그램 벤치마킹을 위해 시설 견학을 하고 싶습니다. 가능한 일정과 절차를 알려주시면 감사하겠습니다.',
    category: '시설이용',
    isPublic: true,
    createdAt: new Date('2025-01-12'),
    replies: [
      {
        id: 'r3',
        content: '교육청 관계자분께서 견학 문의 주셔서 감사합니다.\n\n시설 견학은 언제든 환영이며, 사전 예약 후 방문해 주시면 됩니다.\n- 견학 가능 시간: 평일 오후 2시~5시\n- 소요 시간: 약 1시간 30분\n- 담당자 동행 안내 가능\n\n전화로 일정 조율 부탁드립니다.',
        author: '꿈을짓는학교',
        isOfficial: true,
        createdAt: new Date('2025-01-13')
      }
    ]
  },
  {
    id: '5',
    name: '최학부모',
    email: 'parent.choi@email.com',
    title: '교육비 지원 프로그램이 있나요?',
    content: '안녕하세요. 한부모 가정으로 경제적으로 어려운 상황입니다.\n\n아이가 집짓기 체험에 많은 관심을 보이는데, 교육비 지원이나 할인 혜택이 있는지 문의드립니다.',
    category: '기타',
    isPublic: false,
    createdAt: new Date('2025-01-10'),
    replies: [
      {
        id: 'r4',
        content: '안녕하세요. 문의 주셔서 감사합니다.\n\n저소득층 자녀 대상 교육비 지원 프로그램이 있습니다.\n- 지원 범위: 교육비 50~100% 지원\n- 신청 방법: 관련 서류 제출 후 심사\n- 필요 서류: 소득증명서, 가족관계증명서 등\n\n자세한 상담을 위해 개별 연락드리겠습니다.',
        author: '꿈을짓는학교',
        isOfficial: true,
        createdAt: new Date('2025-01-11')
      }
    ]
  },
  {
    id: '6',
    name: '한대학생',
    email: 'student.han@univ.ac.kr',
    title: '교육 봉사활동 참여 문의',
    content: '대학생입니다. 교육 봉사활동에 참여하고 싶은데 어떤 방법이 있나요?\n\n건축학과 학생이라 관련 지식을 활용해서 도움이 되고 싶습니다.',
    category: '기타',
    isPublic: true,
    createdAt: new Date('2025-01-08'),
    replies: []
  },
  {
    id: '7',
    name: '윤선생님',
    email: 'teacher.yoon@school.edu',
    title: '방학 중 특별 프로그램 운영 여부',
    content: '안녕하세요. 초등학교 교사입니다.\n\n여름방학이나 겨울방학 기간에 특별 프로그램이 운영되는지 궁금합니다. 학생들에게 소개하고 싶어서요.',
    category: '교육프로그램',
    isPublic: true,
    createdAt: new Date('2025-01-05'),
    replies: [
      {
        id: 'r5',
        content: '선생님, 안녕하세요!\n\n방학 특별 프로그램을 매년 운영하고 있습니다.\n\n- 여름방학: 7월 말~8월 초 (2주간)\n- 겨울방학: 1월 중순~말 (2주간)\n- 프로그램: 집짓기, 원예, IT 융합교육\n- 모집 시기: 방학 시작 1개월 전\n\n자세한 일정은 추후 공지하겠습니다.',
        author: '꿈을짓는학교',
        isOfficial: true,
        createdAt: new Date('2025-01-06')
      }
    ]
  },
  {
    id: '8',
    name: '김학생',
    email: 'student.kim@email.com',
    title: '진로 상담 프로그램이 있나요?',
    content: '고등학교 2학년 학생입니다. 건축이나 목공 분야에 관심이 있어서 관련 진로 상담을 받고 싶습니다.\n\n진로 상담 프로그램이나 멘토링이 있는지 문의드립니다.',
    category: '기타',
    isPublic: true,
    createdAt: new Date('2025-01-03'),
    replies: []
  }
]

export const mockUsers: User[] = [
  {
    id: 'admin_default',
    name: '관리자',
    email: 'admin@dreamhouse.coop',
    password: 'admin123',
    phone: '010-0000-0000',
    gender: 'other',
    joinPath: '시스템 초기화',
    firstImpression: '꿈을짓는학교의 관리자입니다.',
    createdAt: new Date('2024-01-01'),
    role: 'admin',
    crewStatus: 'approved'
  },
  {
    id: 'crew_001',
    name: '김크루',
    email: 'crew1@example.com',
    password: 'crew123',
    phone: '010-1111-1111',
    gender: 'female',
    joinPath: '지인 소개',
    firstImpression: '아이들과 함께하는 교육활동에 관심이 많습니다.',
    createdAt: new Date('2024-06-15'),
    role: 'crew',
    crewStatus: 'approved'
  },
  {
    id: 'crew_002',
    name: '이봉사',
    email: 'crew2@example.com',
    password: 'crew123',
    phone: '010-2222-2222',
    gender: 'male',
    joinPath: 'SNS 광고',
    firstImpression: '목공 경험을 살려 봉사하고 싶습니다.',
    createdAt: new Date('2024-07-20'),
    role: 'crew',
    crewStatus: 'approved'
  },
  {
    id: 'member_001',
    name: '박회원',
    email: 'member1@example.com',
    password: 'member123',
    phone: '010-3333-3333',
    gender: 'female',
    joinPath: '인터넷 검색',
    firstImpression: '다양한 체험 프로그램이 인상적이었습니다.',
    createdAt: new Date('2024-08-01'),
    role: 'member'
  }
]

export const mockCrewApplications: CrewApplication[] = [
  {
    id: 'app_001',
    userId: 'crew_001',
    motivation: '어릴 때부터 교육에 관심이 많았고, 특히 아이들과 소통하며 성장하는 모습을 보는 것이 좋습니다. 꿈을짓는학교의 교육철학에 공감하며, 제가 가진 교육 경험을 통해 아이들에게 도움이 되고 싶습니다.',
    experience: '대학교에서 교육봉사동아리 활동 2년, 지역아동센터 학습지도 6개월, 캠프 진행 보조 경험 다수',
    availableTime: '주말 오전 9시-6시, 평일 저녁 7시-9시',
    skills: ['교육 및 강의', '요리', '사진/영상 촬영'],
    status: 'approved',
    appliedAt: new Date('2024-06-10'),
    processedAt: new Date('2024-06-15'),
    processedBy: 'admin_default',
    notes: '교육 경험이 풍부하고 아이들과의 소통 능력이 뛰어남. 크루 활동에 적극적으로 참여할 것으로 기대됨.'
  },
  {
    id: 'app_002',
    userId: 'crew_002',
    motivation: '목공 기술을 활용하여 아이들에게 실용적인 교육을 제공하고 싶습니다. 손으로 직접 만드는 경험을 통해 아이들이 성취감을 느낄 수 있도록 도움을 주고 싶습니다.',
    experience: '목공소 근무 5년, 개인 목공 작업 10년 이상, 성인 대상 목공 강의 경험 2년',
    availableTime: '토요일 오전 10시-5시, 일요일 오후 2시-6시',
    skills: ['목공 작업', '디자인', '운전'],
    status: 'approved',
    appliedAt: new Date('2024-07-15'),
    processedAt: new Date('2024-07-20'),
    processedBy: 'admin_default',
    notes: '전문적인 목공 기술을 보유하고 있어 집짓기 프로그램에 큰 도움이 될 것으로 예상됨.'
  }
]

export const mockCrewPosts: CrewPost[] = [
  {
    id: 'post_001',
    authorId: 'crew_001',
    authorName: '김크루',
    title: '새로운 크루 여러분, 환영합니다! 🎉',
    content: '안녕하세요! 크루 활동을 시작한 지 몇 달이 되었는데, 정말 보람찬 시간들이었어요.\n\n새롭게 합류하신 크루분들께 몇 가지 팁을 공유하고 싶어요:\n\n1. 아이들과의 첫 만남에서는 편안한 분위기 조성이 중요해요\n2. 안전사고 예방을 위해 항상 주의 깊게 살펴보세요\n3. 궁금한 점은 언제든 다른 크루들에게 물어보세요!\n\n함께 활동하게 되어 정말 기뻐요. 잘 부탁드립니다! 😊',
    category: 'general',
    likes: ['crew_002', 'admin_default'],
    comments: [
      {
        id: 'comment_001',
        postId: 'post_001',
        authorId: 'crew_002',
        authorName: '이봉사',
        content: '좋은 팁 감사해요! 저도 처음이라 긴장됐는데 많은 도움이 될 것 같아요.',
        createdAt: new Date('2024-12-01T15:30:00')
      },
      {
        id: 'comment_002',
        postId: 'post_001',
        authorId: 'admin_default',
        authorName: '관리자',
        content: '김크루님이 항상 세심하게 챙겨주셔서 감사해요. 새로운 크루분들에게 큰 도움이 될 것 같습니다.',
        createdAt: new Date('2024-12-01T16:45:00')
      }
    ],
    createdAt: new Date('2024-12-01T14:20:00')
  },
  {
    id: 'post_002',
    authorId: 'crew_002',
    authorName: '이봉사',
    title: '이번 주 목공 수업 준비물 체크',
    content: '안녕하세요! 이번 주 토요일 목공 수업을 담당하게 된 이봉사입니다.\n\n수업 준비를 위해 필요한 재료들을 정리해봤어요:\n\n✅ 소나무 판재 (20cm x 30cm) - 15개\n✅ 사포 (120방, 240방) - 각 10장\n✅ 목공풀 - 3병\n✅ 클램프 - 10개\n✅ 안전 고글 - 15개\n\n혹시 추가로 필요한 것이 있거나, 준비 과정에서 도움이 필요하시면 언제든 연락주세요!\n\n아이들이 안전하고 즐겁게 참여할 수 있도록 최선을 다하겠습니다.',
    category: 'notice',
    likes: ['crew_001'],
    comments: [
      {
        id: 'comment_003',
        postId: 'post_002',
        authorId: 'crew_001',
        authorName: '김크루',
        content: '꼼꼼하게 준비해주셔서 고맙습니다! 안전 교육도 함께 진행하면 좋을 것 같아요.',
        createdAt: new Date('2024-12-02T09:15:00')
      }
    ],
    createdAt: new Date('2024-12-02T08:30:00')
  },
  {
    id: 'post_003',
    authorId: 'admin_default',
    authorName: '관리자',
    title: '12월 크루 정기모임 안내',
    content: '크루 여러분, 안녕하세요!\n\n12월 정기모임을 다음과 같이 안내드립니다.\n\n📅 일시: 12월 15일(일) 오후 2시\n📍 장소: 꿈을짓는학교 본관 회의실\n⏰ 소요시간: 약 2시간\n\n🗓️ 주요 안건:\n1. 11월 활동 결과 공유\n2. 12월 프로그램 일정 협의\n3. 내년 상반기 계획 논의\n4. 크루 활동 개선사항 의견 수렴\n5. 간단한 친목 시간\n\n참석 가능 여부를 댓글로 남겨주세요.\n많은 참여 부탁드립니다! 🙏',
    category: 'event',
    likes: ['crew_001', 'crew_002'],
    comments: [
      {
        id: 'comment_004',
        postId: 'post_003',
        authorId: 'crew_001',
        authorName: '김크루',
        content: '참석 가능합니다! 공유할 이야기도 많이 준비해갈게요.',
        createdAt: new Date('2024-12-03T10:20:00')
      },
      {
        id: 'comment_005',
        postId: 'post_003',
        authorId: 'crew_002',
        authorName: '이봉사',
        content: '참석하겠습니다. 목공 프로그램 관련해서도 제안사항이 있어서 말씀드리고 싶어요.',
        createdAt: new Date('2024-12-03T11:30:00')
      }
    ],
    createdAt: new Date('2024-12-03T09:00:00')
  }
]

export const mockFootstepPosts: FootstepPost[] = [
  {
    id: 'footstep_001',
    title: '첫 번째 한평 집짓기 완성! 아이들의 성취감이 대단했어요',
    content: `<h2>세상에서 가장 위대한 한평 집짓기 프로젝트 완료</h2>
    
<p>지난 3개월간 진행된 한평 집짓기 체험교육이 드디어 완료되었습니다. 초등학교 4학년부터 중학교 2학년까지 총 24명의 학생들이 참여했습니다.</p>

<h3>프로그램 진행 과정</h3>
<ul>
  <li><strong>1-3회차:</strong> 건축 기초 이론 및 설계도 그리기</li>
  <li><strong>4-8회차:</strong> 기초 공사부터 벽체 설치까지</li>
  <li><strong>9-12회차:</strong> 지붕 설치 및 마무리 작업</li>
</ul>

<p>특히 인상적이었던 점은 아이들이 직접 설계한 창문과 문의 위치가 실제 건축에 반영되었다는 것입니다. "제가 설계한 대로 집이 지어졌어요!"라며 기뻐하던 김○○ 학생의 모습이 아직도 생생합니다.</p>

<h3>참여 학생 소감</h3>
<blockquote>
<p>"처음엔 못할 것 같았는데 친구들과 함께 하니까 재미있었어요. 우리가 만든 집에 들어가니까 정말 뿌듯했어요!" - 박○○(초5)</p>
</blockquote>

<p>다음 기수도 벌써부터 신청 문의가 많이 들어오고 있습니다. 더 많은 아이들이 이런 소중한 경험을 할 수 있도록 노력하겠습니다.</p>`,
    programCategory: 'building',
    programName: '한평 집짓기',
    createdAt: new Date('2024-11-15'),
    authorId: 'admin_default',
    authorName: '관리자'
  },
  {
    id: 'footstep_002',
    title: '원예프로그램 10차수 완주! 아이들만의 작은 정원이 완성되었어요',
    content: `<h2>원예프로그램 10차수 수업 성공적으로 완료</h2>
    
<p>지난 10주간 매주 수요일 오후에 진행된 원예프로그램이 성공적으로 마무리되었습니다. 총 18명의 학생들이 참여하여 각자의 작은 정원을 완성했습니다.</p>

<h3>프로그램 주요 활동</h3>
<ul>
  <li><strong>1-2차시:</strong> 분경 만들기 - 나만의 미니 정원</li>
  <li><strong>3-4차시:</strong> 테라리움 제작 - 유리병 속 작은 세상</li>
  <li><strong>5-6차시:</strong> 텃밭 가꾸기 - 상추, 무, 당근 심기</li>
  <li><strong>7-8차시:</strong> 꽃밭 조성 - 팬지, 비올라 심기</li>
  <li><strong>9-10차시:</strong> 수확의 기쁨과 마무리 작업</li>
</ul>

<p>"처음엔 흙 만지는 게 싫었는데 이제는 매일 와서 물 주고 싶어요"라고 말하는 이○○ 학생의 변화가 특히 인상적이었습니다.</p>

<h3>수확의 기쁨</h3>
<p>마지막 수업에서는 직접 기른 상추와 무를 수확해서 샐러드를 만들어 먹었습니다. 아이들의 "우와~ 정말 맛있어요!" 하는 탄성이 아직도 귓가에 맴돕니다.</p>

<blockquote>
<p>"제가 심은 상추로 만든 샐러드가 이렇게 맛있을 줄 몰랐어요. 집에서도 키워보고 싶어요!" - 최○○(초4)</p>
</blockquote>

<p>다음 달부터는 봄 원예프로그램 준비에 들어갑니다. 더 다양한 식물과 만날 수 있도록 계획하고 있어요!</p>`,
    programCategory: 'gardening',
    programName: '테라리움수업',
    createdAt: new Date('2024-10-20'),
    authorId: 'admin_default',
    authorName: '관리자'
  },
  {
    id: 'footstep_003',
    title: '과학창의교육에서 만난 작은 발명가들',
    content: `<h2>과학창의교육 및 체험학습 사업 후기</h2>
    
<p>여름방학 동안 3주간 진행된 과학창의교육이 성황리에 마무리되었습니다. 중학생 15명이 참여하여 과학의 원리를 배우고 창의적인 발명품을 만들어보는 시간을 가졌습니다.</p>

<h3>프로그램 구성</h3>
<ul>
  <li><strong>1주차:</strong> 과학 기초 원리 이해 (물리, 화학 기초)</li>
  <li><strong>2주차:</strong> 창의목공으로 간단한 발명품 제작</li>
  <li><strong>3주차:</strong> 팀 프로젝트 및 발표회</li>
</ul>

<h3>놀라운 아이디어들</h3>
<p>아이들의 창의성은 정말 놀라웠습니다. 특히 "자동으로 물을 주는 화분"을 만든 김○○ 학생과 "태양열을 이용한 휴대폰 충전기"를 설계한 이○○ 학생의 아이디어가 인상적이었습니다.</p>

<blockquote>
<p>"과학이 이렇게 재미있는 줄 몰랐어요. 집에 가서도 계속 만들어보고 싶어요!" - 정○○(중1)</p>
</blockquote>

<p>마지막 날 발표회에는 학부모님들도 참석해주셔서 아이들의 성과를 함께 축하해주셨습니다. 내년에는 더 다양한 과학 분야를 다뤄볼 계획입니다.</p>`,
    programCategory: 'science',
    programName: '과학교육',
    createdAt: new Date('2024-09-25'),
    authorId: 'admin_default',
    authorName: '관리자'
  },
  {
    id: 'footstep_004',
    title: '어르신들과 함께한 농촌활성화 프로그램, 세대를 잇는 소중한 시간',
    content: `<h2>농촌활성화 사업 - 세대간 교류 프로그램</h2>
    
<p>지난 2개월간 진행된 농촌활성화 사업이 마무리되었습니다. 지역 어르신 12분과 청년 8명이 함께 참여하여 농촌 지역의 전통을 배우고 현대적 감각으로 재해석해보는 의미있는 시간을 가졌습니다.</p>

<h3>프로그램 주요 활동</h3>
<ul>
  <li><strong>전통 한옥 짓기:</strong> 어르신들의 지도하에 전통 건축 기법 체험</li>
  <li><strong>농촌 원예 치유:</strong> 함께 텃밭을 가꾸며 자연과 소통</li>
  <li><strong>지역 살리기 워크숍:</strong> 농촌 활성화 아이디어 공유</li>
  <li><strong>전통 음식 만들기:</strong> 어르신들의 레시피로 향토 음식 체험</li>
</ul>

<h3>감동적인 순간들</h3>
<p>가장 인상깊었던 순간은 87세 박○○ 할아버지께서 50년 전 집을 지으셨던 방법을 직접 보여주시며 "요즘 젊은이들이 이런 걸 배우려고 하니 고맙고 기특하다"며 눈물을 보이신 모습이었습니다.</p>

<blockquote>
<p>"할아버지께 배운 전통 기법을 현대 건축에도 응용해볼 수 있을 것 같아요. 정말 값진 경험이었습니다." - 김○○(청년참가자)</p>
</blockquote>

<p>이 프로그램을 통해 단순한 기술 전수를 넘어 세대간 지혜와 사랑을 나누는 소중한 시간이 되었습니다. 참가자들 모두 "또 참여하고 싶다"는 의견을 주셔서 내년에도 지속할 예정입니다.</p>`,
    programCategory: 'rural',
    programName: '농촌주민들과 함께하는 세상에서 가장 위대한 한평집짓기',
    createdAt: new Date('2024-08-30'),
    authorId: 'admin_default',
    authorName: '관리자'
  },
  {
    id: 'footstep_005',
    title: '버려진 창고가 아이들의 꿈터로! 공간 재창조 리모델링 완성',
    content: `<h2>공간 재창조 리모델링 사업 - 창고에서 꿈터로</h2>
    
<p>6개월간 진행된 공간 재창조 리모델링 프로젝트가 드디어 완성되었습니다! 오랫동안 방치되어 있던 낡은 창고가 아이들을 위한 멋진 학습공간으로 완전히 변신했습니다.</p>

<h3>리모델링 과정</h3>
<ul>
  <li><strong>1개월차:</strong> 공간 분석 및 설계 - 아이들과 함께 꿈의 공간 설계</li>
  <li><strong>2-3개월차:</strong> 기존 구조물 철거 및 기초 공사</li>
  <li><strong>4-5개월차:</strong> 새로운 구조 설치 및 안전 시설 완비</li>
  <li><strong>6개월차:</strong> 인테리어 및 마무리 - 아이들이 직접 벽화 그리기</li>
</ul>

<h3>참여자들의 변화</h3>
<p>이 프로젝트에 참여한 고등학생 10명과 지역 주민 15분 모두 "버려진 것도 새롭게 태어날 수 있다"는 소중한 경험을 하셨습니다. 특히 처음엔 망치질도 무서워하던 학생들이 마지막엔 전문가 못지않게 작업하는 모습이 인상적이었습니다.</p>

<blockquote>
<p>"처음엔 더러운 창고였는데 우리 손으로 이렇게 예쁜 공간을 만들 수 있다니 정말 신기해요!" - 박○○(고1)</p>
</blockquote>

<h3>새로운 시작</h3>
<p>이제 이 공간은 "꿈터"라는 이름으로 지역 아이들의 방과후 학습공간이자 동네 주민들의 소통 공간으로 활용되고 있습니다. 매일 오후면 아이들의 밝은 웃음소리와 진지한 토론 소리가 들려와 보람을 느낍니다.</p>

<p>다음 프로젝트로는 옆 건물의 지하실을 도서관으로 만드는 계획을 세우고 있습니다. 계속해서 우리 지역을 더 아름답게 만들어나가겠습니다!</p>`,
    programCategory: 'remodeling',
    programName: '공간 재창조 리모델링 사업 (실내,실외)',
    createdAt: new Date('2024-07-10'),
    authorId: 'admin_default',
    authorName: '관리자'
  },
  {
    id: 'footstep_006',
    title: '모형집짓기 체험교육으로 꿈을 키우는 아이들',
    content: `<h2>모형집짓기 체험교육 사업 성과 보고</h2>
    
<p>초등학교 저학년을 위한 모형집짓기 체험교육이 성공적으로 마무리되었습니다. 벽걸이용 모형집부터 두평형 모형집까지, 아이들의 수준에 맞는 다양한 프로그램으로 진행되었습니다.</p>

<h3>수준별 프로그램 운영</h3>
<ul>
  <li><strong>벽걸이용 모형집 (1-2학년):</strong> 2시간 과정, 색칠하기와 조립 중심</li>
  <li><strong>한평형 모형집 (3-4학년):</strong> 3시간 과정, 설계도 그리기부터 완성까지</li>
  <li><strong>두평형 모형집 (5-6학년):</strong> 2-3일 과정, 본격적인 건축 체험</li>
</ul>

<h3>아이들의 창의력 발견</h3>
<p>가장 인상적이었던 것은 아이들의 무한한 상상력이었습니다. 같은 재료로도 각자 다른 스타일의 집을 만들어내는 모습이 정말 놀라웠어요.</p>

<blockquote>
<p>"우리 집보다 더 예쁜 집을 만들었어요! 엄마한테 자랑해야겠어요!" - 김○○(초2)</p>
</blockquote>

<p>앞으로도 아이들의 창의성을 키울 수 있는 다양한 프로그램을 계획하고 있습니다.</p>`,
    programCategory: 'building',
    programName: '한평형 모형집짓기',
    createdAt: new Date('2024-12-01'),
    authorId: 'admin_default',
    authorName: '관리자'
  },
  {
    id: 'footstep_007',
    title: '겨울방학 특별 원예프로그램 - 실내 정원 만들기',
    content: `<h2>겨울방학 특별 원예프로그램 운영 후기</h2>
    
<p>추운 겨울에도 푸른 자연을 만날 수 있는 특별한 프로그램을 운영했습니다. 실내에서 할 수 있는 다양한 원예 활동으로 아이들에게 색다른 경험을 선사했습니다.</p>

<h3>겨울 원예 활동</h3>
<ul>
  <li><strong>미니 온실 만들기:</strong> 페트병을 활용한 간이 온실 제작</li>
  <li><strong>수경 재배:</strong> 물에서 키우는 새싹채소 기르기</li>
  <li><strong>다육식물 키우기:</strong> 관리가 쉬운 다육이로 화분 꾸미기</li>
  <li><strong>겨울 꽃 누르기:</strong> 시든 꽃으로 예술 작품 만들기</li>
</ul>

<p>겨울에도 이렇게 다양한 식물 활동을 할 수 있다는 것에 아이들이 신기해했습니다.</p>

<blockquote>
<p>"집에 가져간 다육이가 벌써 새싹이 났어요! 정말 신기해요!" - 이○○(초3)</p>
</blockquote>

<p>봄이 되면 더 다양한 야외 원예활동으로 만나뵙겠습니다!</p>`,
    programCategory: 'gardening',
    programName: '분경수업',
    createdAt: new Date('2024-12-15'),
    authorId: 'admin_default',
    authorName: '관리자'
  }
]

// 초기 데이터 설정 함수
export const initializeMockData = () => {
  if (typeof window === 'undefined') return

  // 기존 데이터와 새 mock 데이터를 비교하여 업데이트 필요 시 새로고침
  const existingUsers = localStorage.getItem('dream-house-users')
  if (!existingUsers) {
    localStorage.setItem('dream-house-users', JSON.stringify(mockUsers))
  } else {
    // 기존 사용자 데이터에 password 필드가 없으면 새로운 데이터로 교체
    const users = JSON.parse(existingUsers)
    if (users.length > 0 && !users[0].password) {
      localStorage.setItem('dream-house-users', JSON.stringify(mockUsers))
    }
  }

  // 크루 신청 데이터 초기화
  const existingApplications = localStorage.getItem('crew-applications')
  if (!existingApplications) {
    localStorage.setItem('crew-applications', JSON.stringify(mockCrewApplications))
  }

  // 크루 게시글 데이터 초기화
  const existingPosts = localStorage.getItem('crew-posts')
  if (!existingPosts) {
    localStorage.setItem('crew-posts', JSON.stringify(mockCrewPosts))
  }

  // 걸어온 발자취 데이터 초기화
  const existingFootstepPosts = localStorage.getItem('footstep-posts')
  if (!existingFootstepPosts) {
    localStorage.setItem('footstep-posts', JSON.stringify(mockFootstepPosts))
  }
}

// 강제로 데이터를 새로고침하는 함수 (개발용)
export const resetMockData = () => {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('dream-house-users', JSON.stringify(mockUsers))
  localStorage.setItem('crew-applications', JSON.stringify(mockCrewApplications))
  localStorage.setItem('crew-posts', JSON.stringify(mockCrewPosts))
  localStorage.setItem('footstep-posts', JSON.stringify(mockFootstepPosts))
  localStorage.removeItem('dream-house-auth') // 로그아웃
}