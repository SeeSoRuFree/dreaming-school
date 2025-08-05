'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HomeImageGalleryProps {
  images: string[]
  title?: string
  className?: string
}

export function HomeImageGallery({ 
  images, 
  title = "꿈을짓는학교의 생생한 현장", 
  className = '' 
}: HomeImageGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      dragFree: false,
      containScroll: 'trimSnaps',
      slidesToScroll: 1,
      align: 'center'
    },
    [
      Autoplay({ 
        delay: 4000, 
        stopOnInteraction: true,
        stopOnMouseEnter: true 
      })
    ]
  )
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 제목 */}
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{title}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
      )}

      {/* 캐러셀 컨테이너 */}
      <div className="relative">
        <div className="overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                <div className="relative aspect-[16/9] bg-gray-100">
                  <Image
                    src={image}
                    alt={`꿈을짓는학교 활동 사진 ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    priority={index === 0}
                  />
                  {/* 이미지 위 그라데이션 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
              onClick={scrollPrev}
              aria-label="이전 이미지"
            >
              <ChevronLeft className="w-6 h-6 text-blue-700" />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
              onClick={scrollNext}
              aria-label="다음 이미지"
            >
              <ChevronRight className="w-6 h-6 text-blue-700" />
            </button>
          </>
        )}

        {/* 도트 인디케이터 */}
        {images.length > 1 && (
          <div className="flex justify-center space-x-3 mt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-blue-700 scale-125 shadow-lg'
                    : 'bg-white/60 hover:bg-white/80 backdrop-blur-sm'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`이미지 ${index + 1}로 이동`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}