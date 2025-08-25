'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, News, GeneralInquiry, DonationInquiry } from '@/types'
import { mockNews, mockGeneralInquiries } from '@/lib/mock-data'
import { initializeAdminMockData } from '@/lib/admin-mock-data'
import { useAlert } from '@/hooks/useAlert'
import { CrewManagementTab } from './crew-management'
import { MediaManagementTab } from './media-management'
import { ExternalServicesTab } from './external-services'
import { NewsManagementTab } from './news-management'
import { InquiryManagementTab } from './inquiry-management'

export default function AdminPage() {
  const router = useRouter()
  const { isAdmin, isLoading: authLoading, logout } = useAdminAuth()
  const { showAlert } = useAlert()
  const [activeTab, setActiveTab] = useState<'news' | 'inquiry' | 'media' | 'external' | 'crew'>('news')
  const [users, setUsers] = useState<User[]>([])
  const [news, setNews] = useState<News[]>([])
  const [generalInquiries, setGeneralInquiries] = useState<GeneralInquiry[]>([])
  const [donationInquiries, setDonationInquiries] = useState<DonationInquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser] = useState<User>({
    id: 'admin',
    name: '관리자',
    email: 'admin@dreamschool.com',
    phone: '010-0000-0000',
    password: '',
    role: 'admin',
    gender: 'other',
    joinPath: 'system',
    firstImpression: '',
    createdAt: new Date()
  })

  useEffect(() => {
    if (authLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    const loadData = () => {
      try {
        // Initialize mock data for testing
        initializeAdminMockData()
        
        // Load users
        const usersData = localStorage.getItem('dream-house-users')
        if (usersData) {
          setUsers(JSON.parse(usersData))
        }

        // Load news
        const newsData = localStorage.getItem('dream-house-news')
        if (newsData) {
          setNews(JSON.parse(newsData))
        } else {
          localStorage.setItem('dream-house-news', JSON.stringify(mockNews))
          setNews(mockNews)
        }

        // Load general inquiries
        const generalInquiriesData = localStorage.getItem('general-inquiries')
        if (generalInquiriesData) {
          const parsedInquiries = JSON.parse(generalInquiriesData)
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
  }, [isAdmin, authLoading, router])


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

  if (!isAdmin) {
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


  return (
    <div className="container-main section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="heading-1">관리자 대시보드</h1>
              <p className="text-gray-600 mt-4">
                꿈을짓는학교의 전체 현황과 회원 관리를 위한 관리자 페이지입니다.
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-2">
              <button
                onClick={() => setActiveTab('news')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'news'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                소식/공지 관리
              </button>
              <button
                onClick={() => setActiveTab('inquiry')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'inquiry'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                문의 관리
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'media'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                영상/이미지 업로드
              </button>
              <button
                onClick={() => setActiveTab('external')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'external'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                메일/문자 관리
              </button>
              <button
                onClick={() => setActiveTab('crew')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
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

        {activeTab === 'media' && (
          <MediaManagementTab />
        )}

        {activeTab === 'external' && (
          <ExternalServicesTab />
        )}

        {activeTab === 'crew' && (
          <CrewManagementTab users={users} currentUser={currentUser} />
        )}

        {activeTab === 'news' && (
          <NewsManagementTab news={news} setNews={setNews} currentUser={currentUser} />
        )}

        {activeTab === 'inquiry' && (
          <InquiryManagementTab 
            generalInquiries={generalInquiries} 
            setGeneralInquiries={setGeneralInquiries}
            donationInquiries={donationInquiries}
            setDonationInquiries={setDonationInquiries}
            currentUser={currentUser} 
          />
        )}
      </div>
    </div>
  )
}

