'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface InfiniteScrollGalleryProps {
  images: {
    src: string
    alt: string
  }[]
  speed?: number // 스크롤 속도 (초 단위)
}

export default function InfiniteScrollGallery({ images, speed = 30 }: InfiniteScrollGalleryProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null)
  
  // 이미지를 두 번 반복하여 무한 스크롤 효과 생성
  const duplicatedImages = [...images, ...images]
  
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    
    if (selectedImage) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden' // 스크롤 방지
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])
  
  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="relative">
          <div
            className="flex gap-4 animate-scroll"
            style={{
              animation: `scroll ${speed}s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-60 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              aria-label="닫기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* 확대된 이미지 */}
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
            
            {/* 이미지 설명 */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                {selectedImage.alt}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll ${speed}s linear infinite;
        }
      `}</style>
    </>
  )
}