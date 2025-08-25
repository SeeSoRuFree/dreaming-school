'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

const NatureHero = () => {
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
      {/* 자연 배경 - 유기적 형태들과 자연 요소들 */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full relative"
          style={{ background: themeConfig.colors.hero }}
        >
          {/* 부드러운 물결 무늬 */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 100'%3E%3Cpath d='M0,50 C250,80 500,20 750,50 C875,65 1000,35 1000,50 L1000,100 L0,100 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '100% 200px',
              backgroundRepeat: 'repeat-x'
            }}
          />

          {/* 떠다니는 자연 요소들 */}
          <motion.div
            className="absolute top-20 left-16 w-12 h-12 rounded-full bg-white/15"
            animate={{
              y: [-10, 20, -10],
              x: [-5, 5, -5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* 잎사귀 모양 */}
            <div 
              className="w-full h-full rounded-full bg-green-300/30"
              style={{
                clipPath: 'ellipse(70% 100% at 50% 0%)'
              }}
            />
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-white/10"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              y: [0, -15, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* 꽃 모양 */}
            <div className="relative w-full h-full">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-8 bg-white/20 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-50%)`,
                    transformOrigin: 'center bottom'
                  }}
                />
              ))}
              <div className="absolute w-4 h-4 bg-yellow-300/40 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-32 left-1/4 w-20 h-8 bg-white/10 rounded-full"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 자연스러운 파티클들 */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* 자연스러운 브랜드 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-8 py-3 mb-4 border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" />
            <h1 className="text-xl md:text-2xl font-medium">꿈을 짓는 학교</h1>
            <div className="w-3 h-3 bg-green-400 rounded-full ml-3 animate-pulse" />
          </motion.div>
          <p className="text-base opacity-80 italic">자연과 함께 성장하는 지속가능한 교육</p>
        </motion.div>

        {/* 부드러운 메인 텍스트 */}
        <div className="h-48 md:h-56 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-light text-center leading-relaxed"
              style={{
                textShadow: '2px 2px 20px rgba(0,0,0,0.3), 0px 0px 40px rgba(5,150,105,0.2)',
                fontFamily: 'serif'
              }}
            >
              {themeConfig.heroTexts[currentIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Before & After 스토리 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto"
        >
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-stone-300 text-sm mb-2 font-medium">BEFORE</div>
            <h3 className="text-xl font-semibold mb-3">환경에 대한 무관심</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              일회용품 사용, 자연 파괴, 지속가능성에 대한 인식 부족
            </p>
          </motion.div>
          <motion.div
            className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-green-300/30"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-green-300 text-sm mb-2 font-medium">AFTER</div>
            <h3 className="text-xl font-semibold mb-3">친환경 글로벌 인재</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              생태계 이해, 지속가능한 실천, 환경 보호 의식 확립
            </p>
          </motion.div>
        </motion.div>

        {/* 자연스러운 키워드들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {themeConfig.keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm md:text-base font-medium border border-emerald-300/30 hover:border-emerald-300/50 transition-all duration-300"
            >
              🌱 {keyword}
            </motion.span>
          ))}
        </motion.div>

        {/* 온화한 CTA 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/15 backdrop-blur-sm text-white font-medium px-10 py-4 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50"
          >
            자연 체험 시작하기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="bg-emerald-500/20 backdrop-blur-sm text-white font-medium px-10 py-4 rounded-full border border-emerald-300/50 hover:bg-emerald-500/30 transition-all duration-300"
          >
            원예 프로그램 보기
          </motion.button>
        </motion.div>
      </div>

      {/* 자연스러운 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center"
        >
          <motion.div
            className="w-8 h-8 mb-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌿
          </motion.div>
          <span className="text-xs opacity-75 font-light tracking-wider">자연과 함께 성장하기</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default NatureHero