'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProgramImageCarouselProps {
  images: readonly string[]
  programTitle: string
  className?: string
}

export function ProgramImageCarousel({ 
  images, 
  programTitle, 
  className = '' 
}: ProgramImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      dragFree: false,
      containScroll: 'trimSnaps'
    },
    [
      Autoplay({ 
        delay: 3000, 
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
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">이미지를 불러올 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* 캐러셀 컨테이너 */}
      <div className="overflow-hidden rounded-lg shadow-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={image}
                  alt={`${programTitle} - 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 600px"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            onClick={scrollPrev}
            aria-label="이전 이미지"
          >
            <ChevronLeft className="w-5 h-5 text-blue-700" />
          </button>
          
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            onClick={scrollNext}
            aria-label="다음 이미지"
          >
            <ChevronRight className="w-5 h-5 text-blue-700" />
          </button>
        </>
      )}

      {/* 도트 인디케이터 */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === selectedIndex
                  ? 'bg-blue-700 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`이미지 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}

      {/* 이미지 카운터 */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}