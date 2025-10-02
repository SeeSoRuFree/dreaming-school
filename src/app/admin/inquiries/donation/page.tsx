'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { getInquiries, updateInquiryStatus } from '@/lib/supabase'
import { useAlert } from '@/hooks/useAlert'
import { Card } from '@/components/ui/card'

interface Inquiry {
  id: string
  type: 'general' | 'donation'
  name: string
  email: string
  phone?: string
  organization?: string
  message: string
  status: 'unread' | 'completed'
  created_at: string
  updated_at: string
}

export default function DonationInquiriesPage() {
  const router = useRouter()
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const { showAlert } = useAlert()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'completed'>('all')

  useEffect(() => {
    if (authLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    loadInquiries()
  }, [isAdmin, authLoading, router])

  const loadInquiries = async () => {
    setIsLoading(true)
    try {
      const data = await getInquiries({ type: 'donation' })
      setInquiries(data)
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '문의 조회 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: 'unread' | 'completed') => {
    try {
      await updateInquiryStatus(id, status)
      showAlert('상태가 업데이트되었습니다.')
      loadInquiries()
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '상태 업데이트 중 오류가 발생했습니다.')
    }
  }

  const handleViewDetail = (id: string) => {
    router.push(`/admin/inquiries/${id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredInquiries = inquiries.filter(inquiry => {
    if (statusFilter === 'all') return true
    return inquiry.status === statusFilter
  })

  if (authLoading) {
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-2">후원 문의 현황</h1>
            <p className="text-gray-600 mt-2">기업 및 개인 후원 문의를 관리합니다</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체 ({inquiries.length})
          </button>
          <button
            onClick={() => setStatusFilter('unread')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'unread'
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            확인 전 ({inquiries.filter(i => i.status === 'unread').length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            확인 완료 ({inquiries.filter(i => i.status === 'completed').length})
          </button>
        </div>

        {/* Inquiries List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        ) : (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">후원 문의 목록</h3>
              <span className="text-sm text-gray-500">총 {filteredInquiries.length}개</span>
            </div>

            {filteredInquiries.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {statusFilter === 'all'
                  ? '등록된 후원 문의가 없습니다.'
                  : statusFilter === 'unread'
                  ? '확인 전인 후원 문의가 없습니다.'
                  : '확인 완료된 후원 문의가 없습니다.'}
              </p>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          inquiry.status === 'unread'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {inquiry.status === 'unread' ? '확인 전' : '확인 완료'}
                        </span>
                        {inquiry.organization && (
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                            기업/단체
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{formatDate(inquiry.created_at)}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetail(inquiry.id)}
                          className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
                        >
                          상세보기
                        </button>
                        {inquiry.status === 'unread' && (
                          <button
                            onClick={() => handleStatusChange(inquiry.id, 'completed')}
                            className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                          >
                            확인완료
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">이름:</span> {inquiry.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">이메일:</span> {inquiry.email}
                        </p>
                        {inquiry.phone && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">연락처:</span> {inquiry.phone}
                          </p>
                        )}
                      </div>
                      {inquiry.organization && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">기업/단체명:</span> {inquiry.organization}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border-t mt-3 pt-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">후원 문의 내용:</p>
                      <p className="text-gray-700 whitespace-pre-wrap line-clamp-3">
                        {inquiry.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
