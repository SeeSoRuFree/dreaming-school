'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const DynamicHomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [stats, setStats] = useState({
    projects: 0,
    students: 0,
    satisfaction: 0,
    schools: 0
  })

  // 카운터 애니메이션
  useEffect(() => {
    const targets = { projects: 127, students: 2840, satisfaction: 98, schools: 23 }
    const duration = 2000
    const steps = 60
    const increment = {
      projects: targets.projects / steps,
      students: targets.students / steps,
      satisfaction: targets.satisfaction / steps,
      schools: targets.schools / steps
    }

    let currentStep = 0
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setStats({
          projects: Math.floor(increment.projects * currentStep),
          students: Math.floor(increment.students * currentStep),
          satisfaction: Math.floor(increment.satisfaction * currentStep),
          schools: Math.floor(increment.schools * currentStep)
        })
        currentStep++
      } else {
        setStats(targets)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    {
      quote: "함께 도전하고 성취하는 과정에서 진정한 성장을 경험했습니다.",
      author: "김민준",
      role: "프로그램 참가자",
      image: "/images/home/KakaoTalk_20240528_130049921_22.jpg"
    },
    {
      quote: "팀워크의 힘을 통해 불가능해 보였던 목표를 달성할 수 있었습니다.",
      author: "이서연",
      role: "학생 리더",
      image: "/images/home/KakaoTalk_20240528_130049921_23.jpg"
    },
    {
      quote: "리더십과 책임감을 배우며 자신감을 얻게 되었습니다.",
      author: "박준호",
      role: "팀 캡틴",
      image: "/images/home/KakaoTalk_20240528_130049921_27.jpg"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 min-h-screen text-white">
      {/* 깔끔한 배경 그리드 */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,158,11,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,158,11,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* About 섹션 - 타임라인 형식 */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 왼쪽 - 메인 콘텐츠 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-12 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mr-4" />
                  <span className="bg-slate-800/80 backdrop-blur border border-yellow-500/30 text-yellow-400 px-6 py-3 rounded-lg text-sm font-bold tracking-wide">
                    LEADERSHIP • TEAMWORK • ACHIEVEMENT
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  함께 이루는
                  <br />
                  <span className="text-yellow-400 font-black">위대한 성취</span>
                </h2>
                
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  꿈을짓는학교는 집단 성취를 통한 자긍심 회복과 올바른 품성 교육을 목표로 합니다. 
                  팀워크와 리더십을 바탕으로 청소년들이 함께 성장하는 교육 환경을 만들어갑니다.
                </p>

                {/* 깔끔한 성취 지표 */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-800/30 backdrop-blur border border-slate-700/50 p-6 rounded-xl"
                  >
                    <div className="text-3xl font-black text-yellow-400 mb-2">
                      {stats.projects}+
                    </div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">완료 프로젝트</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-800/30 backdrop-blur border border-slate-700/50 p-6 rounded-xl"
                  >
                    <div className="text-3xl font-black text-yellow-400 mb-2">
                      {stats.satisfaction}%
                    </div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">만족도</div>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 text-slate-900 font-black px-10 py-4 rounded-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 text-lg"
                >
                  도전하기 🏆
                </motion.button>
              </div>
            </motion.div>

            {/* 오른쪽 - 성취 타임라인 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="space-y-8">
                {[
                  { phase: "팀 구성", desc: "다양한 재능을 가진 팀원들과 만나기", icon: "🤝" },
                  { phase: "목표 설정", desc: "함께 달성할 도전적인 목표 세우기", icon: "🎯" },
                  { phase: "협력 과정", desc: "서로를 믿고 지원하며 함께 성장하기", icon: "⚡" },
                  { phase: "성취 완성", desc: "목표 달성과 성취감을 통한 자신감 향상", icon: "🏆" }
                ].map((item, index) => (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-slate-900"
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    <div className="bg-slate-800/30 backdrop-blur border border-slate-700 p-4 rounded-lg flex-1">
                      <h3 className="font-bold text-lg text-yellow-400 mb-2">
                        {item.phase}
                      </h3>
                      <p className="text-slate-300">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 프로그램 섹션 - 수직 아코디언 */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              팀워크로 완성하는 <span className="text-yellow-400">프로그램</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              개인의 성장을 넘어 집단의 성취를 통해 진정한 리더십과 협력을 배웁니다
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                title: "팀 집짓기 프로젝트",
                subtitle: "협력과 소통으로 완성하는 공동 목표",
                description: "10-12명이 한 팀이 되어 실제 건물을 설계하고 건설하는 과정에서 리더십과 팀워크를 배웁니다. 각자의 역할을 맡아 책임감을 기르고, 함께 문제를 해결하는 경험을 통해 집단 성취감을 느낍니다.",
                stats: ["팀원 10-12명", "프로젝트 기간 3개월", "완성률 95%"],
                color: "from-blue-500 to-blue-700"
              },
              {
                title: "리더십 챌린지",
                subtitle: "책임감과 결정력을 기르는 리더 양성 과정",
                description: "다양한 상황에서 팀을 이끌어가는 리더십 능력을 개발합니다. 의사결정, 갈등 해결, 동기부여 등 실제 리더가 갖춰야 할 역량을 체험적으로 학습하며 자신감을 키웁니다.",
                stats: ["리더 역할 경험", "갈등 해결 훈련", "의사결정 스킬"],
                color: "from-yellow-500 to-orange-600"
              },
              {
                title: "집단 성취 프로젝트",
                subtitle: "함께 만들어가는 지역사회 기여 활동",
                description: "지역사회의 실제 문제를 팀이 함께 해결하는 프로젝트입니다. 기획부터 실행까지 전 과정을 협력으로 진행하며, 사회에 기여하는 성취감과 함께 팀의 결속력을 강화합니다.",
                stats: ["지역 문제 해결", "사회 기여도 100%", "팀 결속력 강화"],
                color: "from-green-500 to-emerald-600"
              }
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-slate-800/40 backdrop-blur border border-slate-700 rounded-xl overflow-hidden shadow-2xl"
              >
                <div className={`bg-gradient-to-r ${program.color} p-6`}>
                  <h3 className="text-2xl font-black text-white mb-2">
                    {program.title}
                  </h3>
                  <p className="text-lg text-white/80 font-medium">
                    {program.subtitle}
                  </p>
                </div>
                
                <div className="p-8">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    {program.description}
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {program.stats.map((stat, statIndex) => (
                      <div
                        key={statIndex}
                        className="bg-slate-700/50 rounded-lg p-3 text-center"
                      >
                        <div className="text-yellow-400 font-bold text-sm">
                          {stat}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 성공 사례 캐러셀 */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              성공한 <span className="text-yellow-400">리더들의 이야기</span>
            </h2>
            <p className="text-xl text-slate-300">
              함께 성장하며 이뤄낸 놀라운 변화들
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-yellow-500/30 rounded-2xl p-12 text-center shadow-2xl"
              >
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl mb-6"
                  >
                    💬
                  </motion.div>
                  
                  <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].author}
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-yellow-400"
                    />
                    <div className="text-left">
                      <div className="font-bold text-yellow-400 text-lg">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-slate-300">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 인디케이터 */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-yellow-400 scale-125'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur border border-yellow-500/30 rounded-3xl p-12 shadow-2xl">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🏆
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                당신도 리더가 될 수 있습니다!
              </h2>
              
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                팀워크와 리더십을 통해 진정한 성취를 경험하고, 
                미래를 이끌어갈 리더로 성장하세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 text-slate-900 font-black px-10 py-4 rounded-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 text-lg"
                >
                  🚀 리더십 프로그램 시작하기
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-white font-bold px-10 py-4 rounded-lg border-2 border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 text-lg"
                >
                  ⚡ 성공사례 더 보기
                </motion.button>
              </div>

              {/* 성취 배지들 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
                {[
                  { icon: "🎯", label: "목표 달성" },
                  { icon: "⚡", label: "리더십" },
                  { icon: "🤝", label: "팀워크" },
                  { icon: "🏆", label: "성취감" }
                ].map((badge, index) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="bg-slate-700/50 backdrop-blur rounded-lg p-4 text-center border border-slate-600"
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-medium text-slate-300">{badge.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default DynamicHomePage