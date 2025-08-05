'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, VisitStats, EmailSent, EmailTemplate, CrewApplication } from '@/types'
import { authUtils } from '@/lib/auth'
import { useAlert } from '@/hooks/useAlert'
import { CrewManagementTab } from './crew-management'

interface StatsPeriod {
  label: string
  value: 'today' | 'week' | 'month' | 'custom'
}

const statsPeriods: StatsPeriod[] = [
  { label: '오늘', value: 'today' },
  { label: '이번 주', value: 'week' },
  { label: '이번 달', value: 'month' },
  { label: '기간 설정', value: 'custom' }
]

export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated, isAdmin, isLoading: authLoading } = useAuth()
  const { showAlert } = useAlert()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'mailing' | 'crew'>('dashboard')
  const [users, setUsers] = useState<User[]>([])
  const [visitStats, setVisitStats] = useState<VisitStats[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState<StatsPeriod['value']>('today')
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' })
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

    const generateMockVisitStats = () => {
      const stats: VisitStats[] = []
      const today = new Date()
      
      // Generate stats for the last 30 days
      for (let i = 30; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        stats.push({
          id: `stats_${i}`,
          date: date.toISOString().split('T')[0],
          visits: Math.floor(Math.random() * 50) + 20,
          uniqueVisitors: Math.floor(Math.random() * 40) + 15,
          pageViews: Math.floor(Math.random() * 150) + 50
        })
      }
      
      setVisitStats(stats)
      localStorage.setItem('admin-visit-stats', JSON.stringify(stats))
    }

    const loadData = () => {
      try {
        // Load users
        const usersData = localStorage.getItem('dream-house-users')
        if (usersData) {
          setUsers(JSON.parse(usersData))
        }

        // Load or generate visit stats
        const statsData = localStorage.getItem('admin-visit-stats')
        if (statsData) {
          setVisitStats(JSON.parse(statsData))
        } else {
          generateMockVisitStats()
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load admin data:', error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [isAuthenticated, isAdmin, authLoading, router])

  const getFilteredStats = () => {
    const today = new Date()
    let startDate = new Date()
    let endDate = new Date()

    switch (selectedPeriod) {
      case 'today':
        startDate = new Date(today.toISOString().split('T')[0])
        endDate = new Date(today.toISOString().split('T')[0])
        break
      case 'week':
        startDate = new Date(today)
        startDate.setDate(today.getDate() - 7)
        break
      case 'month':
        startDate = new Date(today)
        startDate.setDate(today.getDate() - 30)
        break
      case 'custom':
        if (customDateRange.start && customDateRange.end) {
          startDate = new Date(customDateRange.start)
          endDate = new Date(customDateRange.end)
        }
        break
    }

    return visitStats.filter(stat => {
      const statDate = new Date(stat.date)
      return statDate >= startDate && statDate <= endDate
    })
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

  const getVisitSummary = () => {
    const filteredStats = getFilteredStats()
    const totalVisits = filteredStats.reduce((sum, stat) => sum + stat.visits, 0)
    const totalUniqueVisitors = filteredStats.reduce((sum, stat) => sum + stat.uniqueVisitors, 0)
    const totalPageViews = filteredStats.reduce((sum, stat) => sum + stat.pageViews, 0)
    const avgDaily = filteredStats.length > 0 ? Math.round(totalVisits / filteredStats.length) : 0

    return {
      totalVisits,
      totalUniqueVisitors,
      totalPageViews,
      avgDaily,
      days: filteredStats.length
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
  const visitSummary = getVisitSummary()

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
            </nav>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <DashboardTab
            userStats={userStats}
            visitSummary={visitSummary}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            customDateRange={customDateRange}
            setCustomDateRange={setCustomDateRange}
            statsPeriods={statsPeriods}
            visitStats={getFilteredStats()}
          />
        )}

        {activeTab === 'mailing' && (
          <MailingTab users={users} currentUser={user!} />
        )}

        {activeTab === 'crew' && (
          <CrewManagementTab users={users} currentUser={user!} />
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
  visitSummary: {
    totalVisits: number
    totalUniqueVisitors: number
    totalPageViews: number
    avgDaily: number
    days: number
  }
  selectedPeriod: StatsPeriod['value']
  setSelectedPeriod: (period: StatsPeriod['value']) => void
  customDateRange: { start: string; end: string }
  setCustomDateRange: React.Dispatch<React.SetStateAction<{ start: string; end: string }>>
  statsPeriods: StatsPeriod[]
  visitStats: VisitStats[]
}

function DashboardTab({
  userStats,
  visitSummary,
  selectedPeriod,
  setSelectedPeriod,
  customDateRange,
  setCustomDateRange,
  statsPeriods,
  visitStats
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

      {/* Visit Statistics */}
      <div>
        <h2 className="heading-2 mb-6">방문 통계</h2>
        
        {/* Period Selector */}
        <Card className="p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-sm font-medium text-gray-700">기간 선택:</span>
            {statsPeriods.map(period => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
          
          {selectedPeriod === 'custom' && (
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">시작일</label>
                <input
                  type="date"
                  value={customDateRange.start}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">종료일</label>
                <input
                  type="date"
                  value={customDateRange.end}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>
          )}
        </Card>

        {/* Visit Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{visitSummary.totalVisits}</p>
              <p className="text-sm text-gray-600 mt-1">총 방문수</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">{visitSummary.totalUniqueVisitors}</p>
              <p className="text-sm text-gray-600 mt-1">순 방문자</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600">{visitSummary.totalPageViews}</p>
              <p className="text-sm text-gray-600 mt-1">페이지뷰</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{visitSummary.avgDaily}</p>
              <p className="text-sm text-gray-600 mt-1">일평균 방문</p>
            </div>
          </Card>
        </div>

        {/* Visit Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">방문 추이</h3>
          <div className="h-64 flex items-end space-x-1 overflow-x-auto">
            {visitStats.map((stat) => (
              <div key={stat.id} className="flex-shrink-0 flex flex-col items-center">
                <div 
                  className="bg-blue-500 rounded-t w-8 min-h-[4px] hover:bg-blue-600 transition-colors relative group"
                  style={{ height: `${(stat.visits / Math.max(...visitStats.map(s => s.visits))) * 200}px` }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {stat.visits}회 방문
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                  {new Date(stat.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
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
