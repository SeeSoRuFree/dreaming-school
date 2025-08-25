'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

const CreativeHero = () => {
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
      {/* 창의적 배경 - 기하학적 도형들 */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full"
          style={{ background: themeConfig.colors.hero }}
        >
          {/* 떠다니는 기하학적 도형들 */}
          <motion.div
            className="absolute top-20 left-10 w-16 h-16 bg-white/20 rounded-full"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-12 h-12 bg-white/15"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            animate={{
              x: [-5, 15, -5],
              rotate: [0, -180, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/4 w-20 h-20 bg-white/10 rounded-lg"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-8 h-8 bg-white/25 rounded-full"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* 기본 브랜드 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-medium mb-2 opacity-90">
            꿈을 짓는 학교
          </h1>
          <div className="w-20 h-1 bg-white/60 mx-auto rounded-full"></div>
        </motion.div>

        {/* 애니메이션 메인 텍스트 */}
        <div className="h-48 md:h-56 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ 
                duration: 0.6,
                ease: "easeInOut"
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight"
              style={{
                textShadow: '3px 3px 12px rgba(0,0,0,0.3), 0px 0px 30px rgba(255,255,255,0.2)'
              }}
            >
              {themeConfig.heroTexts[currentIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* 키워드 태그들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {themeConfig.keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm md:text-base font-medium border border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              # {keyword}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-800 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-white/50"
          >
            프로그램 체험하기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent text-white font-semibold px-8 py-4 rounded-full border-2 border-white/60 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            창의 교육 알아보기
          </motion.button>
        </motion.div>
      </div>

      {/* 하단 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-2 opacity-75">창의적 여정 시작하기</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CreativeHero