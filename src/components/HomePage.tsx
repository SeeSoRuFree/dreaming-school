'use client'

import { useState, useEffect } from 'react'
import DefaultHomePage from '@/components/themes/DefaultHomePage'
import AnimatedHeroText from '@/components/ui/AnimatedHeroText'

export default function HomePage() {
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>('https://oprwxbtukrafehaotgqm.supabase.co/storage/v1/object/public/sales-storage//test.mp4')

  useEffect(() => {
    // localStorage에서 hero 동영상 URL 가져오기
    const savedUrl = localStorage.getItem('hero-video-url')
    if (savedUrl) {
      setHeroVideoUrl(savedUrl)
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
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
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto hero-content pt-16">
          <AnimatedHeroText />
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <DefaultHomePage />
    </>
  )
}
