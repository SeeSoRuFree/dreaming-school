'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { 
  Leaf, Trees, Flower2, Sun, Cloud, Droplets,
  Recycle, Globe, Sprout, Wind, ArrowRight, Heart
} from 'lucide-react'

const EcoEducationHomePage = () => {
  const [season, setSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring')
  const { scrollY } = useScroll()
  
  // Parallax 효과
  const leafY = useTransform(scrollY, [0, 300], [0, -50])
  const cloudX = useTransform(scrollY, [0, 300], [0, 30])

  const programs = [
    {
      icon: <Trees className="w-8 h-8" />,
      title: '소형 집짓기 체험교육',
      description: '친환경 자재로 만드는 지속가능한 공간',
      eco: '탄소 절감 90%',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: '과학창의교육',
      description: '자연에서 배우는 과학의 원리',
      eco: '재활용 재료 100%',
      gradient: 'from-lime-400 to-green-500'
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: '공간 재창조',
      description: '버려진 공간을 새롭게 살리는 프로젝트',
      eco: '자원 재활용 85%',
      gradient: 'from-teal-400 to-cyan-500'
    },
    {
      icon: <Flower2 className="w-8 h-8" />,
      title: '원예 프로그램',
      description: '도시 속 작은 정원 가꾸기',
      eco: '생물다양성 증진',
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: '농촌활성화',
      description: '자연과 공존하는 마을 만들기',
      eco: '지속가능 농업',
      gradient: 'from-blue-400 to-indigo-500'
    }
  ]

  const ecoValues = [
    { icon: <Leaf />, title: '친환경 교육', value: '모든 교육 과정에 환경 보호 실천' },
    { icon: <Recycle />, title: '자원 순환', value: '재활용과 업사이클링 적극 활용' },
    { icon: <Sun />, title: '에너지 절약', value: '신재생 에너지 활용 교육' },
    { icon: <Droplets />, title: '물 절약', value: '빗물 재활용 시스템 교육' }
  ]

  const seasons = {
    spring: { bg: 'from-green-100 to-emerald-100', accent: 'text-green-600', emoji: '🌸' },
    summer: { bg: 'from-blue-100 to-cyan-100', accent: 'text-blue-600', emoji: '🌻' },
    autumn: { bg: 'from-orange-100 to-amber-100', accent: 'text-orange-600', emoji: '🍂' },
    winter: { bg: 'from-slate-100 to-gray-100', accent: 'text-slate-600', emoji: '❄️' }
  }

  // 계절 자동 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setSeason(prev => {
        const seasonOrder: ('spring' | 'summer' | 'autumn' | 'winter')[] = ['spring', 'summer', 'autumn', 'winter']
        const currentIndex = seasonOrder.indexOf(prev)
        return seasonOrder[(currentIndex + 1) % 4]
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-br ${seasons[season].bg} transition-all duration-1000`}>
      {/* 자연 요소 애니메이션 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: leafY }}
          className="absolute top-20 left-10"
        >
          <Leaf className="w-12 h-12 text-green-400/30" />
        </motion.div>
        <motion.div 
          style={{ x: cloudX }}
          className="absolute top-10 right-20"
        >
          <Cloud className="w-16 h-16 text-blue-300/30" />
        </motion.div>
        {/* 떨어지는 나뭇잎 애니메이션 */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: -50 
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
              x: Math.random() * 200 - 100,
              rotate: 360
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            🍃
          </motion.div>
        ))}
      </div>

      {/* 헤더 섹션 */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-green-200/50 rounded-full px-4 py-2 mb-6">
              <Leaf className="w-5 h-5 text-green-700 mr-2" />
              <span className="text-green-800 font-medium">지속가능한 미래를 위한 교육</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              자연과 <span className={seasons[season].accent}>함께 성장</span>하는
              <br />
              <span className="text-green-600">친환경 교육</span>
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto">
              지구를 생각하고 환경을 보호하며, 지속가능한 미래를 만들어가는 교육
            </p>
            
            {/* 계절 인디케이터 */}
            <div className="flex justify-center mt-8 space-x-4">
              {Object.entries(seasons).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSeason(key as 'spring' | 'summer' | 'autumn' | 'winter')}
                  className={`text-3xl transition-transform ${
                    season === key ? 'scale-125' : 'scale-100 opacity-50'
                  }`}
                >
                  {value.emoji}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 에코 가치 섹션 */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 text-center border border-green-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 섹션 - 유기적 레이아웃 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900"
          >
            <Sprout className="inline-block w-10 h-10 text-green-500 mr-2" />
            친환경 교육 프로그램
          </motion.h2>

          <div className="space-y-6">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/90 backdrop-blur rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className={`w-full md:w-1/3 h-32 bg-gradient-to-br ${program.gradient} flex items-center justify-center text-white`}>
                    {program.icon}
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                    <p className="text-gray-600 mb-3">{program.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        <Leaf className="w-4 h-4 mr-1" />
                        {program.eco}
                      </span>
                      <Link 
                        href="/programs" 
                        className="text-green-600 hover:text-green-700 font-medium flex items-center"
                      >
                        자세히 보기 <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 환경 영향 섹션 */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              우리가 만드는 <span className="text-green-600">초록빛 변화</span>
            </h2>
            <p className="text-gray-700 text-lg">교육을 통해 실천하는 환경 보호</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10b981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={352}
                    initial={{ strokeDashoffset: 352 }}
                    animate={{ strokeDashoffset: 70 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">80%</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-800">탄소 발자국 감소</h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={352}
                    initial={{ strokeDashoffset: 352 }}
                    animate={{ strokeDashoffset: 35 }}
                    transition={{ duration: 2, delay: 0.7 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">90%</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-800">재활용률 향상</h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={352}
                    initial={{ strokeDashoffset: 352 }}
                    animate={{ strokeDashoffset: 25 }}
                    transition={{ duration: 2, delay: 0.9 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">95%</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-800">생태 인식 개선</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
            </div>
            
            <div className="relative z-10">
              <Globe className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                지구를 위한 작은 실천, 큰 변화
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                자연과 함께하는 교육으로 지속가능한 미래를 만들어갑니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/programs" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  <Leaf className="mr-2 w-5 h-5" /> 에코 프로그램 참여
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg inline-flex items-center"
                >
                  문의하기 <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default EcoEducationHomePage