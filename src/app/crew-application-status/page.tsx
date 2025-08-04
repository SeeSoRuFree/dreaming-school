'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CrewApplication } from '@/types'

export default function CrewApplicationStatusPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [application, setApplication] = useState<CrewApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return

    if (!isAuthenticated) {
      alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    if (!user?.crewStatus) {
      alert('크루 봉사자 신청 내역이 없습니다.')
      router.push('/crew-application')
      return
    }

    // Load application from localStorage
    const applications: CrewApplication[] = JSON.parse(localStorage.getItem('crew-applications') || '[]')
    const userApplication = applications.find(app => app.userId === user.id)
    
    setApplication(userApplication || null)
    setIsLoading(false)
  }, [isAuthenticated, user, authLoading, router])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          text: '검토 중',
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200',
          description: '신청서를 검토 중입니다. 곧 연락드리겠습니다.'
        }
      case 'approved':
        return {
          text: '승인됨',
          color: 'text-green-700',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
          description: '축하합니다! 크루 봉사자로 승인되었습니다.'
        }
      case 'rejected':
        return {
          text: '반려됨',
          color: 'text-red-700',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
          description: '아쉽게도 이번 신청이 반려되었습니다. 다음 기회에 다시 신청해주세요.'
        }
      default:
        return {
          text: '알 수 없음',
          color: 'text-gray-700',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-200',
          description: '상태를 확인할 수 없습니다.'
        }
    }
  }

  if (authLoading) {
    return (
      <div className="container-main section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  if (isLoading) {
    return (
      <div className="container-main section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">신청 내역을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="container-main section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="heading-1">신청 내역을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mt-4 mb-8">
            크루 봉사자 신청 내역이 없습니다.
          </p>
          <Button onClick={() => router.push('/crew-application')}>
            크루 봉사자 신청하기
          </Button>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusInfo(application.status)

  return (
    <div className="container-main section-padding">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="heading-1">크루 봉사자 신청 현황</h1>
          <p className="text-gray-600 mt-4">
            신청해주셔서 감사합니다. 현재 신청 상태를 확인해보세요.
          </p>
        </div>

        <Card className="p-8">
          {/* Status Badge */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center px-4 py-2 rounded-full border ${statusInfo.bgColor} ${statusInfo.borderColor} ${statusInfo.color}`}>
              <div className={`w-3 h-3 rounded-full mr-2 ${statusInfo.color.replace('text-', 'bg-')}`}></div>
              <span className="font-medium">{statusInfo.text}</span>
            </div>
            <p className="text-gray-600 mt-4">{statusInfo.description}</p>
          </div>

          {/* Application Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">신청일</p>
                <p className="font-medium">{new Date(application.appliedAt).toLocaleDateString('ko-KR')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">신청자</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">지원 동기</h3>
              <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                {application.motivation}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">관련 경험</h3>
              <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                {application.experience}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">가능한 활동 시간</h3>
              <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                {application.availableTime}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">보유 기술/관심 분야</h3>
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {application.notes && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">관리자 메모</h3>
                <p className="text-gray-700 whitespace-pre-wrap bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  {application.notes}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center mt-8">
            {application.status === 'approved' && (
              <Button
                onClick={() => router.push('/crew-room')}
                className="btn-primary"
              >
                크루들의 방 입장하기
              </Button>
            )}
            {application.status === 'pending' && (
              <p className="text-gray-600 text-center">
                검토가 완료되면 이메일로 결과를 알려드리겠습니다.
              </p>
            )}
            {application.status === 'rejected' && (
              <Button
                onClick={() => router.push('/contact')}
                variant="outline"
              >
                문의하기
              </Button>
            )}
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  )
}