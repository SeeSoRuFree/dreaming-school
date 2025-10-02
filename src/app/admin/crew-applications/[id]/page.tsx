'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { getCrewApplicationById, updateCrewApplicationStatus } from '@/lib/supabase'
import { useAlert } from '@/hooks/useAlert'
import { ArrowLeft } from 'lucide-react'

interface CrewApplication {
  id: string
  name: string
  email: string
  phone: string
  gender: string
  privacy_consent: string
  motivation: string
  questions?: string
  status: 'unread' | 'completed'
  created_at: string
  updated_at: string
}

export default function CrewApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const { showAlert } = useAlert()
  const [application, setApplication] = useState<CrewApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    if (params.id) {
      loadApplication()
    }
  }, [isAdmin, authLoading, params.id, router])

  const loadApplication = async () => {
    setIsLoading(true)
    try {
      const data = await getCrewApplicationById(params.id as string)
      setApplication(data)
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '크루 신청 조회 중 오류가 발생했습니다.')
      router.push('/admin/crew-applications')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (status: 'unread' | 'completed') => {
    if (!application) return

    try {
      await updateCrewApplicationStatus(application.id, status)
      showAlert('상태가 업데이트되었습니다.')
      setApplication({ ...application, status })
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

  if (!isAdmin || !application) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/crew-applications')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="heading-2">크루 신청 상세</h1>
          </div>
          <div className="flex gap-2">
            {application.status === 'unread' ? (
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

        {/* Application Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          {/* Status and Date */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              application.status === 'unread'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {application.status === 'unread' ? '확인 전' : '확인 완료'}
            </span>
            <span className="text-sm text-gray-500 ml-auto">
              {formatDate(application.created_at)}
            </span>
          </div>

          {/* Personal Information */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">기본 정보</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">이름</label>
                <p className="text-gray-900">{application.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">이메일</label>
                <p className="text-gray-900">{application.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">연락처</label>
                <p className="text-gray-900">{application.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">성별</label>
                <p className="text-gray-900">{application.gender === 'male' ? '남자' : '여자'}</p>
              </div>
            </div>
          </div>

          {/* Privacy Consent */}
          <div className="border-t pt-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">개인정보 수집 및 활용 동의</h3>
            <div className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
              application.privacy_consent === '동의'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {application.privacy_consent}
            </div>
          </div>

          {/* Motivation */}
          <div className="border-t pt-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">지원 동기</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {application.motivation}
              </p>
            </div>
          </div>

          {/* Questions */}
          {application.questions && (
            <div className="border-t pt-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">궁금한 점</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {application.questions}
                </p>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="border-t mt-6 pt-6">
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">신청일:</span> {formatDate(application.created_at)}
              </div>
              <div>
                <span className="font-medium">수정일:</span> {formatDate(application.updated_at)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/admin/crew-applications')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            목록으로
          </button>
          <a
            href={`mailto:${application.email}?subject=RE: 크루 신청 관련`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            이메일 답변하기
          </a>
        </div>
      </div>
    </AdminLayout>
  )
}
