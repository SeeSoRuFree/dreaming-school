// Crew Management Tab Component
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, CrewApplication } from '@/types'
import { mockCrewApplications, mockCrewUsers } from '@/lib/admin-mock-data'
import { Download } from 'lucide-react'
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
  const [applications, setApplications] = useState<CrewApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<CrewApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = () => {
    try {
      const applicationsData = localStorage.getItem('crew-applications')
      if (applicationsData) {
        const parsedApplications = JSON.parse(applicationsData)
        
        // Mock 데이터가 없으면 추가
        if (parsedApplications.length === 0) {
          const pendingApplications = mockCrewApplications
          const pendingUsers = mockCrewUsers
          
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

  const getApplicantInfo = (userId: string) => {
    return users.find(u => u.id === userId)
  }

  const handleCSVDownload = () => {
    // CSV 헤더 정의
    const headers = ['이름', '이메일', '전화번호', '신청일', '지원동기', '관련경험', '활동가능시간', '보유기술', '상태']
    
    // 데이터를 CSV 형식으로 변환
    const csvData = applications.map(app => {
      const user = getApplicantInfo(app.userId)
      return [
        user?.name || '',
        user?.email || '',
        user?.phone || '-',
        new Date(app.appliedAt).toLocaleDateString('ko-KR'),
        `"${app.motivation.replace(/"/g, '""')}"`, // 큰따옴표 처리 및 텍스트 감싸기
        `"${app.experience.replace(/"/g, '""')}"`,
        `"${app.availableTime.replace(/"/g, '""')}"`,
        app.skills.join('; '),
        app.status === 'pending' ? '대기중' : app.status === 'approved' ? '승인' : '거절'
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="heading-2 mb-2">크루 신청 목록</h2>
            <p className="text-gray-600">총 {applications.length}건의 크루 신청이 있습니다.</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleCSVDownload}
              className="bg-gray-600 hover:bg-gray-700 text-white"
              disabled={applications.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              CSV 다운로드
            </Button>
            <Link href="/crew-application">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
                    전화번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      신청 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  applications.map(application => {
                    const applicant = getApplicantInfo(application.userId)
                    if (!applicant) return null

                    return (
                      <tr 
                        key={application.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedApplication(application)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{applicant.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{applicant.phone || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {new Date(application.appliedAt).toLocaleDateString('ko-KR')}
                          </div>
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
}

function CrewApplicationDetails({ 
  application, 
  user, 
  onClose
}: CrewApplicationDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>크루 신청 상세 정보</DialogTitle>
          <DialogDescription>
            신청자: <strong>{user.name}</strong> ({user.email})
          </DialogDescription>
        </DialogHeader>

        {/* Application Details */}
        <div className="space-y-4">
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

          {application.notes && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">메모</h4>
              <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                {application.notes}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}