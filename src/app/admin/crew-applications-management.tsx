'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { getCrewApplications, updateCrewApplicationStatus } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Download, Link2, CheckCircle, Plus } from 'lucide-react'
import Link from 'next/link'

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

export function CrewApplicationsManagementTab() {
  const { showAlert } = useAlert()
  const router = useRouter()
  const [allApplications, setAllApplications] = useState<CrewApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'completed'>('all')
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    setIsLoading(true)
    try {
      // 모든 데이터를 가져옴 (필터 없이)
      const data = await getCrewApplications()
      setAllApplications(data)
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '크루 신청 조회 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: 'unread' | 'completed') => {
    try {
      await updateCrewApplicationStatus(id, status)
      showAlert('상태가 업데이트되었습니다.')
      loadApplications()
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '상태 업데이트 중 오류가 발생했습니다.')
    }
  }

  const handleViewDetail = (id: string) => {
    router.push(`/admin/crew-applications/${id}`)
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

  const handleCSVDownload = () => {
    // CSV 헤더 정의
    const headers = ['이름', '이메일', '전화번호', '성별', '신청일', '지원동기', '궁금한점', '상태']

    // 데이터를 CSV 형식으로 변환
    const csvData = allApplications.map(app => {
      return [
        app.name || '',
        app.email || '',
        app.phone || '-',
        app.gender === 'male' ? '남자' : '여자',
        new Date(app.created_at).toLocaleDateString('ko-KR'),
        `"${app.motivation.replace(/"/g, '""')}"`, // 큰따옴표 처리 및 텍스트 감싸기
        `"${(app.questions || '').replace(/"/g, '""')}"`,
        app.status === 'unread' ? '확인 전' : '확인 완료'
      ]
    })

    // CSV 생성
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n')

    // BOM 추가 (한글 깨짐 방지)
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })

    // 다운로드 실행
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const today = new Date().toISOString().split('T')[0]
    link.setAttribute('href', url)
    link.setAttribute('download', `크루신청목록_${today}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCopyLink = async () => {
    const applicationUrl = `${window.location.origin}/crew-application`
    try {
      await navigator.clipboard.writeText(applicationUrl)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 3000)
    } catch (error) {
      console.error('Failed to copy link:', error)
      showAlert('링크 복사에 실패했습니다.')
    }
  }

  // 필터링된 신청 목록
  const filteredApplications = statusFilter === 'all'
    ? allApplications
    : allApplications.filter(a => a.status === statusFilter)

  // 상태별 카운트 (전체 데이터 기준)
  const unreadCount = allApplications.filter(a => a.status === 'unread').length
  const completedCount = allApplications.filter(a => a.status === 'completed').length

  return (
    <div>
      {/* Header with Actions */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="heading-2">크루 신청 관리</h2>
          <p className="text-gray-600 mt-1">총 {allApplications.length}건의 크루 신청이 있습니다.</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleCSVDownload}
            className="bg-gray-600 hover:bg-gray-700 text-white"
            disabled={allApplications.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            CSV 다운로드
          </Button>
          <Button
            onClick={handleCopyLink}
            className="bg-purple-600 hover:bg-purple-700 text-white relative"
          >
            <Link2 className="w-4 h-4 mr-2" />
            크루 신청 링크 복사
            {showCopySuccess && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                복사되었습니다!
              </div>
            )}
          </Button>
          <Link href="/crew-application">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              크루 추가하기
            </Button>
          </Link>
          <a href="https://maily.so/" target="_blank" rel="noopener noreferrer">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Maily 바로가기
            </Button>
          </a>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setStatusFilter('all')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                statusFilter === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              전체 ({allApplications.length})
            </button>
            <button
              onClick={() => setStatusFilter('unread')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                statusFilter === 'unread'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              확인 전 ({unreadCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                statusFilter === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              확인 완료 ({completedCount})
            </button>
          </nav>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">크루 신청 목록</h3>
            <span className="text-sm text-gray-500">총 {filteredApplications.length}개</span>
          </div>

          {filteredApplications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              등록된 크루 신청이 없습니다.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        application.status === 'unread'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {application.status === 'unread' ? '확인 전' : '확인 완료'}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(application.created_at)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetail(application.id)}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        상세보기
                      </button>
                      {application.status === 'unread' && (
                        <button
                          onClick={() => handleStatusChange(application.id, 'completed')}
                          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                        >
                          확인완료
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">이름:</span> {application.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">이메일:</span> {application.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">연락처:</span> {application.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">성별:</span> {application.gender === 'male' ? '남자' : '여자'}
                    </p>
                  </div>

                  <div className="border-t mt-3 pt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">지원 동기:</p>
                    <p className="text-gray-700 whitespace-pre-wrap line-clamp-3">
                      {application.motivation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
