'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimatedHeroText = () => {
  const texts = [
    "우리는 아이들과 함께 집을 짓습니다",
    <>
      아이들이 직접 장비와 공구를 다루고
      <br />
      망치질, 톱질로 땀 흘리며
    </>,
    <>
      역동적 창의성과
      <br />
      바른 인품이 회복되길 원합니다
    </>,
    <>
      성적중심, 우열중심
      <br />
      교육 환경 속에서
    </>,
    <>
      자긍심을 잃어가는 우리 아이들의
      <br />
      긍지와 자부심이
    </>,
    "회복되기를 소망합니다"
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