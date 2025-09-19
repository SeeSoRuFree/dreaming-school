'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAlert } from '@/hooks/useAlert'

const aboutSubItems = [
  { id: 'about', label: '꿈을 짓는 학교는?' },
  { id: 'mission', label: '미션과 비전' },
  { id: 'organization', label: '조직구성' },
  { id: 'location', label: '오시는 길' }
]

const programSubItems = [
  { id: 'building', label: '한평집짓기' },
  { id: 'model', label: '모형집짓기' },
  { id: 'gardening', label: '원예' },
  { id: 'science', label: '과학창의' },
  { id: 'rural', label: '농촌활성화' },
  { id: 'remodeling', label: '공간재창조' }
]

const navigation = [
  { name: 'ABOUT', href: '/about', subItems: aboutSubItems },
  { name: '교육프로그램', href: '/programs', subItems: programSubItems },
  { name: '걸어온 발자취', href: '/footsteps', subItems: null },
  { name: '소식 및 공지', href: '/news', subItems: null },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const pathname = usePathname()
  const router = useRouter()
  const { showAlert } = useAlert()
  
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
  
  // 관리자 페이지 체크
  const isAdminPage = pathname?.startsWith('/admin')
  
  // 데스크탑 드롭다운 핸들러
  const handleDropdownClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault()
    e.stopPropagation()

    // 버튼의 위치 계산
    const button = buttonRefs.current[name]
    if (button) {
      const rect = button.getBoundingClientRect()
      setDropdownPosition({
        x: rect.left,
        y: rect.bottom
      })
    }

    setActiveDropdown(prev => prev === name ? null : name)
  }

  // 모바일 드롭다운 핸들러
  const handleMobileDropdownClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault()
    e.stopPropagation()
    setMobileActiveDropdown(prev => prev === name ? null : name)
  }

  // 클릭 외부 영역 감지를 위한 effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null)
      }
    }

    if (activeDropdown) {
      // 100ms 지연을 주어 드롭다운이 즉시 닫히는 것을 방지
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 100)

      return () => {
        clearTimeout(timer)
        document.removeEventListener('click', handleClickOutside)
      }
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  // 서브메뉴 클릭 핸들러
  const handleSubItemClick = (href: string, sectionId: string) => {
    router.push(href)
    setActiveDropdown(null)

    // 페이지 이동 후 스크롤
    setTimeout(() => {
      const element = document.getElementById(sectionId === 'about' ? sectionId : `section-${sectionId}`)
      if (element) {
        const offset = 120
        const elementPosition = element.offsetTop - offset
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  // 헤더 클래스 결정
  const headerClass = isScrolled
    ? 'fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md transition-all duration-300'
    : 'fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300'

  // 관리자 페이지에서는 헤더 숨김
  if (isAdminPage) {
    return null
  }

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
              <div
                key={item.name}
                className="relative dropdown-container"
              >
                {item.subItems ? (
                  <button
                    ref={(el) => {
                      if (el) buttonRefs.current[item.name] = el
                    }}
                    type="button"
                    onClick={(e) => handleDropdownClick(e, item.name)}
                    className={`font-medium text-lg px-5 py-2 rounded-full flex items-center gap-1 transition-all duration-200 ${
                      isScrolled ? 'text-blue-700 hover:text-blue-800 hover:bg-blue-50' : (isHomePage ? 'text-white hover:bg-white/10' : 'text-blue-700 hover:text-blue-800 hover:bg-blue-50')
                    }`}
                  >
                    {item.name}
                    <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === item.name ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={pathname === item.href
                      ? isScrolled ? 'nav-link-active-blue' : (isHomePage ? 'nav-link-active-transparent' : 'nav-link-active-blue')
                      : isScrolled ? 'nav-link-blue' : (isHomePage ? 'nav-link-transparent' : 'nav-link-blue')}
                  >
                    {item.name}
                  </Link>
                )}

              </div>
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

          {/* 데스크탑 드롭다운 메뉴 - 모바일에서 숨김 */}
          {activeDropdown && (
            <div
              className="dropdown-container hidden md:block"
              style={{
                position: 'fixed',
                left: `${dropdownPosition.x}px`,
                top: `${dropdownPosition.y + 8}px`,
                width: '240px',
                backgroundColor: 'white',
                padding: '8px',
                zIndex: 9999,
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              {navigation.find(item => item.name === activeDropdown)?.subItems?.map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => handleSubItemClick(
                    navigation.find(item => item.name === activeDropdown)?.href || '',
                    subItem.id
                  )}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 hover:text-blue-700 transition-all duration-200 rounded-xl text-sm font-medium"
                >
                  {subItem.label}
                </button>
              ))}
            </div>
          )}

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
          <nav className={`md:hidden py-4 px-2 border-t ${
            isScrolled ? 'border-blue-100 bg-white/95 backdrop-blur-sm' : (isHomePage ? 'border-white/20 bg-black/50 backdrop-blur-sm' : 'border-blue-100 bg-white/95 backdrop-blur-sm')
          }`}>
            {navigation.map((item) => (
              <div key={item.name} className="dropdown-container mb-2">
                {item.subItems ? (
                  <button
                    type="button"
                    onClick={(e) => handleMobileDropdownClick(e, item.name)}
                    className={`flex items-center justify-between w-full px-2 py-2 font-medium rounded-lg transition-all ${
                      isScrolled
                        ? 'text-blue-700 hover:bg-blue-50'
                        : (isHomePage
                          ? 'text-white hover:bg-white/10'
                          : 'text-blue-700 hover:bg-blue-50')
                    }`}
                  >
                    {item.name}
                    <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileActiveDropdown === item.name ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                  </button>
                ) : (
                  <Link
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
                )}
                {item.subItems && mobileActiveDropdown === item.name && (
                  <div className="mt-2 space-y-1 bg-gray-50/50 rounded-lg p-2">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          handleSubItemClick(item.href, subItem.id)
                          setIsMenuOpen(false)
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                          isScrolled
                            ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                            : (isHomePage
                              ? 'text-white/90 hover:bg-white/10 hover:text-white'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700')
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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