'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const NatureHomePage = () => {
  const [selectedSeason, setSelectedSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring')
  
  const seasons = {
    spring: { name: '봄', emoji: '🌸', color: 'from-green-300 to-emerald-400', bgColor: 'bg-green-50' },
    summer: { name: '여름', emoji: '🌿', color: 'from-emerald-400 to-green-600', bgColor: 'bg-emerald-50' },
    autumn: { name: '가을', emoji: '🍂', color: 'from-orange-300 to-red-400', bgColor: 'bg-orange-50' },
    winter: { name: '겨울', emoji: '❄️', color: 'from-blue-300 to-slate-400', bgColor: 'bg-slate-50' }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50/80 via-green-50 to-teal-50/80 min-h-screen">
      {/* 미니멀한 자연 요소들 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl opacity-15"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          >
            🍃
          </motion.div>
        ))}
      </div>

      {/* About 섹션 - 유기적 웨이브 형태 */}
      <section className="relative py-20 overflow-hidden">
        {/* 미니멀한 웨이브 배경 */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 1200 600"
            className="w-full h-full object-cover opacity-10"
            preserveAspectRatio="none"
          >
            <path
              d="M0,300 C300,200 600,400 900,300 C1050,250 1200,350 1200,300 L1200,600 L0,600 Z"
              fill="url(#cleanWaveGradient)"
            />
            <defs>
              <linearGradient id="cleanWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#047857" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 왼쪽 - 메인 콘텐츠 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6"
                >
                  <span className="text-2xl mr-3">🌱</span>
                  <span className="text-emerald-800 font-medium">SUSTAINABLE EDUCATION</span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-light text-emerald-900 mb-6 leading-relaxed">
                  자연과 함께
                  <br />
                  <span className="font-semibold text-green-700">성장하는 교육</span>
                </h2>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  꿈을짓는학교는 환경과 조화를 이루며 지속가능한 미래를 만들어가는 교육을 추구합니다. 
                  자연의 순환과 생명의 소중함을 배우며, 친환경적 사고와 실천을 기르는 교육 프로그램을 제공합니다.
                </p>

                {/* 성장 단계 시각화 */}
                <div className="space-y-4 mb-8">
                  {[
                    { stage: "씨앗", desc: "환경 인식의 시작", icon: "🌰", progress: 25 },
                    { stage: "새싹", desc: "친환경 실천 학습", icon: "🌱", progress: 50 },
                    { stage: "성장", desc: "지속가능한 프로젝트", icon: "🌿", progress: 75 },
                    { stage: "개화", desc: "환경 리더로 성장", icon: "🌸", progress: 100 }
                  ].map((item, index) => (
                    <motion.div
                      key={item.stage}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.2 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-emerald-800">{item.stage}</span>
                          <span className="text-sm text-gray-600">{item.desc}</span>
                        </div>
                        <div className="w-full bg-emerald-100 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ delay: 1 + index * 0.3, duration: 1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  🌿 자연 교육 시작하기
                </motion.button>
              </div>
            </motion.div>

            {/* 오른쪽 - 깔끔한 환경 인포그래픽 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-emerald-100">
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-2xl font-semibold text-emerald-800 mb-2">지속가능한 미래</h3>
                  <p className="text-emerald-600">환경을 생각하는 교육</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "♻️", label: "재활용 교육", value: "100%" },
                    { icon: "🌊", label: "물 보전", value: "실천" },
                    { icon: "🌳", label: "숲 가꾸기", value: "참여" },
                    { icon: "🔋", label: "에너지 절약", value: "학습" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-emerald-50 rounded-xl p-4 text-center hover:bg-emerald-100 transition-colors"
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-sm font-medium text-emerald-800 mb-1">{item.label}</div>
                      <div className="text-xs text-emerald-600">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before/After 프로그램 섹션 */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-emerald-900 mb-6">
              환경을 바꾸는 <span className="font-semibold text-green-700">변화의 이야기</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              작은 실천이 모여 만들어내는 놀라운 환경 개선 스토리
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto space-y-16">
            {[
              {
                title: "학교 정원 프로젝트",
                before: {
                  title: "황폐한 학교 뒤뜰",
                  description: "방치된 공간, 쓰레기가 쌓인 뒤뜰, 학생들이 기피하는 장소",
                  image: "/images/home/KakaoTalk_20240516_190354456_11.jpg"
                },
                after: {
                  title: "생명이 숨쉬는 정원",
                  description: "학생들이 직접 가꾼 채소밭과 꽃밭, 휴식과 학습의 공간으로 변화",
                  image: "/images/home/KakaoTalk_20240528_130049921_15.jpg"
                },
                impact: ["CO₂ 감소 30%", "생물다양성 증가", "학생 만족도 95%"]
              },
              {
                title: "친환경 에너지 전환",
                before: {
                  title: "높은 전력 소비",
                  description: "무분별한 전력 사용, 환경 인식 부족, 에너지 낭비 문제",
                  image: "/images/home/KakaoTalk_20240516_190354456_16.jpg"
                },
                after: {
                  title: "스마트 에너지 관리",
                  description: "태양광 패널 설치, 에너지 절약 습관 형성, 친환경 의식 확산",
                  image: "/images/home/KakaoTalk_20240528_130049921_22.jpg"
                },
                impact: ["에너지 절약 40%", "친환경 인식 개선", "비용 절감 효과"]
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
                className="bg-white/80 backdrop-blur rounded-3xl overflow-hidden shadow-xl border border-emerald-100"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-8 text-center">
                    {project.title}
                  </h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Before */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 rounded-2xl p-6 border-l-4 border-gray-400"
                    >
                      <div className="flex items-center mb-4">
                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                          BEFORE
                        </span>
                        <h4 className="font-semibold text-gray-800">{project.before.title}</h4>
                      </div>
                      <div className="relative mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={project.before.image}
                          alt={project.before.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover opacity-70"
                        />
                        <div className="absolute inset-0 bg-gray-900/20"></div>
                      </div>
                      <p className="text-gray-600">{project.before.description}</p>
                    </motion.div>

                    {/* After */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-emerald-50 rounded-2xl p-6 border-l-4 border-emerald-500"
                    >
                      <div className="flex items-center mb-4">
                        <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                          AFTER
                        </span>
                        <h4 className="font-semibold text-emerald-800">{project.after.title}</h4>
                      </div>
                      <div className="relative mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={project.after.image}
                          alt={project.after.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-full">
                          ✨
                        </div>
                      </div>
                      <p className="text-emerald-700">{project.after.description}</p>
                    </motion.div>
                  </div>

                  {/* Impact */}
                  <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-6">
                    <h5 className="font-semibold text-emerald-900 mb-4 text-center">📊 환경 개선 효과</h5>
                    <div className="grid md:grid-cols-3 gap-4">
                      {project.impact.map((impact, impactIndex) => (
                        <div
                          key={impactIndex}
                          className="bg-white rounded-lg p-3 text-center shadow-sm"
                        >
                          <div className="text-emerald-600 font-semibold text-sm">{impact}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 계절별 정원 갤러리 */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-emerald-900 mb-6">
              계절마다 <span className="font-semibold text-green-700">새로워지는 정원</span>
            </h2>
            <p className="text-xl text-gray-600">
              자연의 순환을 경험하며 배우는 생태 교육
            </p>
          </motion.div>

          {/* 계절 선택 탭 */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-2 shadow-lg border border-emerald-100">
              {Object.entries(seasons).map(([key, season]) => (
                <button
                  key={key}
                  onClick={() => setSelectedSeason(key as 'spring' | 'summer' | 'autumn' | 'winter')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 mx-1 ${
                    selectedSeason === key
                      ? `bg-gradient-to-r ${season.color} text-white shadow-md`
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <span className="mr-2">{season.emoji}</span>
                  {season.name}
                </button>
              ))}
            </div>
          </div>

          {/* 계절별 갤러리 */}
          <motion.div
            key={selectedSeason}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-3xl p-8 ${seasons[selectedSeason].bgColor}`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "/images/home/KakaoTalk_20240528_130049921_22.jpg",
                "/images/home/KakaoTalk_20240528_130049921_23.jpg",
                "/images/home/KakaoTalk_20240528_130049921_27.jpg"
              ].map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={src}
                    alt={`${seasons[selectedSeason].name} 정원`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">
                      {seasons[selectedSeason].emoji} {seasons[selectedSeason].name}의 정원
                    </h4>
                    <p className="text-sm text-gray-600">
                      자연의 변화를 직접 관찰하고 배우는 특별한 시간
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA 섹션 - 자연 테마 */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-green-200 to-teal-200"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-emerald-200">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🌱
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-light text-emerald-900 mb-6">
                지구와 함께 성장해요
              </h2>
              
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                환경을 생각하는 마음과 실천하는 힘을 기르며, 
                지속가능한 미래를 만들어가는 환경 리더가 되어보세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-lg"
                >
                  🌿 환경 교육 참여하기
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-300 text-lg"
                >
                  🌍 환경 프로젝트 보기
                </motion.button>
              </div>

              {/* 환경 아이콘들 */}
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4 max-w-lg mx-auto">
                {[
                  { icon: "🌳", label: "나무심기" },
                  { icon: "♻️", label: "재활용" },
                  { icon: "🌊", label: "물보전" },
                  { icon: "🔋", label: "에너지" },
                  { icon: "🌸", label: "생태계" },
                  { icon: "🌍", label: "지구보호" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs font-medium text-emerald-700">{item.label}</div>
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

export default NatureHomePage