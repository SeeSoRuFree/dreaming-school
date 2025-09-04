'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')
  
  // 관리자 페이지에서는 푸터 숨김
  if (isAdminPage) {
    return null
  }
  
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="container-main py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image 
                src="/images/Logo.png" 
                alt="꿈을 짓는 학교 사회적협동조합" 
                width={192}
                height={64}
                className="h-16 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              지역사회 교육 발전을 위한 사회적협동조합으로,
              모든 사람이 꿈을 키우고 실현할 수 있는 교육의 기회를 제공합니다.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">바로가기</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-blue-100 hover:text-white transition-colors">ABOUT</Link></li>
              <li><Link href="/programs" className="text-blue-100 hover:text-white transition-colors">교육프로그램</Link></li>
              <li><Link href="/footsteps" className="text-blue-100 hover:text-white transition-colors">걸어온 발자취</Link></li>
              <li><Link href="/news" className="text-blue-100 hover:text-white transition-colors">소식 및 공지</Link></li>
              <li><Link href="/contact" className="text-blue-100 hover:text-white transition-colors">문의하기</Link></li>
              <li><Link href="/crew-application" className="text-blue-100 hover:text-white transition-colors">크루 신청하기</Link></li>
              <li><Link href="/admin" className="text-blue-100 hover:text-white transition-colors">관리자</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">연락처</h4>
            <div className="text-blue-100 space-y-2">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="text-sm">
                  <p>010-2672-1109</p>
                  <p>010-2863-2731</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">baram7702@naver.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">경남 산청군 신안면 하정리<br />928-1 1층</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">조합 정보</h4>
            <div className="text-blue-100 text-sm space-y-1">
              <p>사업자등록번호: 699-82-00446</p>
              <p>대표자: 구관혁</p>
              <p>설립일: 2022년 9월</p>
              <p>인가번호: 제2022-1340-SO-0455호</p>
            </div>
          </div>
        </div>
        
        {/* 협력기관 */}
        <div className="mt-8 pt-8 border-t border-blue-700/30">
          <h4 className="text-lg font-semibold mb-4 text-amber-400 text-center">협력기관</h4>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.moe.go.kr/main.do?s=moe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-700/20 hover:bg-blue-700/30 text-blue-100 hover:text-white px-6 py-2 rounded-lg transition-all duration-200 border border-blue-600/30 hover:border-blue-500/50"
            >
              교육부
            </a>
            <a 
              href="https://www.socialenterprise.or.kr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-700/20 hover:bg-blue-700/30 text-blue-100 hover:text-white px-6 py-2 rounded-lg transition-all duration-200 border border-blue-600/30 hover:border-blue-500/50"
            >
              사회적기업진흥원
            </a>
            <a 
              href="https://www.sancheong.go.kr/www/index.do" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-700/20 hover:bg-blue-700/30 text-blue-100 hover:text-white px-6 py-2 rounded-lg transition-all duration-200 border border-blue-600/30 hover:border-blue-500/50"
            >
              산청군청
            </a>
          </div>
        </div>
        
        <hr className="my-8 border-blue-700/50" />
        
        <div className="text-center">
          <p className="text-blue-200 text-sm">
            &copy; 2024 꿈을 짓는 학교 사회적협동조합. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            {/* YouTube */}
            <a href="https://www.youtube.com/@꿈을짓는학교" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/dreambuilder_school/" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
            </a>
            {/* Naver Blog */}
            <a href="https://blog.naver.com/dreambuilders2022" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}