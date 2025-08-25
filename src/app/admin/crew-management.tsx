// Crew Management Tab Component
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, CrewApplication } from '@/types'
import { authUtils } from '@/lib/auth'
import { useAlert } from '@/hooks/useAlert'
import { mockCrewApplications, mockCrewUsers } from '@/lib/admin-mock-data'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'

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
  
  // 모달 상태
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [actionMessage, setActionMessage] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [approveNote, setApproveNote] = useState('')
  const [rejectError, setRejectError] = useState('')

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
        const parsedApplications = JSON.parse(applicationsData)
        
        // 대기중인 mock 데이터가 없으면 추가
        const hasPending = parsedApplications.some((app: CrewApplication) => app.status === 'pending')
        if (!hasPending) {
          const pendingApplications = mockCrewApplications.filter(app => app.status === 'pending')
          const pendingUsers = mockCrewUsers.filter(u => u.crewStatus === 'pending')
          
          // 크루 신청 추가
          pendingApplications.forEach(app => {
            if (!parsedApplications.find((a: CrewApplication) => a.id === app.id)) {
              parsedApplications.push(app)
            }
          })
          
          // 사용자 추가
          const usersData = localStorage.getItem('dream-house-users')
          const users = usersData ? JSON.parse(usersData) : []
          pendingUsers.forEach(user => {
            if (!users.find((u: User) => u.id === user.id)) {
              users.push(user)
            }
          })
          
          localStorage.setItem('crew-applications', JSON.stringify(parsedApplications))
          localStorage.setItem('dream-house-users', JSON.stringify(users))
        }
        
        setApplications(parsedApplications)
      } else {
        // 데이터가 없으면 mock 데이터로 초기화
        localStorage.setItem('crew-applications', JSON.stringify(mockCrewApplications))
        localStorage.setItem('dream-house-users', JSON.stringify(mockCrewUsers))
        setApplications(mockCrewApplications)
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

  const handleApproveClick = (application: CrewApplication) => {
    setSelectedApplication(application)
    setShowApproveModal(true)
    setApproveNote('')
  }

  const handleRejectClick = (application: CrewApplication) => {
    setSelectedApplication(application)
    setShowRejectModal(true)
    setRejectReason('')
    setRejectError('')
  }

  const confirmApprove = () => {
    if (!selectedApplication) return

    const user = getApplicantInfo(selectedApplication.userId)
    if (!user) return

    // Update application
    const updatedApplication: CrewApplication = {
      ...selectedApplication,
      status: 'approved',
      processedAt: new Date(),
      processedBy: currentUser.id,
      notes: approveNote || selectedApplication.notes
    }

    // Update user role and status
    const updatedUser: User = {
      ...user,
      role: 'crew',
      crewStatus: 'approved'
    }

    // Save updates
    const updatedApplications = applications.map(app => 
      app.id === selectedApplication.id ? updatedApplication : app
    )
    setApplications(updatedApplications)
    localStorage.setItem('crew-applications', JSON.stringify(updatedApplications))

    // Update user
    authUtils.updateUser(user.id, { role: 'crew', crewStatus: 'approved' })

    // 성공 모달 표시
    setActionMessage(`${user.name}님의 크루 신청이 승인되었습니다.`)
    setShowApproveModal(false)
    setShowSuccessModal(true)
    setSelectedApplication(null)
  }

  const confirmReject = () => {
    if (!selectedApplication) return

    const user = getApplicantInfo(selectedApplication.userId)
    if (!user) return

    if (!rejectReason.trim()) {
      // 거부 사유가 없으면 에러 메시지 표시
      setRejectError('거부 사유를 입력해주세요.')
      return
    }
    
    // 에러 메시지 초기화
    setRejectError('')

    // Update application
    const updatedApplication: CrewApplication = {
      ...selectedApplication,
      status: 'rejected',
      processedAt: new Date(),
      processedBy: currentUser.id,
      notes: rejectReason
    }

    // Update user status
    const updatedUser: User = {
      ...user,
      crewStatus: 'rejected'
    }

    // Save updates
    const updatedApplications = applications.map(app => 
      app.id === selectedApplication.id ? updatedApplication : app
    )
    setApplications(updatedApplications)
    localStorage.setItem('crew-applications', JSON.stringify(updatedApplications))

    // Update user
    authUtils.updateUser(user.id, { crewStatus: 'rejected' })

    // 성공 모달 표시
    setActionMessage(`${user.name}님의 크루 신청이 거부되었습니다.`)
    setShowRejectModal(false)
    setShowSuccessModal(true)
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
          onApprove={handleApproveClick}
          onReject={handleRejectClick}
        />
      )}

      {/* 승인 확인 모달 */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>크루 신청 승인</DialogTitle>
            <DialogDescription>
              {selectedApplication && getApplicantInfo(selectedApplication.userId)?.name}님의 크루 신청을 승인하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700">승인 메모 (선택)</label>
              <textarea
                value={approveNote}
                onChange={(e) => setApproveNote(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="특이사항이나 메모를 입력하세요"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveModal(false)}>
              취소
            </Button>
            <Button onClick={confirmApprove} className="bg-blue-600 hover:bg-blue-700 text-white">
              승인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 거부 확인 모달 */}
      <Dialog open={showRejectModal} onOpenChange={(open) => {
        setShowRejectModal(open)
        if (!open) {
          setRejectError('')
          setRejectReason('')
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>크루 신청 거부</DialogTitle>
            <DialogDescription>
              {selectedApplication && getApplicantInfo(selectedApplication.userId)?.name}님의 크루 신청을 거부하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700">거부 사유 <span className="text-red-500">*</span></label>
              <textarea
                value={rejectReason}
                onChange={(e) => {
                  setRejectReason(e.target.value)
                  if (rejectError) setRejectError('')
                }}
                className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 ${
                  rejectError 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-red-500'
                }`}
                rows={3}
                placeholder="거부 사유를 입력해주세요 (필수)"
                required
              />
              {rejectError && (
                <p className="mt-1 text-sm text-red-600">{rejectError}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRejectModal(false)
              setRejectError('')
              setRejectReason('')
            }}>
              취소
            </Button>
            <Button onClick={confirmReject} className="bg-red-600 hover:bg-red-700 text-white">
              거부
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 성공 메시지 모달 */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>처리 완료</DialogTitle>
            <DialogDescription>
              {actionMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessModal(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Crew Application Details Component
interface CrewApplicationDetailsProps {
  application: CrewApplication
  user: User
  onClose: () => void
  onApprove: (application: CrewApplication) => void
  onReject: (application: CrewApplication) => void
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
                onClick={() => onReject(application)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                거부
              </Button>
              <Button
                onClick={() => onApprove(application)}
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