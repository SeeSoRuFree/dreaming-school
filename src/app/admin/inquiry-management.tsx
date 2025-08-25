'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { GeneralInquiry, DonationInquiry, User } from '@/types'

interface InquiryManagementTabProps {
  generalInquiries: GeneralInquiry[]
  setGeneralInquiries: React.Dispatch<React.SetStateAction<GeneralInquiry[]>>
  donationInquiries: DonationInquiry[]
  setDonationInquiries: React.Dispatch<React.SetStateAction<DonationInquiry[]>>
  currentUser: User
}

export function InquiryManagementTab({ 
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
    return new Date(date).toLocaleDateString('ko-KR', {
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