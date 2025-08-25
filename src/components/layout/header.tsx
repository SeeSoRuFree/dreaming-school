'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAlert } from '@/hooks/useAlert'

const navigation = [
  { name: 'ABOUT', href: '/about' },
  { name: '교육프로그램', href: '/programs' },
  { name: '소식 및 공지', href: '/news' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { showAlert } = useAlert()
  
  // 관리자 페이지 체크
  const isAdminPage = pathname?.startsWith('/admin')
  
  // 관리자 페이지에서는 헤더 숨김
  if (isAdminPage) {
    return null
  }
  
  // 홈페이지 체크
  const isHomePage = pathname === '/'
  
  // 클라이언트 마운트 감지
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // 스크롤 감지
  useEffect(() => {
    if (!mounted) return
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    
    // 초기 스크롤 위치 확인
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])
  
  // 헤더 클래스 결정
  const headerClass = isScrolled 
    ? 'fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md transition-all duration-300'
    : 'fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300'

  return (
    <header className={headerClass}>
      <div className="container-main">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/Logo.png" 
              alt="꿈을 짓는 학교 사회적협동조합" 
              width={192}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={pathname === item.href 
                  ? isScrolled ? 'nav-link-active-blue' : (isHomePage ? 'nav-link-active-transparent' : 'nav-link-active-blue')
                  : isScrolled ? 'nav-link-blue' : (isHomePage ? 'nav-link-transparent' : 'nav-link-blue')}
              >
                {item.name}
              </Link>
            ))}

            {/* Contact Button */}
            <div className="ml-4">
              <Link
                href="/contact"
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                문의하기
              </Link>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors ${
              isScrolled ? 'hover:bg-blue-50 text-blue-700' : (isHomePage ? 'hover:bg-white/10 text-white' : 'hover:bg-blue-50 text-blue-700')
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={`md:hidden py-4 border-t ${
            isScrolled ? 'border-blue-100 bg-white/90 backdrop-blur-sm' : (isHomePage ? 'border-white/20 bg-black/50 backdrop-blur-sm' : 'border-blue-100 bg-white/90 backdrop-blur-sm')
          }`}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 ${
                  pathname === item.href 
                    ? isScrolled ? 'text-blue-700 font-medium' : (isHomePage ? 'text-white font-medium' : 'text-blue-700 font-medium')
                    : isScrolled ? 'text-blue-600' : (isHomePage ? 'text-white/90' : 'text-blue-600')
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Contact Button */}
            <div className="mt-4">
              <Link
                href="/contact"
                className="block bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg text-center text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                문의하기
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}