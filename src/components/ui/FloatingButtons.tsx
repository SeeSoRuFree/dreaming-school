'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, Youtube, Instagram } from 'lucide-react'

export default function FloatingButtons() {
  const pathname = usePathname()
  
  // 관리자 페이지에서는 플로팅 버튼 숨김
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return (
    <>
      {/* 중앙 문의하기 버튼 */}
      <Link
        href="/contact"
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">문의하기</span>
      </Link>

      {/* 우측 소셜 미디어 버튼들 */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col space-y-3">
        {/* YouTube 버튼 */}
        <a
          href="https://youtube.com/@dreamingschool"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="YouTube"
        >
          <Youtube className="w-6 h-6" />
        </a>

        {/* Instagram 버튼 */}
        <a
          href="https://instagram.com/dreamingschool"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6" />
        </a>

        {/* Naver Blog 버튼 */}
        <a
          href="https://blog.naver.com/dreambuilders2022"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Naver Blog"
        >
          <span className="font-bold text-lg">N</span>
        </a>
      </div>

      {/* 모바일에서 중앙 버튼 위치 조정 */}
      <style jsx>{`
        @media (max-width: 640px) {
          /* 모바일에서는 문의하기 버튼을 좌측으로 이동 */
        }
      `}</style>
    </>
  )
}