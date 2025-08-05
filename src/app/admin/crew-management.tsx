// Crew Management Tab Component
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, CrewApplication } from '@/types'
import { authUtils } from '@/lib/auth'
import { useAlert } from '@/hooks/useAlert'

interface CrewManagementTabProps {
  users: User[]
  currentUser: User
}

export function CrewManagementTab({ users, currentUser }: CrewManagementTabProps) {
  const { showAlert } = useAlert()
  const [applications, setApplications] = useState<CrewApplication[]>([])
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [selectedApplication, setSelectedApplication] = useState<CrewApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadApplications()
    
    // Listen for auth state changes to update crew applications
    const handleAuthStateChange = () => {
      loadApplications()
    }
    
    window.addEventListener(authUtils.getAuthStateChangeEvent(), handleAuthStateChange)
    
    return () => {
      window.removeEventListener(authUtils.getAuthStateChangeEvent(), handleAuthStateChange)
    }
  }, [])

  const loadApplications = () => {
    try {
      const applicationsData = localStorage.getItem('crew-applications')
      if (applicationsData) {
        setApplications(JSON.parse(applicationsData))
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load crew applications:', error)
      setIsLoading(false)
    }
  }

  const getFilteredApplications = () => {
    if (selectedFilter === 'all') return applications
    return applications.filter(app => app.status === selectedFilter)
  }

  const getApplicantInfo = (userId: string) => {
    return users.find(u => u.id === userId)
  }

  const handleApprove = (applicationId: string, notes?: string) => {
    const application = applications.find(app => app.id === applicationId)
    if (!application) return

    const user = getApplicantInfo(application.userId)
    if (!user) return

    // Update application
    const updatedApplication: CrewApplication = {
      ...application,
      status: 'approved',
      processedAt: new Date(),
      processedBy: currentUser.id,
      notes: notes || application.notes
    }

    // Update user role and status
    const updatedUser: User = {
      ...user,
      role: 'crew',
      crewStatus: 'approved'
    }

    // Save updates
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? updatedApplication : app
    )
    setApplications(updatedApplications)
    localStorage.setItem('crew-applications', JSON.stringify(updatedApplications))

    // Update user
    authUtils.updateUser(user.id, { role: 'crew', crewStatus: 'approved' })

    showAlert(`${user.name}님의 크루 신청이 승인되었습니다.`, '승인 완료')
    setSelectedApplication(null)
  }

  const handleReject = (applicationId: string, notes?: string) => {
    const application = applications.find(app => app.id === applicationId)
    if (!application) return

    const user = getApplicantInfo(application.userId)
    if (!user) return

    if (!notes) {
      showAlert('거부 사유를 입력해주세요.', '입력 오류')
      return
    }

    // Update application
    const updatedApplication: CrewApplication = {
      ...application,
      status: 'rejected',
      processedAt: new Date(),
      processedBy: currentUser.id,
      notes
    }

    // Update user status
    const updatedUser: User = {
      ...user,
      crewStatus: 'rejected'
    }

    // Save updates
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? updatedApplication : app
    )
    setApplications(updatedApplications)
    localStorage.setItem('crew-applications', JSON.stringify(updatedApplications))

    // Update user
    authUtils.updateUser(user.id, { crewStatus: 'rejected' })

    showAlert(`${user.name}님의 크루 신청이 거부되었습니다.`, '거부 완료')
    setSelectedApplication(null)
  }

  const filteredApplications = getFilteredApplications()

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        <p className="mt-4 text-gray-600">크루 신청 목록을 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-2 mb-6">크루 신청 관리</h2>

        {/* Filter Buttons */}
        <Card className="p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체 ({applications.length})
            </button>
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'pending'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              대기중 ({applications.filter(app => app.status === 'pending').length})
            </button>
            <button
              onClick={() => setSelectedFilter('approved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'approved'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              승인됨 ({applications.filter(app => app.status === 'approved').length})
            </button>
            <button
              onClick={() => setSelectedFilter('rejected')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'rejected'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              거부됨 ({applications.filter(app => app.status === 'rejected').length})
            </button>
          </div>
        </Card>

        {/* Applications List */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      신청 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map(application => {
                    const applicant = getApplicantInfo(application.userId)
                    if (!applicant) return null

                    return (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{applicant.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {new Date(application.appliedAt).toLocaleDateString('ko-KR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            application.status === 'pending' 
                              ? 'bg-amber-100 text-amber-800'
                              : application.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {application.status === 'pending' ? '대기중' 
                              : application.status === 'approved' ? '승인됨' 
                              : '거부됨'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedApplication(application)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            상세보기
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <CrewApplicationDetails
          application={selectedApplication}
          user={getApplicantInfo(selectedApplication.userId)!}
          onClose={() => setSelectedApplication(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  )
}

// Crew Application Details Component
interface CrewApplicationDetailsProps {
  application: CrewApplication
  user: User
  onClose: () => void
  onApprove: (applicationId: string, notes?: string) => void
  onReject: (applicationId: string, notes?: string) => void
}

function CrewApplicationDetails({ 
  application, 
  user, 
  onClose, 
  onApprove, 
  onReject 
}: CrewApplicationDetailsProps) {
  const [adminNotes, setAdminNotes] = useState(application.notes || '')

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return { text: '검토 중', color: 'text-amber-700 bg-amber-100' }
      case 'approved': return { text: '승인됨', color: 'text-emerald-700 bg-emerald-100' }
      case 'rejected': return { text: '거부됨', color: 'text-red-700 bg-red-100' }
      default: return { text: '알 수 없음', color: 'text-gray-700 bg-gray-100' }
    }
  }

  const statusInfo = getStatusDisplay(application.status)

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-8 border w-full max-w-4xl shadow-lg rounded-lg bg-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">크루 신청 상세</h3>
            <p className="text-gray-600 mt-2">
              신청자: <strong>{user.name}</strong> ({user.email})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
            {statusInfo.text}
          </span>
          {application.processedAt && (
            <p className="text-sm text-gray-600 mt-2">
              처리일: {new Date(application.processedAt).toLocaleDateString('ko-KR')}
            </p>
          )}
        </div>

        {/* Application Details */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">신청일</h4>
            <p className="text-gray-700">{new Date(application.appliedAt).toLocaleDateString('ko-KR')}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">지원 동기</h4>
            <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
              {application.motivation}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">관련 경험</h4>
            <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
              {application.experience}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">가능한 활동 시간</h4>
            <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
              {application.availableTime}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">보유 기술/관심 분야</h4>
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

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">관리자 메모</h4>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="textarea-field"
              rows={4}
              placeholder="승인/거부 사유나 특이사항을 입력하세요"
              disabled={application.status !== 'pending'}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <Button
            onClick={onClose}
            variant="outline"
          >
            닫기
          </Button>
          {application.status === 'pending' && (
            <>
              <Button
                onClick={() => {
                  if (confirm('이 신청을 거부하시겠습니까?')) {
                    onReject(application.id, adminNotes)
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                거부
              </Button>
              <Button
                onClick={() => {
                  if (confirm('이 신청을 승인하시겠습니까?')) {
                    onApprove(application.id, adminNotes)
                  }
                }}
                className="btn-primary"
              >
                승인
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}