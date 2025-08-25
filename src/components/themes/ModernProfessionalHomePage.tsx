'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Building2, Users, BookOpen, Award, Target, TrendingUp,
  CheckCircle, ArrowRight, Star, Calendar, Clock, MapPin
} from 'lucide-react'

const ModernProfessionalHomePage = () => {
  const programs = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: '소형 집짓기 체험교육',
      description: '직접 짓는 세상에서 가장 위대한 한 평 집짓기',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: '과학창의교육',
      description: 'STEAM 기반 융합형 창의 인재 양성',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '공간 재창조',
      description: '우리가 만드는 특별한 공간 디자인',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: '원예 프로그램',
      description: '자연과 함께하는 힐링 교육',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: '농촌활성화',
      description: '지역사회와 함께하는 주거역량강화',
      color: 'from-amber-500 to-amber-600'
    }
  ]

  const stats = [
    { number: '2,840+', label: '누적 교육생', icon: <Users className="w-6 h-6" /> },
    { number: '127', label: '진행 프로젝트', icon: <Target className="w-6 h-6" /> },
    { number: '98%', label: '만족도', icon: <Star className="w-6 h-6" /> },
    { number: '23', label: '협력 기관', icon: <Building2 className="w-6 h-6" /> }
  ]

  const testimonials = [
    {
      content: "체계적인 교육 시스템과 전문 강사진의 열정적인 지도 덕분에 아이들이 큰 성장을 이뤘습니다.",
      author: "김○○ 선생님",
      role: "○○초등학교"
    },
    {
      content: "단순한 체험이 아닌 진정한 배움의 기회였습니다. 학생들의 창의력과 협동심이 눈에 띄게 향상되었습니다.",
      author: "박○○ 교장",
      role: "○○중학교"
    },
    {
      content: "꿈을 짓는 학교의 프로그램은 우리 지역 교육의 새로운 패러다임을 제시했습니다.",
      author: "이○○ 장학사",
      role: "○○교육청"
    }
  ]

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* 프로그램 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              우리의 <span className="text-blue-600">교육 프로그램</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              체계적이고 전문적인 교육 프로그램으로 미래 인재를 양성합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${program.color} flex items-center justify-center text-white mb-4`}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link href="/programs" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  자세히 보기 <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 후기 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              교육 현장의 <span className="text-blue-600">목소리</span>
            </h2>
            <p className="text-gray-600 text-lg">
              꿈을 짓는 학교와 함께한 선생님들의 이야기
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              함께 만들어가는 교육의 미래
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              꿈을 짓는 학교의 다양한 프로그램에 참여하고
              아이들의 성장을 함께 지켜보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/programs" 
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                프로그램 둘러보기 <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg inline-block"
              >
                문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ModernProfessionalHomePage