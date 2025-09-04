'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import DefaultHomePage from '@/components/themes/DefaultHomePage'
import ModernProfessionalHomePage from '@/components/themes/ModernProfessionalHomePage'
import VibrantCommunityHomePage from '@/components/themes/VibrantCommunityHomePage'
import EcoEducationHomePage from '@/components/themes/EcoEducationHomePage'
import ThemeSelector from '@/components/ui/ThemeSelector'
import AnimatedHeroText from '@/components/ui/AnimatedHeroText'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { currentTheme } = useTheme()
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>('https://oprwxbtukrafehaotgqm.supabase.co/storage/v1/object/public/sales-storage//test.mp4')

  useEffect(() => {
    // localStorage에서 hero 동영상 URL 가져오기
    const savedUrl = localStorage.getItem('hero-video-url')
    if (savedUrl) {
      setHeroVideoUrl(savedUrl)
    }
  }, [])

  const renderThemedContent = () => {
    switch (currentTheme) {
      case 'modern':
        return <ModernProfessionalHomePage />
      case 'vibrant':
        return <VibrantCommunityHomePage />
      case 'eco':
        return <EcoEducationHomePage />
      case 'default':
      default:
        return <DefaultHomePage />
    }
  }

  return (
    <>
      {/* 테마 선택기 */}
      <ThemeSelector />
      
      {/* Hero Section - 기존 영상 유지 */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden -mt-16">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="auto"
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
          {/* 테마별 오버레이 */}
          <motion.div 
            className="absolute inset-0 transition-all duration-500"
            style={{ 
              backgroundColor: currentTheme === 'modern' 
                ? 'rgba(30, 58, 138, 0.4)' 
                : currentTheme === 'vibrant' 
                ? 'rgba(251, 146, 60, 0.3)' 
                : currentTheme === 'eco'
                ? 'rgba(5, 150, 105, 0.3)'
                : 'rgba(0, 0, 0, 0.5)' // default theme overlay
            }}
          />
        </div>

        {/* Hero Content - 테마별 히어로 텍스트 */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto hero-content pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTheme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {currentTheme === 'default' && (
                <AnimatedHeroText />
              )}
              
              {currentTheme === 'modern' && (
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    체계적이고 전문적인
                    <br />
                    <span className="text-blue-300">미래 교육</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90">
                    신뢰할 수 있는 교육 파트너, 꿈을 짓는 학교
                  </p>
                </div>
              )}
              
              {currentTheme === 'vibrant' && (
                <div>
                  <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                    행복한 배움의
                    <br />
                    <span className="text-yellow-300">활기찬 공동체</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 font-medium">
                    친구들과 함께 성장하는 즐거운 교육
                  </p>
                </div>
              )}
              
              {currentTheme === 'eco' && (
                <div>
                  <h1 className="text-4xl md:text-6xl font-light mb-6">
                    자연과 함께
                    <br />
                    <span className="text-green-300 font-medium">지속가능한 교육</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90">
                    환경을 생각하고 지구를 보호하는 친환경 배움
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 테마별 전용 콘텐츠 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {renderThemedContent()}
        </motion.div>
      </AnimatePresence>
    </>
  )
}