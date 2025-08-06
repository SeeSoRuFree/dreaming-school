"use client"

import { Card } from "@/components/ui/card"
import { Calendar, CheckCircle2, Users, Home, BookOpen, Award, Briefcase, FileText, TrendingUp, Building2, Heart, Rocket } from "lucide-react"

export default function HistoryPage() {
  const additionalHistory = [
    {
      year: "2025",
      title: "지역 확대와 새로운 도약",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-purple-600 to-pink-600",
      highlights: [
        "공익법인 등록",
        "아산나눔재단 성장트랙사업 선정",
        "산청군 신안면 이주 개소"
      ],
      programs: [
        "북면초등학교 전학년 원예힐링프로그램",
        "후니학교 집짓기 프로그램",
        "함안군 3개면 작은집짓기 목공수업",
        "함전 정던면 주민역량강화 두 평 집짓기 프로그램"
      ]
    },
    {
      year: "2024",
      title: "교육 혁신과 연속 수상",
      icon: <Award className="w-6 h-6" />,
      color: "from-amber-500 to-orange-600",
      highlights: [
        "경남을 살리는 아이디어경진대회 최우수상",
        "활동조합이달 우수활동조합상",
        "조기창업지원사업 선정"
      ],
      programs: [
        "곤양초 전학년 자연친화특공수업",
        "도산초 세상에서가장위대한 두별집짓기 수업",
        "한국수매아트센터 한별 집짓기 프로그램",
        "학교밖 청소년지원 간디중학교 원예집짓기"
      ]
    },
    {
      year: "2023",
      title: "프로그램 확대와 첫 수상",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-emerald-600 to-teal-600",
      highlights: [
        "소셜캠퍼스온 진주사무실 입주",
        "경남 IK경진대회 최우수상 수상",
        "원예프로그램 본격 시작"
      ],
      programs: [
        "적극지역아동센터 집짓기 수업",
        "광양 주민역량강화 프로그램",
        "서울 세브란스 병원간호사 힐링 원예프로그램",
        "진주교육청 주관 위기가정 원예힐링 프로그램"
      ]
    },
    {
      year: "2022",
      title: "사회적협동조합 창립",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-blue-600 to-indigo-600",
      highlights: [
        "꿈을짓는학교사회적협동조합 창립 (5월)",
        "사회적기업 설립인가 취득 (8월)",
        "사업자 등록 완료 (9월)"
      ],
      programs: [
        "신동고 한별 집짓기 시작",
        "민들레학교 한별 집짓기",
        "산청초조(간디학교) 한별 집짓기",
        "신전초 한별 집짓기"
      ],
      details: [
        "사회적기업가 최종 선정 (2월)",
        "중간평가 최우수 선정 (7월)"
      ]
    },
    {
      year: "2021",
      title: "교육 사업 본격화",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-600 to-emerald-600",
      highlights: [
        "제1차 건축강사 양성과정 수료 (15명)",
        "제2차 건축강사 양성과정 수료 (12명)",
        "사회적기업 예비창업 교육 수료"
      ],
      programs: [
        "진주초, 평거초, 명석초, 금곡초 집짓기",
        "사천초, 곤선초, 동평초 집짓기",
        "흥양초, 곤명초 집짓기"
      ],
      details: [
        "사회적기업창업 멘토링 진행 (9월~12월)"
      ]
    },
    {
      year: "2020",
      title: "한별 집짓기 프로그램 시작",
      icon: <Home className="w-6 h-6" />,
      color: "from-rose-600 to-pink-600",
      highlights: [
        "한별 집짓기 프로그램 개발 완료 (6월)",
        "최초의 한별 집짓기 학교수업 시작",
        "3개 학교에서 프로그램 운영"
      ],
      programs: [
        "고성 봉천초등학교 (첫 번째 학교수업)",
        "진주 진전초등학교",
        "고성 동해초등학교"
      ],
      details: [
        "특별학급 훌륭한조에 프로그램 홍보 (8월)"
      ]
    }
  ]

  const historyByYear = {
    "2022": [
      {
        month: "9월 30일",
        event: "신동고한별집짓기시작",
        type: "education"
      },
      {
        month: "9월 26일",
        event: "사업자등록증을 교부받다(등록번호: 699-82-00446)",
        type: "certification"
      },
      {
        month: "8월 19일",
        event: "사회적기업 설립인가증을 교부받다(등록번: 2022-1345-50-0455)",
        type: "certification"
      },
      {
        month: "7월 7일",
        event: "중간평가결과 최우수 선정, 2차 사업비를 교부받다",
        type: "achievement"
      },
      {
        month: "5월 6일",
        event: "꿈을짓는학교사회적협동조합 창립총회를 개최하다",
        type: "milestone"
      },
      {
        month: "5월 3일",
        event: "신전초 한별 집짓기를 시작하다",
        type: "education"
      },
      {
        month: "4월 13일",
        event: "산청초조(간디학교) 한별 집짓기를 시작하다",
        type: "education"
      },
      {
        month: "4월 1일",
        event: "최초 사업비를 교부받다",
        type: "funding"
      },
      {
        month: "3월 31일",
        event: "전조 대코학업술 시작으로 한별 집짓기를 시작하다",
        type: "education"
      },
      {
        month: "3월 25일",
        event: "민들레학교 한별 집짓기를 시작하다",
        type: "education"
      },
      {
        month: "2월 28일",
        event: "사회적기업가로 최종 선정되다",
        type: "achievement"
      },
      {
        month: "2월 16일",
        event: "사회적기업가 대면심사를 받다",
        type: "evaluation"
      },
      {
        month: "1월 20일",
        event: "사회적기업 사업계획서 제출하다",
        type: "document"
      },
      {
        month: "1월 12일",
        event: "사회적기업가 창업신청서 제출하다",
        type: "milestone"
      }
    ],
    "2021": [
      {
        month: "9월~12월",
        event: "사회적기업창업 멘토링을 받다",
        type: "mentoring"
      },
      {
        month: "7월 26일~12월 6일",
        event: "9명의 집짓기신주: 진주초, 평거초, 명석초, 금곡초 (사천초, 곤선초, 동평초, 흥양초, 곤명초)",
        type: "education"
      },
      {
        month: "7월 22일~8월 12일",
        event: "사회적기업 예비창업 교육을 수료하다",
        type: "education"
      },
      {
        month: "6월 12일~7월 17일",
        event: "제2차 건축강사 양성과정을 갖다 (12명 수료)",
        type: "training"
      },
      {
        month: "4월 17일~5월 8일",
        event: "제1차 건축강사 양성과정을 갖다 (15명 수료)",
        type: "training"
      }
    ],
    "2020": [
      {
        month: "11월 19일",
        event: "고성 동해초등학교에서 두 번째 한별 집짓기 학교수업을 하다",
        type: "education"
      },
      {
        month: "9월~11월",
        event: "진주 진전초등학교에서 두 번째 한별 집짓기 학교수업을 하다",
        type: "education"
      },
      {
        month: "9월~10월",
        event: "고성 봉천초등학교에서 최초의 한별 집짓기 학교수업을 하다",
        type: "milestone"
      },
      {
        month: "8월",
        event: "한별 집짓기 프로그램 특별학급 훌륭한조에 프로그램 홍보",
        type: "promotion"
      },
      {
        month: "6월",
        event: "한별 집짓기 프로그램(건설기능인) 개발완료",
        type: "program"
      }
    ]
  }

  const getIconByType = (type: string) => {
    switch(type) {
      case "program": return <BookOpen className="w-5 h-5" />
      case "milestone": return <Award className="w-5 h-5" />
      case "education": return <Home className="w-5 h-5" />
      case "training": return <Users className="w-5 h-5" />
      case "achievement": return <CheckCircle2 className="w-5 h-5" />
      case "certification": return <FileText className="w-5 h-5" />
      case "funding": return <Briefcase className="w-5 h-5" />
      default: return <Calendar className="w-5 h-5" />
    }
  }

  const getColorByType = (type: string) => {
    switch(type) {
      case "milestone": return "text-amber-600 bg-amber-50"
      case "achievement": return "text-emerald-600 bg-emerald-50"
      case "certification": return "text-blue-600 bg-blue-50"
      case "funding": return "text-rose-600 bg-rose-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container-main py-16">
        <h1 className="heading-1 text-center">꿈을짓는학교 연혁</h1>
        <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
          2020년부터 현재까지, 꿈을짓는학교 사회적협동조합의 성장 여정을 소개합니다
        </p>
      </div>
    </section>

    <div className="container-main section-padding">

      {/* 연도별 주요 성과 섹션 - 상단 배치 */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {additionalHistory.map((yearData, index) => (
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
                  
                  {yearData.details && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">추가 정보</h4>
                      <ul className="space-y-1">
                        {yearData.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}