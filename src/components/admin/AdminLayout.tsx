'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import {
  LayoutDashboard,
  GraduationCap,
  Footprints,
  Newspaper,
  Mail,
  Users,
  MessageSquare,
  LogOut,
  Building2,
  FileText,
  Send
} from 'lucide-react'

interface AdminLayoutProps {
  children: ReactNode
}

const menuItems = [
  {
    label: '대시보드',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: '교육프로그램 관리',
    href: '/admin/programs',
    icon: GraduationCap,
  },
  {
    label: '걸어온 발자취 관리',
    href: '/admin/footsteps',
    icon: Footprints,
  },
  {
    label: '소식 및 공지 관리',
    href: '/admin/news',
    icon: Newspaper,
  },
  {
    label: '언론보도 관리',
    href: '/admin/media-coverage',
    icon: FileText,
  },
  {
    label: '일반 문의 현황',
    href: '/admin/inquiries/general',
    icon: MessageSquare,
  },
  {
    label: '후원 문의 현황',
    href: '/admin/inquiries/donation',
    icon: Mail,
  },
  {
    label: '크루 신청현황',
    href: '/admin/crew-applications',
    icon: Users,
  },
  {
    label: '메일/문자 관리',
    href: '/admin/communications',
    icon: Send,
  },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const { logout } = useAdminAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        {/* 로고 */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">꿈을 짓는 학교</h1>
              <p className="text-xs text-gray-500">관리자</p>
            </div>
          </Link>
        </div>

        {/* 메뉴 */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* 로그아웃 버튼 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="ml-64">
        {/* 헤더 */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-900">
            {menuItems.find(item => item.href === pathname)?.label || '관리자 페이지'}
          </h2>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              사이트 바로가기
            </Link>
          </div>
        </header>

        {/* 콘텐츠 */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
