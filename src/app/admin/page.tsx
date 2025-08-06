'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, EmailSent, EmailTemplate, CrewApplication, News, GeneralInquiry, DonationInquiry } from '@/types'
import { mockNews, mockGeneralInquiries } from '@/lib/mock-data'
import { authUtils } from '@/lib/auth'
import { useAlert } from '@/hooks/useAlert'
import { CrewManagementTab } from './crew-management'
import { CrewRoomManagementTab } from './crew-room-management'


export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated, isAdmin, isLoading: authLoading } = useAuth()
  const { showAlert } = useAlert()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'members' | 'mailing' | 'crew' | 'crew-room' | 'news' | 'inquiry'>('dashboard')
  const [users, setUsers] = useState<User[]>([])
  const [news, setNews] = useState<News[]>([])
  const [generalInquiries, setGeneralInquiries] = useState<GeneralInquiry[]>([])
  const [donationInquiries, setDonationInquiries] = useState<DonationInquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!isAuthenticated) {
      showAlert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    if (!isAdmin) {
      showAlert('관리자만 접근할 수 있습니다.')
      router.push('/')
      return
    }

    const loadData = () => {
      try {
        // Load users
        const usersData = localStorage.getItem('dream-house-users')
        if (usersData) {
          setUsers(JSON.parse(usersData))
        }

        // Load news - 기존 localStorage 데이터가 있으면 사용, 없으면 mockNews로 초기화
        const newsData = localStorage.getItem('dream-house-news')
        if (newsData) {
          setNews(JSON.parse(newsData))
        } else {
          // mockNews를 localStorage에 저장하고 state에도 설정
          localStorage.setItem('dream-house-news', JSON.stringify(mockNews))
          setNews(mockNews)
        }

        // Load general inquiries
        const generalInquiriesData = localStorage.getItem('general-inquiries')
        if (generalInquiriesData) {
          const parsedInquiries = JSON.parse(generalInquiriesData)
          // Date 객체로 변환
          const inquiriesWithDates = parsedInquiries.map((inquiry: any) => ({
            ...inquiry,
            createdAt: new Date(inquiry.createdAt),
            replies: inquiry.replies?.map((reply: any) => ({
              ...reply,
              createdAt: new Date(reply.createdAt)
            })) || []
          }))
          setGeneralInquiries(inquiriesWithDates)
        } else {
          localStorage.setItem('general-inquiries', JSON.stringify(mockGeneralInquiries))
          setGeneralInquiries(mockGeneralInquiries)
        }

        // Load donation inquiries
        const donationInquiriesData = localStorage.getItem('donation-inquiries')
        if (donationInquiriesData) {
          const parsedDonationInquiries = JSON.parse(donationInquiriesData)
          // Date 객체로 변환
          const donationInquiriesWithDates = parsedDonationInquiries.map((inquiry: any) => ({
            ...inquiry,
            createdAt: new Date(inquiry.createdAt)
          }))
          setDonationInquiries(donationInquiriesWithDates)
        } else {
          setDonationInquiries([])
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load admin data:', error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [isAuthenticated, isAdmin, authLoading, router])

  const cleanupVisitStats = () => {
    localStorage.removeItem('admin-visit-stats')
    showAlert('방문 통계 데이터가 삭제되었습니다.')
  }


  const getUserStats = () => {
    const totalUsers = users.length
    const maleUsers = users.filter(u => u.gender === 'male').length
    const femaleUsers = users.filter(u => u.gender === 'female').length
    const otherUsers = users.filter(u => u.gender === 'other').length
    const crewUsers = users.filter(u => u.role === 'crew' && u.crewStatus === 'approved').length
    const pendingCrew = users.filter(u => u.crewStatus === 'pending').length

    return {
      total: totalUsers,
      male: maleUsers,
      female: femaleUsers,
      other: otherUsers,
      crew: crewUsers,
      pendingCrew,
      malePercentage: totalUsers > 0 ? Math.round((maleUsers / totalUsers) * 100) : 0,
      femalePercentage: totalUsers > 0 ? Math.round((femaleUsers / totalUsers) * 100) : 0
    }
  }


  if (authLoading) {
    return (
      <div className="container-main section-padding">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  if (isLoading) {
    return (
      <div className="container-main section-padding">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">관리자 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const userStats = getUserStats()

  return (
    <div className="container-main section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-1">관리자 대시보드</h1>
          <p className="text-gray-600 mt-4">
            꿈을짓는학교의 전체 현황과 회원 관리를 위한 관리자 페이지입니다.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                대시보드 & 통계
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'members'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                회원 관리
              </button>
              <button
                onClick={() => setActiveTab('mailing')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'mailing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                메일링 시스템
              </button>
              <button
                onClick={() => setActiveTab('crew')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'crew'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                크루 관리
              </button>
              <button
                onClick={() => setActiveTab('crew-room')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'crew-room'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                크루룸 관리
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'news'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                소식 & 공지
              </button>
              <button
                onClick={() => setActiveTab('inquiry')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'inquiry'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                문의 관리
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <DashboardTab
            userStats={userStats}
            onCleanupVisitStats={cleanupVisitStats}
          />
        )}

        {activeTab === 'members' && (
          <MembersManagementTab users={users} setUsers={setUsers} />
        )}

        {activeTab === 'mailing' && (
          <MailingTab users={users} currentUser={user!} />
        )}

        {activeTab === 'crew' && (
          <CrewManagementTab users={users} currentUser={user!} />
        )}

        {activeTab === 'crew-room' && (
          <CrewRoomManagementTab currentUser={user!} />
        )}

        {activeTab === 'news' && (
          <NewsManagementTab news={news} setNews={setNews} currentUser={user!} />
        )}

        {activeTab === 'inquiry' && (
          <InquiryManagementTab 
            generalInquiries={generalInquiries} 
            setGeneralInquiries={setGeneralInquiries}
            donationInquiries={donationInquiries}
            setDonationInquiries={setDonationInquiries}
            currentUser={user!} 
          />
        )}
      </div>
    </div>
  )
}

// Dashboard Tab Component
interface DashboardTabProps {
  userStats: {
    total: number
    male: number
    female: number
    other: number
    crew: number
    pendingCrew: number
    malePercentage: number
    femalePercentage: number
  }
  onCleanupVisitStats: () => void
}

function DashboardTab({
  userStats,
  onCleanupVisitStats
}: DashboardTabProps) {
  return (
    <div className="space-y-8">
      {/* User Statistics */}
      <div>
        <h2 className="heading-2 mb-6">회원 통계</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 회원수</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">활성 크루</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.crew}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">크루 대기</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.pendingCrew}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">남/여 비율</p>
                <p className="text-lg font-bold text-gray-900">
                  {userStats.malePercentage}% / {userStats.femalePercentage}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Gender Distribution Chart */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">성별 분포</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">남성</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${userStats.malePercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-12">{userStats.male}명</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">여성</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full" 
                    style={{ width: `${userStats.femalePercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-12">{userStats.female}명</span>
              </div>
            </div>
            {userStats.other > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">기타</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-500 h-2 rounded-full" 
                      style={{ width: `${Math.round((userStats.other / userStats.total) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-12">{userStats.other}명</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Maintenance Section */}
      <div>
        <h2 className="heading-2 mb-6">데이터 관리</h2>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">시스템 정리</h3>
          <p className="text-gray-600 mb-4">
            더 이상 사용하지 않는 방문 통계 데이터를 정리할 수 있습니다.
          </p>
          <Button
            onClick={onCleanupVisitStats}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            방문 통계 데이터 삭제
          </Button>
        </Card>
      </div>

    </div>
  )
}

// Mailing Tab Component
function MailingTab({ users, currentUser }: { users: User[], currentUser: User }) {
  const { showAlert } = useAlert()
  const [activeSubTab, setActiveSubTab] = useState<'compose' | 'templates' | 'history'>('compose')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [recipientType, setRecipientType] = useState<'all' | 'members' | 'crew' | 'selected'>('all')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [emailHistory, setEmailHistory] = useState<EmailSent[]>([])
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    loadMailingData()
  }, [])

  const loadMailingData = () => {
    try {
      const templatesData = localStorage.getItem('email-templates')
      if (templatesData) {
        setTemplates(JSON.parse(templatesData))
      }

      const historyData = localStorage.getItem('email-history')
      if (historyData) {
        setEmailHistory(JSON.parse(historyData))
      }
    } catch (error) {
      console.error('Failed to load mailing data:', error)
    }
  }

  const getFilteredUsers = () => {
    switch (recipientType) {
      case 'members':
        return users.filter(u => u.role === 'member')
      case 'crew':
        return users.filter(u => u.role === 'crew' && u.crewStatus === 'approved')
      case 'selected':
        return users.filter(u => selectedUsers.includes(u.id))
      default:
        return users
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(getFilteredUsers().map(u => u.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleUserSelect = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId])
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId))
    }
  }

  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailContent.trim()) {
      showAlert('제목과 내용을 모두 입력해주세요.')
      return
    }

    const recipients = getFilteredUsers()
    if (recipients.length === 0) {
      showAlert('받는 사람을 선택해주세요.')
      return
    }

    setIsSending(true)

    try {
      // 실제 환경에서는 이메일 API를 호출해야 합니다
      // 여기서는 localStorage에 발송 기록을 저장합니다
      const emailRecord: EmailSent = {
        id: `email_${Date.now()}`,
        subject: emailSubject,
        content: emailContent,
        recipients: recipients.map(u => u.email),
        recipientType,
        sentAt: new Date(),
        sentBy: currentUser.id
      }

      const updatedHistory = [emailRecord, ...emailHistory]
      setEmailHistory(updatedHistory)
      localStorage.setItem('email-history', JSON.stringify(updatedHistory))

      showAlert(`${recipients.length}명에게 이메일을 발송했습니다.`)
      
      // 폼 초기화
      setEmailSubject('')
      setEmailContent('')
      setSelectedUsers([])
      setRecipientType('all')
      
    } catch (error) {
      console.error('Email sending failed:', error)
      showAlert('이메일 발송 중 오류가 발생했습니다.')
    } finally {
      setIsSending(false)
    }
  }

  const saveTemplate = () => {
    if (!emailSubject.trim() || !emailContent.trim()) {
      showAlert('제목과 내용을 모두 입력해주세요.')
      return
    }

    const template: EmailTemplate = {
      id: `template_${Date.now()}`,
      title: emailSubject,
      subject: emailSubject,
      content: emailContent,
      createdAt: new Date()
    }

    const updatedTemplates = [template, ...templates]
    setTemplates(updatedTemplates)
    localStorage.setItem('email-templates', JSON.stringify(updatedTemplates))
    
    showAlert('템플릿이 저장되었습니다.')
  }

  const loadTemplate = (template: EmailTemplate) => {
    setEmailSubject(template.subject)
    setEmailContent(template.content)
    setActiveSubTab('compose')
  }

  return (
    <div>
      <h2 className="heading-2 mb-6">메일링 시스템</h2>
      
      {/* Sub Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveSubTab('compose')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'compose'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              메일 작성
            </button>
            <button
              onClick={() => setActiveSubTab('templates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              템플릿 관리
            </button>
            <button
              onClick={() => setActiveSubTab('history')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              발송 기록
            </button>
          </nav>
        </div>
      </div>

      {activeSubTab === 'compose' && (
        <ComposeEmailTab
          users={users}
          recipientType={recipientType}
          setRecipientType={setRecipientType}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          emailSubject={emailSubject}
          setEmailSubject={setEmailSubject}
          emailContent={emailContent}
          setEmailContent={setEmailContent}
          handleSelectAll={handleSelectAll}
          handleUserSelect={handleUserSelect}
          handleSendEmail={handleSendEmail}
          saveTemplate={saveTemplate}
          isSending={isSending}
          getFilteredUsers={getFilteredUsers}
        />
      )}

      {activeSubTab === 'templates' && (
        <TemplateTab
          templates={templates}
          setTemplates={setTemplates}
          loadTemplate={loadTemplate}
        />
      )}

      {activeSubTab === 'history' && (
        <HistoryTab emailHistory={emailHistory} users={users} />
      )}
    </div>
  )
}

// Compose Email Tab Component
interface ComposeEmailTabProps {
  users: User[]
  recipientType: 'all' | 'members' | 'crew' | 'selected'
  setRecipientType: (type: 'all' | 'members' | 'crew' | 'selected') => void
  selectedUsers: string[]
  setSelectedUsers: (users: string[]) => void
  emailSubject: string
  setEmailSubject: (subject: string) => void
  emailContent: string
  setEmailContent: (content: string) => void
  handleSelectAll: (checked: boolean) => void
  handleUserSelect: (userId: string, checked: boolean) => void
  handleSendEmail: () => void
  saveTemplate: () => void
  isSending: boolean
  getFilteredUsers: () => User[]
}

function ComposeEmailTab({
  users,
  recipientType,
  setRecipientType,
  selectedUsers,
  setSelectedUsers: _,
  emailSubject,
  setEmailSubject,
  emailContent,
  setEmailContent,
  handleSelectAll,
  handleUserSelect,
  handleSendEmail,
  saveTemplate,
  isSending,
  getFilteredUsers
}: ComposeEmailTabProps) {
  const filteredUsers = getFilteredUsers()
  const allSelected = filteredUsers.length > 0 && filteredUsers.every((u: User) => selectedUsers.includes(u.id))

  return (
    <div className="space-y-6">
      {/* Recipient Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">수신자 선택</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => setRecipientType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              recipientType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체 회원 ({users.length}명)
          </button>
          <button
            onClick={() => setRecipientType('members')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              recipientType === 'members'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            일반 회원 ({users.filter((u: User) => u.role === 'member').length}명)
          </button>
          <button
            onClick={() => setRecipientType('crew')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              recipientType === 'crew'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            크루원 ({users.filter((u: User) => u.role === 'crew' && u.crewStatus === 'approved').length}명)
          </button>
          <button
            onClick={() => setRecipientType('selected')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              recipientType === 'selected'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            선택한 회원 ({selectedUsers.length}명)
          </button>
        </div>

        {recipientType === 'selected' && (
          <div className="border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="selectAll"
                checked={allSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="selectAll" className="text-sm font-medium">
                전체 선택
              </label>
            </div>
            <div className="space-y-2">
              {users.map((user: User) => (
                <div key={user.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={user.id}
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleUserSelect(user.id, e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={user.id} className="text-sm flex-1">
                    {user.name} ({user.email}) - {user.role === 'member' ? '일반회원' : user.role === 'crew' ? '크루원' : '관리자'}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            선택된 수신자: <strong>{filteredUsers.length}명</strong>
          </p>
        </div>
      </Card>

      {/* Email Composition */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">메일 작성</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              id="subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="input-field"
              placeholder="메일 제목을 입력하세요"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              내용
            </label>
            <textarea
              id="content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="textarea-field"
              rows={10}
              placeholder="메일 내용을 입력하세요"
            />
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleSendEmail}
          disabled={isSending || !emailSubject.trim() || !emailContent.trim()}
          className="btn-primary"
        >
          {isSending ? '발송 중...' : '메일 발송'}
        </Button>
        <Button
          onClick={saveTemplate}
          disabled={!emailSubject.trim() || !emailContent.trim()}
          variant="outline"
        >
          템플릿으로 저장
        </Button>
      </div>
    </div>
  )
}

// Template Tab Component
interface TemplateTabProps {
  templates: EmailTemplate[]
  setTemplates: React.Dispatch<React.SetStateAction<EmailTemplate[]>>
  loadTemplate: (template: EmailTemplate) => void
}

function TemplateTab({ templates, setTemplates, loadTemplate }: TemplateTabProps) {
  const { showAlert } = useAlert()
  const deleteTemplate = (templateId: string) => {
    showAlert('이 템플릿을 삭제하시겠습니까?', '확인')
    // Note: For now using showAlert, this could be improved with a confirmation dialog later
    const updatedTemplates = templates.filter((t: EmailTemplate) => t.id !== templateId)
    setTemplates(updatedTemplates)
    localStorage.setItem('email-templates', JSON.stringify(updatedTemplates))
  }

  return (
    <div>
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">저장된 템플릿</h3>
        {templates.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            저장된 템플릿이 없습니다.
          </p>
        ) : (
          <div className="space-y-4">
            {templates.map((template: EmailTemplate) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{template.title}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadTemplate(template)}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      사용하기
                    </button>
                    <button
                      onClick={() => deleteTemplate(template.id)}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  생성일: {new Date(template.createdAt).toLocaleDateString('ko-KR')}
                </p>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {template.content.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

// History Tab Component  
interface HistoryTabProps {
  emailHistory: EmailSent[]
  users: User[]
}

function HistoryTab({ emailHistory, users }: HistoryTabProps) {
  const getUserName = (email: string) => {
    const user = users.find((u: User) => u.email === email)
    return user ? user.name : email
  }

  return (
    <div>
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">발송 기록</h3>
        {emailHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            발송 기록이 없습니다.
          </p>
        ) : (
          <div className="space-y-4">
            {emailHistory.map((email: EmailSent) => (
              <div key={email.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{email.subject}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(email.sentAt).toLocaleDateString('ko-KR')} {new Date(email.sentAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">수신자 유형:</span> {
                    email.recipientType === 'all' ? '전체 회원' :
                    email.recipientType === 'members' ? '일반 회원' :
                    email.recipientType === 'crew' ? '크루원' : '선택한 회원'
                  } ({email.recipients.length}명)
                </div>
                <details className="text-sm">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                    수신자 목록 보기
                  </summary>
                  <div className="mt-2 pl-4 text-gray-600">
                    {email.recipients.map((recipientEmail, index) => (
                      <div key={index}>
                        {getUserName(recipientEmail)} ({recipientEmail})
                      </div>
                    ))}
                  </div>
                </details>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {email.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

// News Management Tab Component
interface NewsManagementTabProps {
  news: News[]
  setNews: React.Dispatch<React.SetStateAction<News[]>>
  currentUser: User
}

function NewsManagementTab({ news, setNews, currentUser }: NewsManagementTabProps) {
  const { showAlert } = useAlert()
  const [activeSubTab, setActiveSubTab] = useState<'list' | 'create' | 'edit'>('list')
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'news' as 'news' | 'notice',
    featured: false
  })

  const saveNews = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      showAlert('제목과 내용을 모두 입력해주세요.')
      return
    }

    if (editingNews) {
      // Update existing news
      const updatedNews = news.map(item => 
        item.id === editingNews.id 
          ? {
              ...item,
              title: formData.title,
              content: formData.content,
              category: formData.category,
              featured: formData.featured,
              updatedAt: new Date()
            }
          : item
      )
      setNews(updatedNews)
      localStorage.setItem('dream-house-news', JSON.stringify(updatedNews))
      showAlert('소식이 수정되었습니다.')
    } else {
      // Create new news
      const newNews: News = {
        id: `news_${Date.now()}`,
        title: formData.title,
        content: formData.content,
        category: formData.category,
        featured: formData.featured,
        createdAt: new Date()
      }
      const updatedNews = [newNews, ...news]
      setNews(updatedNews)
      localStorage.setItem('dream-house-news', JSON.stringify(updatedNews))
      showAlert('새 소식이 작성되었습니다.')
    }

    // Reset form
    setFormData({
      title: '',
      content: '',
      category: 'news',
      featured: false
    })
    setEditingNews(null)
    setActiveSubTab('list')
  }

  const editNews = (newsItem: News) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      category: newsItem.category,
      featured: newsItem.featured || false
    })
    setActiveSubTab('edit')
  }

  const deleteNews = (newsId: string) => {
    const updatedNews = news.filter(item => item.id !== newsId)
    setNews(updatedNews)
    localStorage.setItem('dream-house-news', JSON.stringify(updatedNews))
    showAlert('소식이 삭제되었습니다.')
  }

  const cancelEdit = () => {
    setEditingNews(null)
    setFormData({
      title: '',
      content: '',
      category: 'news',
      featured: false
    })
    setActiveSubTab('list')
  }

  return (
    <div>
      <h2 className="heading-2 mb-6">소식 & 공지 관리</h2>
      
      {/* Sub Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveSubTab('list')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              목록 관리
            </button>
            <button
              onClick={() => setActiveSubTab('create')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              새 글 작성
            </button>
          </nav>
        </div>
      </div>

      {activeSubTab === 'list' && (
        <NewsListTab 
          news={news} 
          onEdit={editNews} 
          onDelete={deleteNews} 
        />
      )}

      {(activeSubTab === 'create' || activeSubTab === 'edit') && (
        <NewsFormTab
          formData={formData}
          setFormData={setFormData}
          onSave={saveNews}
          onCancel={cancelEdit}
          isEditing={activeSubTab === 'edit'}
        />
      )}
    </div>
  )
}

// News List Tab Component
interface NewsListTabProps {
  news: News[]
  onEdit: (news: News) => void
  onDelete: (newsId: string) => void
}

function NewsListTab({ news, onEdit, onDelete }: NewsListTabProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">게시글 목록</h3>
        <span className="text-sm text-gray-500">총 {news.length}개</span>
      </div>
      
      {news.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          작성된 소식이 없습니다.
        </p>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.category === 'notice' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.category === 'notice' ? '공지' : '소식'}
                  </span>
                  {item.featured && (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      중요
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.content.substring(0, 150)}...
              </p>
              
              <div className="text-xs text-gray-500">
                작성일: {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                {item.updatedAt && (
                  <span className="ml-4">
                    수정일: {new Date(item.updatedAt).toLocaleDateString('ko-KR')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

// News Form Tab Component
interface NewsFormTabProps {
  formData: {
    title: string
    content: string
    category: 'news' | 'notice'
    featured: boolean
  }
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string
    content: string
    category: 'news' | 'notice'
    featured: boolean
  }>>
  onSave: () => void
  onCancel: () => void
  isEditing: boolean
}

function NewsFormTab({ formData, setFormData, onSave, onCancel, isEditing }: NewsFormTabProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {isEditing ? '글 수정' : '새 글 작성'}
      </h3>
      
      <div className="space-y-4">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            분류
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="news"
                checked={formData.category === 'news'}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'news' | 'notice' }))}
                className="mr-2"
              />
              소식
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="notice"
                checked={formData.category === 'notice'}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'news' | 'notice' }))}
                className="mr-2"
              />
              공지사항
            </label>
          </div>
        </div>

        {/* Featured Toggle */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">중요 표시</span>
          </label>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="input-field"
            placeholder="제목을 입력하세요"
          />
        </div>
        
        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className="textarea-field"
            rows={12}
            placeholder="내용을 입력하세요"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <Button
          onClick={onSave}
          disabled={!formData.title.trim() || !formData.content.trim()}
          className="btn-primary"
        >
          {isEditing ? '수정 완료' : '작성 완료'}
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
        >
          취소
        </Button>
      </div>
    </Card>
  )
}

// Inquiry Management Tab Component
interface InquiryManagementTabProps {
  generalInquiries: GeneralInquiry[]
  setGeneralInquiries: React.Dispatch<React.SetStateAction<GeneralInquiry[]>>
  donationInquiries: DonationInquiry[]
  setDonationInquiries: React.Dispatch<React.SetStateAction<DonationInquiry[]>>
  currentUser: User
}

function InquiryManagementTab({ 
  generalInquiries, 
  setGeneralInquiries, 
  donationInquiries, 
  setDonationInquiries, 
  currentUser 
}: InquiryManagementTabProps) {
  const { showAlert } = useAlert()
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'donation'>('general')
  const [selectedInquiry, setSelectedInquiry] = useState<GeneralInquiry | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [isReplying, setIsReplying] = useState(false)

  const addReply = (inquiryId: string) => {
    if (!replyContent.trim()) {
      showAlert('답변 내용을 입력해주세요.')
      return
    }

    const newReply = {
      id: `reply_${Date.now()}`,
      content: replyContent,
      author: currentUser.name,
      isOfficial: true,
      createdAt: new Date()
    }

    const updatedInquiries = generalInquiries.map(inquiry =>
      inquiry.id === inquiryId
        ? { ...inquiry, replies: [...(inquiry.replies || []), newReply] }
        : inquiry
    )

    setGeneralInquiries(updatedInquiries)
    localStorage.setItem('general-inquiries', JSON.stringify(updatedInquiries))
    
    setReplyContent('')
    setIsReplying(false)
    setSelectedInquiry(null)
    showAlert('답변이 등록되었습니다.')
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '교육프로그램':
        return 'bg-blue-100 text-blue-700'
      case '시설이용':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getDonationTypeColor = (type: string) => {
    switch (type) {
      case 'corporate':
        return 'bg-purple-100 text-purple-700'
      case 'material':
        return 'bg-orange-100 text-orange-700'
      case 'equipment':
        return 'bg-indigo-100 text-indigo-700'
      default:
        return 'bg-pink-100 text-pink-700'
    }
  }

  const getDonationTypeName = (type: string) => {
    switch (type) {
      case 'corporate':
        return '기업후원'
      case 'material':
        return '물품후원'
      case 'equipment':
        return '장비후원'
      default:
        return '개인후원'
    }
  }

  return (
    <div>
      <h2 className="heading-2 mb-6">문의 관리</h2>
      
      {/* Sub Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveSubTab('general')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              일반 문의 ({generalInquiries.length})
            </button>
            <button
              onClick={() => setActiveSubTab('donation')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'donation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              후원 문의 ({donationInquiries.length})
            </button>
          </nav>
        </div>
      </div>

      {activeSubTab === 'general' && (
        <GeneralInquiryListTab
          inquiries={generalInquiries}
          onReply={(inquiry) => {
            setSelectedInquiry(inquiry)
            setIsReplying(true)
          }}
          formatDate={formatDate}
          getCategoryColor={getCategoryColor}
        />
      )}

      {activeSubTab === 'donation' && (
        <DonationInquiryListTab
          inquiries={donationInquiries}
          formatDate={formatDate}
          getDonationTypeColor={getDonationTypeColor}
          getDonationTypeName={getDonationTypeName}
        />
      )}

      {/* Reply Modal */}
      {isReplying && selectedInquiry && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-4">문의 답변</h3>
            
            {/* 원본 문의 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(selectedInquiry.category)}`}>
                  {selectedInquiry.category}
                </span>
                <span className="text-sm text-gray-500">{formatDate(selectedInquiry.createdAt)}</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">{selectedInquiry.title}</h4>
              <p className="text-sm text-gray-700 mb-2">작성자: {selectedInquiry.name} ({selectedInquiry.email})</p>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.content}</p>
            </div>

            {/* 답변 입력 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  답변 내용
                </label>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="textarea-field"
                  rows={6}
                  placeholder="답변 내용을 입력하세요..."
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => addReply(selectedInquiry.id)}
                  disabled={!replyContent.trim()}
                  className="btn-primary"
                >
                  답변 등록
                </Button>
                <Button
                  onClick={() => {
                    setIsReplying(false)
                    setSelectedInquiry(null)
                    setReplyContent('')
                  }}
                  variant="outline"
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// General Inquiry List Tab Component
interface GeneralInquiryListTabProps {
  inquiries: GeneralInquiry[]
  onReply: (inquiry: GeneralInquiry) => void
  formatDate: (date: Date) => string
  getCategoryColor: (category: string) => string
}

function GeneralInquiryListTab({ inquiries, onReply, formatDate, getCategoryColor }: GeneralInquiryListTabProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">일반 문의 목록</h3>
        <span className="text-sm text-gray-500">총 {inquiries.length}개</span>
      </div>
      
      {inquiries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          등록된 문의가 없습니다.
        </p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(inquiry.category)}`}>
                    {inquiry.category}
                  </span>
                  {!inquiry.isPublic && (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                      비공개
                    </span>
                  )}
                  <span className="text-sm text-gray-500">{formatDate(inquiry.createdAt)}</span>
                </div>
                <button
                  onClick={() => onReply(inquiry)}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  답변하기
                </button>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{inquiry.title}</h4>
              <p className="text-sm text-gray-600 mb-3">
                작성자: {inquiry.name} ({inquiry.email})
              </p>
              <p className="text-gray-700 mb-3 whitespace-pre-wrap line-clamp-3">
                {inquiry.content}
              </p>
              
              {inquiry.replies && inquiry.replies.length > 0 && (
                <div className="border-t pt-3">
                  <p className="text-sm text-blue-600 mb-2">
                    답변 {inquiry.replies.length}개
                  </p>
                  <div className="space-y-2">
                    {inquiry.replies.map((reply) => (
                      <div key={reply.id} className="bg-blue-50 rounded p-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium text-blue-700">
                            {reply.author} (관리자)
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(reply.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

// Donation Inquiry List Tab Component
interface DonationInquiryListTabProps {
  inquiries: DonationInquiry[]
  formatDate: (date: Date) => string
  getDonationTypeColor: (type: string) => string
  getDonationTypeName: (type: string) => string
}

function DonationInquiryListTab({ inquiries, formatDate, getDonationTypeColor, getDonationTypeName }: DonationInquiryListTabProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">후원 문의 목록</h3>
        <span className="text-sm text-gray-500">총 {inquiries.length}개</span>
      </div>
      
      {inquiries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          등록된 후원 문의가 없습니다.
        </p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getDonationTypeColor(inquiry.donationType)}`}>
                    {getDonationTypeName(inquiry.donationType)}
                  </span>
                  <span className="text-sm text-gray-500">{formatDate(inquiry.createdAt)}</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">이름:</span> {inquiry.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">이메일:</span> {inquiry.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">연락처:</span> {inquiry.phone}
                  </p>
                </div>
                {inquiry.company && (
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">기업/단체명:</span> {inquiry.company}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">문의 내용:</p>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {inquiry.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

// Members Management Tab Component
interface MembersManagementTabProps {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

function MembersManagementTab({ users, setUsers }: MembersManagementTabProps) {
  const { showAlert } = useAlert()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'member' | 'crew' | 'admin'>('all')
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female' | 'other'>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isViewingDetail, setIsViewingDetail] = useState(false)

  // 회원 필터링
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesGender = filterGender === 'all' || user.gender === filterGender
    
    return matchesSearch && matchesRole && matchesGender
  })


  // 역할 변경
  const changeUserRole = (userId: string, newRole: 'member' | 'crew' | 'admin') => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    )
    setUsers(updatedUsers)
    localStorage.setItem('dream-house-users', JSON.stringify(updatedUsers))
    showAlert('회원 역할이 변경되었습니다.')
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700'
      case 'crew':
        return 'bg-emerald-100 text-emerald-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return '관리자'
      case 'crew':
        return '크루'
      default:
        return '일반회원'
    }
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male':
        return '남성'
      case 'female':
        return '여성'
      default:
        return '기타'
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  return (
    <div>
      <h2 className="heading-2 mb-6">회원 관리</h2>
      
      {/* 검색 및 필터 */}
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          {/* 검색 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              회원 검색
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 이메일, 전화번호로 검색"
              className="input-field"
            />
          </div>
          
          {/* 필터 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                회원 유형
              </label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as any)}
                className="input-field"
              >
                <option value="all">전체</option>
                <option value="member">일반회원</option>
                <option value="crew">크루</option>
                <option value="admin">관리자</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                성별
              </label>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value as any)}
                className="input-field"
              >
                <option value="all">전체</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* 회원 목록 */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">회원 목록</h3>
          <span className="text-sm text-gray-500">
            총 {filteredUsers.length}명 / 전체 {users.length}명
          </span>
        </div>
        
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            검색 결과가 없습니다.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    전화번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    성별
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    역할
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getGenderText(user.gender)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadge(user.role)}`}>
                        {getRoleName(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setIsViewingDetail(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* 회원 상세 보기 모달 */}
      {isViewingDetail && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-4">회원 상세 정보</h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">이름</p>
                  <p className="text-sm text-gray-900">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">성별</p>
                  <p className="text-sm text-gray-900">{getGenderText(selectedUser.gender)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">이메일</p>
                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">전화번호</p>
                  <p className="text-sm text-gray-900">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">가입 경로</p>
                  <p className="text-sm text-gray-900">{selectedUser.joinPath}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">가입일</p>
                  <p className="text-sm text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">첫 인상</p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {selectedUser.firstImpression}
                </p>
              </div>

              {/* 역할 변경 */}
              {selectedUser.id !== 'admin_default' && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">회원 역할</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        changeUserRole(selectedUser.id, 'member')
                        setSelectedUser({ ...selectedUser, role: 'member' })
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedUser.role === 'member'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      일반회원
                    </button>
                    <button
                      onClick={() => {
                        changeUserRole(selectedUser.id, 'crew')
                        setSelectedUser({ ...selectedUser, role: 'crew' })
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedUser.role === 'crew'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      크루
                    </button>
                    <button
                      onClick={() => {
                        changeUserRole(selectedUser.id, 'admin')
                        setSelectedUser({ ...selectedUser, role: 'admin' })
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedUser.role === 'admin'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      관리자
                    </button>
                  </div>
                </div>
              )}

              {/* 크루 상태 */}
              {selectedUser.role === 'crew' && (
                <div>
                  <p className="text-sm font-medium text-gray-500">크루 상태</p>
                  <p className="text-sm text-gray-900">
                    {selectedUser.crewStatus === 'approved' ? '승인됨' : 
                     selectedUser.crewStatus === 'pending' ? '대기중' : '거절됨'}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => {
                  setIsViewingDetail(false)
                  setSelectedUser(null)
                }}
                variant="outline"
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
