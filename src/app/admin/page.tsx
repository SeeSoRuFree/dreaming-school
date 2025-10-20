'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { getDashboardStats, getRecentInquiries, getRecentCrewApplications } from '@/lib/supabase'
import {
  Users,
  GraduationCap,
  MessageSquare,
  Footprints,
  TrendingUp,
  Calendar
} from 'lucide-react'

interface DashboardStats {
  totalPrograms: number
  totalFootsteps: number
  totalInquiries: number
  totalCrewApplications: number
}

interface Inquiry {
  id: string
  name: string
  type: string
  created_at: string
  status?: string
}

interface CrewApplication {
  id: string
  name: string
  created_at: string
  status?: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const { isAdmin, isLoading } = useAdminAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalPrograms: 0,
    totalFootsteps: 0,
    totalInquiries: 0,
    totalCrewApplications: 0,
  })
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([])
  const [recentCrewApplications, setRecentCrewApplications] = useState<CrewApplication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    loadDashboardStats()
  }, [isAdmin, isLoading, router])

  const loadDashboardStats = async () => {
    try {
      setLoading(true)

      // 통계 데이터 로드
      const statsData = await getDashboardStats()
      setStats(statsData)

      // 최근 문의 로드
      const inquiries = await getRecentInquiries(5)
      setRecentInquiries(inquiries)

      // 최근 크루 신청 로드
      const crewApps = await getRecentCrewApplications(5)
      setRecentCrewApplications(crewApps)
    } catch (error) {
      console.error('대시보드 데이터 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const statCards = [
    {
      title: '교육 프로그램',
      value: stats.totalPrograms,
      icon: GraduationCap,
      color: 'bg-blue-500',
      link: '/admin/programs'
    },
    {
      title: '걸어온 발자취',
      value: stats.totalFootsteps,
      icon: Footprints,
      color: 'bg-green-500',
      link: '/admin/footsteps'
    },
    {
      title: '일반 문의',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'bg-amber-500',
      link: '/admin/inquiries/general'
    },
    {
      title: '크루 신청',
      value: stats.totalCrewApplications,
      icon: Users,
      color: 'bg-purple-500',
      link: '/admin/crew-applications'
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* 환영 메시지 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">관리자 대시보드</h1>
          <p className="text-blue-100">
            꿈을 짓는 학교 관리 시스템에 오신 것을 환영합니다.
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {card.value}
                </h3>
                <p className="text-sm text-gray-600">{card.title}</p>
              </div>
            )
          })}
        </div>

        {/* 최근 활동 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 최근 문의 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">최근 문의</h2>
              <MessageSquare className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-gray-500 text-center py-8">로딩 중...</p>
              ) : recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{inquiry.name}</p>
                      <p className="text-xs text-gray-500">
                        {inquiry.type === 'general' ? '일반 문의' : '후원 문의'} • {new Date(inquiry.created_at).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      inquiry.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {inquiry.status === 'completed' ? '완료' : '대기'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  문의 데이터가 없습니다.
                </p>
              )}
            </div>
          </div>

          {/* 최근 크루 신청 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">최근 크루 신청</h2>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-gray-500 text-center py-8">로딩 중...</p>
              ) : recentCrewApplications.length > 0 ? (
                recentCrewApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{app.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(app.created_at).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      app.status === 'approved' ? 'bg-green-100 text-green-700' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {app.status === 'approved' ? '승인' : app.status === 'rejected' ? '거절' : '대기'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  크루 신청 데이터가 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 빠른 액세스 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">빠른 액세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/programs"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">프로그램 관리</span>
            </a>
            <a
              href="/admin/news"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">소식/공지 관리</span>
            </a>
            <a
              href="/admin/crew-applications"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">크루 관리</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
