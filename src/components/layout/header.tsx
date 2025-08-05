'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useAlert } from '@/hooks/useAlert'

const navigation = [
  { name: 'ABOUT', href: '/about' },
  { name: '교육프로그램', href: '/programs' },
  { name: '연혁', href: '/history' },
  { name: '소식 및 공지', href: '/news' },
  { name: '오시는길', href: '/location' },
  { name: '문의', href: '/contact' },
  { name: '크루들의 방', href: '/crew-room' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, isCrew, logout } = useAuth()
  const { showAlert } = useAlert()

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    showAlert('로그아웃되었습니다.', '로그아웃')
    router.push('/')
  }

  return (
    <header className="nav-header">
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
                className={pathname === item.href ? 'nav-link-active' : 'nav-link'}
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Navigation */}
            {isAuthenticated ? (
              <div className="ml-4 relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-700 font-medium">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <span>{user?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                      {user?.email}
                    </div>
                    {user?.crewStatus === 'pending' && (
                      <Link
                        href="/crew-application-status"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        크루 신청 현황
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-4">
                <Link
                  href="/login"
                  className="btn-primary text-sm px-4 py-2"
                >
                  로그인
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
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
          <nav className="md:hidden py-4 border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 ${pathname === item.href ? 'text-blue-700 font-medium' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Navigation */}
            {isAuthenticated ? (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-700 font-medium">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                
                {user?.crewStatus === 'pending' && (
                  <Link
                    href="/crew-application-status"
                    className="block py-2 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    크루 신청 현황
                  </Link>
                )}
                
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left py-2 text-gray-700"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <Link
                  href="/login"
                  className="block btn-primary text-center text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  로그인
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}