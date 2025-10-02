'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { getInquiryById, updateInquiryStatus } from '@/lib/supabase'
import { useAlert } from '@/hooks/useAlert'
import { ArrowLeft } from 'lucide-react'

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

export default function InquiryDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const { showAlert } = useAlert()
  const [inquiry, setInquiry] = useState<Inquiry | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    if (params.id) {
      loadInquiry()
    }
  }, [isAdmin, authLoading, params.id, router])

  const loadInquiry = async () => {
    setIsLoading(true)
    try {
      const data = await getInquiryById(params.id as string)
      setInquiry(data)
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '문의 조회 중 오류가 발생했습니다.')
      router.push('/admin/inquiries')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (status: 'unread' | 'completed') => {
    if (!inquiry) return

    try {
      await updateInquiryStatus(inquiry.id, status)
      showAlert('상태가 업데이트되었습니다.')
      setInquiry({ ...inquiry, status })
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '상태 업데이트 중 오류가 발생했습니다.')
    }
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

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin || !inquiry) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/inquiries')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="heading-2">문의 상세</h1>
          </div>
          <div className="flex gap-2">
            {inquiry.status === 'unread' ? (
              <button
                onClick={() => handleStatusChange('completed')}
                className="btn-primary"
              >
                확인 완료
              </button>
            ) : (
              <button
                onClick={() => handleStatusChange('unread')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                미확인으로 변경
              </button>
            )}
          </div>
        </div>

        {/* Inquiry Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          {/* Status and Date */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              inquiry.status === 'unread'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {inquiry.status === 'unread' ? '확인 전' : '확인 완료'}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              inquiry.type === 'general'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-purple-100 text-purple-700'
            }`}>
              {inquiry.type === 'general' ? '일반 문의' : '후원 문의'}
            </span>
            <span className="text-sm text-gray-500 ml-auto">
              {formatDate(inquiry.created_at)}
            </span>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">연락처 정보</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">이름</label>
                <p className="text-gray-900">{inquiry.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">이메일</label>
                <p className="text-gray-900">{inquiry.email}</p>
              </div>
              {inquiry.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">연락처</label>
                  <p className="text-gray-900">{inquiry.phone}</p>
                </div>
              )}
              {inquiry.organization && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">기업/단체명</label>
                  <p className="text-gray-900">{inquiry.organization}</p>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">문의 내용</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {inquiry.message}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t mt-6 pt-6">
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">등록일:</span> {formatDate(inquiry.created_at)}
              </div>
              <div>
                <span className="font-medium">수정일:</span> {formatDate(inquiry.updated_at)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/admin/inquiries')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            목록으로
          </button>
          <a
            href={`mailto:${inquiry.email}?subject=RE: 문의 답변`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            이메일 답변하기
          </a>
        </div>
      </div>
    </AdminLayout>
  )
}
