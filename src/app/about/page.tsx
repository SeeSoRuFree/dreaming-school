'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Clock, Car, Bus, Train, CheckCircle, Calendar, CheckCircle2, Users, Home, BookOpen, Award, Briefcase, FileText, TrendingUp, Building2, Heart, Rocket } from 'lucide-react'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('about')
  
  const coreValues = [
    { title: '양선', description: '우리는 모든 교육과정, 내부운영과정을 선한 양심으로 운영하겠습니다.' },
    { title: '공정', description: '우리는 참여하고 공정과 과정을 중요시하며 항상 수준의 전문성을 유지하겠습니다.' },
    { title: '전문성', description: '우리는 지속적인 역량을 통해 높은 수준의 전문성을 유지하겠습니다.' },
    { title: '혁신', description: '우리는 지속적인 혁신을 통해 교육적인 교육서비스품을 제공하겠습니다.' },
    { title: '상생', description: '우리는 함께하는 구성원 모두가 다 같이 잘 살 수 있는 영어가정을 만들겠습니다.' }
  ]

  const departments = [
    {
      name: '강의계발팀',
      items: [
        '교과 업계 이론강의와 개발',
        '인성강의와 개발',
        '새로운 체험학습 발견 개발',
        '학생들의 학습 분석 제공'
      ]
    },
    {
      name: '체험운영팀',
      items: [
        '체험학습 구성 설계',
        '안전한 체험학습 밝아 수립',
        '학생급 지개/장비 제공',
        '체험학습 형사, 준공식 설계'
      ]
    }
  ]


  const members = [
    {
      name: '구관원',
      role: '경상대학원 석사<br/>KAI 교육개발 10년<br/>집쟁기강사 5년<br/>교육서시 2년 밝견<br/>사회공헌 5년 경력'
    },
    {
      name: '구자경',
      role: '경북대 검졸과 학사<br/>청소년학원 석사<br/>캠프/설계업무<br/>전산분야 운 업무/업무<br/>건축회사 2년 경력'
    },
    {
      name: '김영철',
      role: '건축강사 2년 이상<br/>기계/기구수리 5년<br/>기업경영 10년 경력<br/>제품구현 업무<br/>프리모델 개발경력'
    },
    {
      name: '박학주',
      role: '품질관리업무 25년<br/>태기업 정보처리<br/>건축강사 2년 이상<br/>제품구현 업무<br/>음악교육 경력 10년'
    },
    {
      name: '송정숙',
      role: '경상대학원 석사<br/>청련원에 10년 경력<br/>청소년검사 자격<br/>논타나무협층조합<br/>공예교육 10년 경력'
    },
    {
      name: '조미애',
      role: '고등학교교사 10년<br/>청소년상담 25년<br/>교육 커리큘럼 개발<br/>교육 마케팅 업무<br/>상담사 자격수'
    },
    {
      name: '이진무',
      role: '경상대학원 석사<br/>사회단체 10년 경력<br/>체육커리큘럼/행정문<br/>전축강사 3년 이상<br/>해설학원 상담 역임'
    }
  ]

  // 연혁 데이터
  const historyData = [
    {
      year: "2025",
      title: "공익법인 등록 및 사업 확대",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-purple-600 to-pink-600",
      highlights: [
        "공익법인 등록 (5월)",
        "아산나눔재단 성장트랙사업 선정 (6월)"
      ],
      programs: [
        "함안군 3개면 작은집짓기 목공수업 (5월)",
        "북면초등학교 전학년 원예힐링프로그램 (6월)",
        "합천 청덕면 주민역량강화 두평집짓기 프로그램 (7월)"
      ]
    },
    {
      year: "2024",
      title: "창업지원 및 수상 성과",
      icon: <Award className="w-6 h-6" />,
      color: "from-amber-500 to-orange-600",
      highlights: [
        "창업중심대학 초기창업지원사업 선정 (경상대 창업지원단) (4월~12월)",
        "초록우산/다음세대재단 비영리 인큐베이팅사업 참여 (6월~12월)",
        "로컬미래 경남도민 아이디어톤경진대회 최우수상 (6월 21일)",
        "협동조합의날 우수협동조합상 (사회적경제진흥원) (7월)"
      ],
      programs: [
        "도산초 세상에서가장위대한 두평집짓기 수업 (6월)",
        "황금수레아동센터 한평 집짓기 프로그램 (8월)",
        "학교밖 청소년지원 간디중학교 한평집짓기 (10월)",
        "곤양초 전학년 자연친화목공수업 (11월)"
      ]
    },
    {
      year: "2023",
      title: "사무실 입주 및 프로그램 확대",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-emerald-600 to-teal-600",
      highlights: [
        "소셜캠퍼스온 진주사무실 입주 (2월 13일)",
        "행복한 공예프로그램 선정 (2월)",
        "오마이컴퍼니 펀딩 100% 달성 - 내손으로 내집짓기 Half skeleton 체험 (2월)"
      ],
      programs: [
        "너와마켓 프리마켓 참여, 이성자갤러리, 갤러리아백화점 원예프로그램 (4월)",
        "산청교육청 진로체험교사 테라리엄 수업 (40명) (6월)",
        "서울 세브란스병원 간호사 힐링원예프로그램 (60명) (7월)",
        "적중지역아동센터 한평집짓기 수업 (8월 30일)",
        "지수초등학교 한평집짓기 (11월)",
        "광양 주민역량강화 2평집 2채 짓기 프로그램 (12월 14일)"
      ]
    },
    {
      year: "2022",
      title: "사회적협동조합 창립과 인가",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-blue-600 to-indigo-600",
      highlights: [
        "창립총회 (5월 6일)",
        "교육부 인가 (8월)",
        "사업자 등록 (9월)",
        "2022 사회적경제기업 임팩트IR 최우수상 (11월)",
        "예비사회적기업 인가 (12월)"
      ],
      programs: [
        "민들레 한평집짓기 (5월)",
        "신등고 두평집짓기 (11월)"
      ]
    }
  ]

  // 오시는 길 데이터
  const contactInfo = {
    address: '경남 산청군 신안면 하정리 928-1',
    phones: ['010-2672-1109', '010-2863-2731'],
    hours: '평일 09:00 - 18:00'
  }

  const transportInfo = [
    {
      type: '자가용',
      icon: <Car className="w-5 h-5" />,
      description: '산청군청에서 신안면 방향으로 약 15분',
      details: [
        '경상남도 산청군 신안면 하정리 928-1',
        '네비게이션: "꿈을짓는학교" 또는 주소 검색'
      ]
    },
    {
      type: '대중교통',
      icon: <Bus className="w-5 h-5" />,
      description: '원지버스터미널 하차',
      details: [
        '원지버스터미널 하차',
        '도보 5분 이내 거리'
      ]
    }
  ]

  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  // 네비게이션 섹션
  const navSections = [
    { id: 'about', label: '꿈을 짓는 학교는?' },
    { id: 'mission', label: '미션과 비전' },
    { id: 'organization', label: '조직구성' },
    { id: 'location', label: '오시는 길' }
  ]

  // 스크롤 이벤트 처리
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // 네비게이션 바 높이 고려
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  // Intersection Observer로 현재 섹션 감지
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // 각 섹션 관찰 시작
    navSections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24">
        <div className="container-main py-16">
          <h1 className="heading-1 text-center">꿈을짓는 학교는?</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            배움의 행복을 전하고 삶의 가치를 나누는 사회적협동조합
          </p>
        </div>
      </section>

      {/* Section Navigation */}
      <nav className="sticky top-16 z-40 bg-white">
        <div className="container-main">
          <div className="flex justify-center gap-2 md:gap-4 py-4">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`relative px-4 md:px-6 py-2 text-sm md:text-base font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Introduction Section */}
      <section id="about" className="bg-white">
        <div className="container-main section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">조직 소개</h2>
            <p className="text-xl text-gray-600">꿈을짓는학교 사회적협동조합을 소개합니다</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 mb-12 shadow-lg">
              <p className="body-text leading-relaxed">
                꿈을짓는학교는 교육서비스 제공을 주업으로 성적중심 교육환경 속에서 OECD 국가 청소년 행복지수가 최하위인 청소년들에게 집단성취감을 통한 바른 품성과 자긍심 회복, 그리고 로컬리티 활성화를 목적으로 설립된 사회적협동조합입니다.
              </p>
              <p className="body-text leading-relaxed mt-4">
                특히 도서 지역 청소년들의 열악한 교육환경 개선 및 교육기회 불평등을 해소하고, 인구소멸 위기지수가 높은 지역을 중심으로 주거역량강화 사업을 통해 활동화하는데 집중하고 있습니다.
              </p>
              <p className="body-text leading-relaxed mt-4">
                꿈을 짓는학교의 모든 교육은 품성교육+이론+실기가 복합된 키자니아식 방식으로 자라나는 세대들의 전인적인 성장을 목표로 모든 교육 프로그램을 제공합니다. 이를 위해 다수의 전문조합원과 교육봉사크루 운영, 지역업체의 CSR활동 연계 등 폐교위기의 작은학교 살리기 운동을 적극적으로 추진하고 있습니다.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-8 px-8 rounded-2xl shadow-xl mb-12">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">교육 철학</h3>
                <p className="text-xl font-medium leading-relaxed">
                  &ldquo;모든 체험학습의 주인공은 가르치는 사람이 아니라<br/>
                  언제나 배우려는 아이들이어야 한다는 것이 저희의 신념입니다.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="bg-gray-50">
        <div className="container-main section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">미션 & 비전</h2>
            <p className="text-xl text-gray-600">우리가 지향하는 가치와 목표</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                <div className="card bg-blue-50 border-blue-200">
                  <div className="bg-blue-700 text-white px-4 py-2 rounded-t-lg text-center font-semibold">
                    소셜 미션
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-lg font-medium text-gray-800">배움의 행복을 전하고 삶의 가치를 나눈다</p>
                  </div>
                </div>
                
                <div className="card bg-blue-50 border-blue-200">
                  <div className="bg-blue-700 text-white px-4 py-2 rounded-t-lg text-center font-semibold">
                    비전
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-lg font-medium text-gray-800">배움이 행복한 교육을 전하는 행복한 사회교육 전문협체</p>
                  </div>
                </div>
              </div>

          {/* Core Values */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">핵심가치</h3>
            <p className="text-gray-600">꿈을짓는학교가 추구하는 5가지 가치</p>
          </div>
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{value.title}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section id="organization" className="bg-white">
        <div className="container-main section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">조직 구성</h2>
            <p className="text-xl text-gray-600">전문 조합원과 운영 체계</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {departments.map((dept, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">{dept.name}</h3>
                  <ul className="space-y-3">
                    {dept.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Professional Members */}
      <section className="bg-gray-50">
        <div className="container-main section-padding">
          {/* Members */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">전문 조합원 소개</h3>
            <p className="text-xl text-gray-600">다양한 분야의 전문가들이 함께하는 교육 공동체</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-2xl">
                      {member.name.substring(0, 1)}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1 text-center leading-relaxed" dangerouslySetInnerHTML={{ __html: member.role }} />
              </div>
            ))}
              </div>
            </div>
          </section>

      {/* History Section */}
      <section className="bg-white">
        <div className="container-main section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">꿈을짓는학교의 연혁</h2>
            <p className="text-xl text-gray-600">2020년부터 현재까지 함께해온 여정</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {historyData.map((yearData, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
                <div className={`h-2 bg-gradient-to-r ${yearData.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{yearData.year}</h3>
                      <p className="text-sm text-gray-600 mt-1">{yearData.title}</p>
                    </div>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${yearData.color} text-white`}>
                      {yearData.icon}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">주요 성과</h4>
                      <ul className="space-y-1">
                        {yearData.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">주요 프로그램</h4>
                      <ul className="space-y-1">
                        {yearData.programs.slice(0, 3).map((program, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <Heart className="w-3 h-3 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{program}</span>
                          </li>
                        ))}
                        {yearData.programs.length > 3 && (
                          <li className="text-xs text-gray-500 ml-5">
                            외 {yearData.programs.length - 3}개 프로그램
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="bg-gray-50">
        <div className="container-main section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">오시는 길</h2>
            <p className="text-xl text-gray-600">꿈을짓는학교 사회적협동조합을 찾아오세요</p>
          </div>
          <div className="max-w-6xl mx-auto">
            
            {/* 기본 정보 카드 */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="group relative p-8 text-center hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/20 rounded-bl-full"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">주소</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">{contactInfo.address}</p>
                  <p className="text-sm text-gray-500 mt-2">꿈을짓는학교 사회적협동조합</p>
                </div>
              </Card>

              <Card className="group relative p-8 text-center hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/20 rounded-bl-full"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">연락처</h3>
                  <div className="space-y-2">
                    {contactInfo.phones.map((phone, index) => (
                      <button
                        key={index}
                        onClick={() => handleCallClick(phone)}
                        className="block text-gray-700 hover:text-blue-700 font-medium transition-colors mx-auto hover:scale-105 transform"
                      >
                        {phone}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="group relative p-8 text-center hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/20 rounded-bl-full"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">운영시간</h3>
                  <p className="text-gray-700 font-medium">{contactInfo.hours}</p>
                  <p className="text-sm text-gray-500 mt-2">주말 및 공휴일 휴무</p>
                </div>
              </Card>
            </div>

            {/* 교통편 안내 */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">교통편 안내</h2>
                <p className="text-lg text-gray-600">자가용 또는 대중교통을 이용하여 방문하실 수 있습니다</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {transportInfo.map((transport, index) => (
                  <Card key={index} className="group p-8 hover:shadow-xl transition-all duration-300 border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                        {transport.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{transport.type}</h3>
                        <p className="text-gray-700 font-medium">{transport.description}</p>
                      </div>
                    </div>
                    
                    <div className="ml-16">
                      <ul className="space-y-3">
                        {transport.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>
              
              {/* 추가 교통 정보 */}
              <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-start gap-3">
                  <Train className="w-6 h-6 text-amber-700 mt-1 flex-shrink-0" />
                  <div className="text-amber-800">
                    <p className="font-semibold mb-1">추가 교통 정보</p>
                    <p className="text-sm leading-relaxed">
                      서울에서 출발 시 약 3시간 30분, 부산에서 출발 시 약 1시간 30분이 소요됩니다.
                      대중교통 이용 시 산청터미널까지 시외버스를 이용하신 후 마을버스로 환승하시면 됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container-main py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">함께 만들어가는 교육의 미래</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            꿈을 짓는 학교와 함께 더 나은 교육 환경을 만들어가는<br />
            파트너십과 협력 방안에 대해 문의해주세요.
          </p>
          <div className="flex justify-center">
            <a href="/contact" className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg inline-block">
              문의하기
            </a>
          </div>
        </div>
      </section>
    </>
  )
}