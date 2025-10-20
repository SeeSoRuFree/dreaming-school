'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card } from '@/components/ui/card'
import { Mail, MessageSquare, ExternalLink } from 'lucide-react'

export default function CommunicationsPage() {
  const router = useRouter()
  const { isAdmin, isLoading } = useAdminAuth()

  useEffect(() => {
    if (isLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [isAdmin, isLoading, router])

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

  const services = [
    {
      name: 'Maily 메일 서비스',
      description: '대량 메일 발송 및 메일 템플릿 관리',
      icon: Mail,
      url: 'https://maily.so/',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      emoji: '📧'
    },
    {
      name: 'NHN Cloud SMS 서비스',
      description: '문자 메시지 발송 및 알림 관리',
      icon: MessageSquare,
      url: 'https://console.nhncloud.com/',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      emoji: '💬'
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메일/문자 관리</h1>
          <p className="text-gray-600 mt-2">외부 서비스 연동</p>
          <p className="text-sm text-gray-500 mt-1">
            아래 서비스들을 클릭하면 각 서비스의 관리 페이지로 이동합니다.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <a
                key={service.name}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-gray-200 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`${service.bgColor} p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                      <span className="text-4xl">{service.emoji}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {service.name}
                        </h3>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <p className="text-gray-600 mb-4">{service.description}</p>

                      <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                        <span>서비스 바로가기</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            )
          })}
        </div>

        {/* Info Box */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">안내</h4>
              <p className="text-sm text-blue-800">
                각 서비스를 이용하려면 해당 서비스에 로그인해야 합니다.
                서비스 이용에 문제가 있으시면 시스템 관리자에게 문의해주세요.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
