'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimatedHeroText = () => {
  const texts = [
    "함께 꿈을 짓는 학교",
    <>
      배움의 행복을 전하고
      <br />
      삶의 가치를 나누는
    </>,
    "사회적협동조합으로",
    "품성교육 + 이론 + 실기가 복합된",
    "키자니아식 교육을 통해",
    <>
      도서지역 청소년들의
      <br />
      전인적 성장을 돕습니다
    </>
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 3500) // 3.5초마다 텍스트 변경

    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <div className="h-48 md:h-56 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="text-4xl md:text-6xl font-bold text-center leading-relaxed drop-shadow-2xl text-white"
          style={{
            textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0px 0px 20px rgba(0,0,0,0.6)'
          }}
        >
          {texts[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}

export default AnimatedHeroText