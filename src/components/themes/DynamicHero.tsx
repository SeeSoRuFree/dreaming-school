'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

const DynamicHero = () => {
  const { themeConfig } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % themeConfig.heroTexts.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [themeConfig.heroTexts.length])

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* 역동적 배경 - 에너지 라인들과 그리드 */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full relative"
          style={{ background: themeConfig.colors.hero }}
        >
          {/* 그리드 패턴 */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* 에너지 파동들 */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `radial-gradient(circle at 20% 30%, rgba(245,158,11,0.3) 0%, transparent 50%)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `radial-gradient(circle at 80% 70%, rgba(245,158,11,0.2) 0%, transparent 50%)`
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 역동적 라인들 */}
          <motion.div
            className="absolute top-1/4 left-10 w-32 h-1 bg-white/30 rounded-full"
            animate={{
              scaleX: [1, 2, 1],
              x: [0, 50, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-20 w-24 h-1 bg-white/25 rounded-full"
            animate={{
              scaleX: [1, 1.5, 1],
              x: [0, -30, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* 브랜드 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              className="w-12 h-1 bg-white/60 rounded-full mr-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              꿈을 짓는 학교
            </h1>
            <motion.div
              className="w-12 h-1 bg-white/60 rounded-full ml-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="text-lg opacity-90 font-medium">Leadership • Character • Achievement</p>
        </motion.div>

        {/* 강렬한 메인 텍스트 */}
        <div className="h-48 md:h-56 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentIndex}
              initial={{ opacity: 0, y: 30, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, rotateX: -90 }}
              transition={{ 
                duration: 0.7,
                ease: "easeOut"
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-center leading-tight uppercase tracking-tight"
              style={{
                textShadow: '4px 4px 16px rgba(0,0,0,0.5), 0px 0px 40px rgba(245,158,11,0.3)',
                fontWeight: 900
              }}
            >
              {themeConfig.heroTexts[currentIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* 성취 지표들 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
        >
          {[
            { number: "100+", label: "성공적 프로젝트" },
            { number: "95%", label: "만족도" },
            { number: "500+", label: "참여 학생" },
            { number: "12", label: "협력 학교" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <motion.div
                className="text-2xl md:text-3xl font-black mb-1"
                style={{ color: themeConfig.colors.secondary }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm font-medium opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* 키워드 배지들 - 더 강렬한 스타일 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {themeConfig.keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-blue-900 rounded-lg px-6 py-3 text-sm md:text-base font-bold shadow-lg border-2 border-amber-400/50 hover:shadow-xl transition-all duration-300"
            >
              {keyword}
            </motion.span>
          ))}
        </motion.div>

        {/* 강렬한 CTA 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-blue-900 font-black px-10 py-4 rounded-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 border-2 border-amber-400 text-lg"
          >
            지금 도전하기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent text-white font-bold px-10 py-4 rounded-lg border-3 border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-lg"
          >
            성취 사례 보기
          </motion.button>
        </motion.div>
      </div>

      {/* 파워풀한 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-3 opacity-90 font-bold tracking-wide">SCROLL FOR IMPACT</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
            whileHover={{ borderColor: 'rgba(245,158,11,0.8)' }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default DynamicHero