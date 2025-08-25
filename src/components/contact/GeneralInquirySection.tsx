'use client'

import { useState, useEffect } from 'react'
import { GeneralInquiry } from '@/types'
import { mockGeneralInquiries } from '@/lib/mock-data'
import { useAlert } from '@/hooks/useAlert'
import { Search } from 'lucide-react'

export default function GeneralInquirySection() {
  const { showAlert } = useAlert()
  const [inquiries, setInquiries] = useState<GeneralInquiry[]>([])
  // showForm 상태 제거 - 항상 펼쳐져 있도록
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    content: '',
    category: '교육프로그램' as '교육프로그램' | '시설이용' | '기타',
    isPublic: true
  })

  useEffect(() => {
    const saved = localStorage.getItem('general-inquiries')
    if (saved) {
      setInquiries(JSON.parse(saved))
    } else {
      setInquiries(mockGeneralInquiries)
      localStorage.setItem('general-inquiries', JSON.stringify(mockGeneralInquiries))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newInquiry: GeneralInquiry = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      replies: []
    }

    const updated = [newInquiry, ...inquiries]
    setInquiries(updated)
    localStorage.setItem('general-inquiries', JSON.stringify(updated))
    
    setFormData({
      name: '',
      email: '',
      title: '',
      content: '',
      category: '교육프로그램',
      isPublic: true
    })
    showAlert('문의가 등록되었습니다.')
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // 검색 필터링
  const filteredInquiries = inquiries.filter(inquiry => {
    if (!inquiry.isPublic) return false
    if (searchQuery === '') return true
    
    const searchLower = searchQuery.toLowerCase()
    return (
      inquiry.title.toLowerCase().includes(searchLower) ||
      inquiry.content.toLowerCase().includes(searchLower) ||
      inquiry.name.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="heading-2">일반 문의</h2>
        <p className="body-text text-gray-600 mt-2">
          교육프로그램, 시설이용 등 궁금한 사항을 게시판에 남겨주세요
        </p>
      </div>

      {/* Form - 항상 표시 */}
      <div className="card">
          <h3 className="heading-4 mb-6">새 문의 작성</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as '교육프로그램' | '시설이용' | '기타'})}
                className="input-field"
              >
                <option value="교육프로그램">교육프로그램</option>
                <option value="시설이용">시설이용</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="textarea-field"
                rows={5}
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">
                  다른 사람들이 볼 수 있도록 공개합니다
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary">
                등록하기
              </button>
            </div>
          </form>
      </div>

      {/* Search Section - Enhanced */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <h3 className="heading-3 text-blue-900">문의 내역 검색</h3>
          <p className="text-gray-600 mt-2">등록된 문의사항을 검색해보세요</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="제목, 내용, 작성자 이름으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 text-lg border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 shadow-md transition-all duration-200 hover:shadow-lg"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-500 w-6 h-6" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              총 <span className="font-semibold text-blue-700">{filteredInquiries.length}</span>개의 문의가 검색되었습니다
            </p>
            {searchQuery && (
              <p className="text-sm text-gray-500">
                &apos;{searchQuery}&apos; 검색 결과
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? '검색 결과가 없습니다.' : '아직 등록된 문의가 없습니다.'}
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
              <div key={inquiry.id} className="card hover-lift">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {inquiry.category}
                    </span>
                    <h3 className="font-semibold text-lg mt-2">{inquiry.title}</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(inquiry.createdAt)}
                  </span>
                </div>
                
                <div className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {inquiry.content}
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-3">
                  <span>작성자: {inquiry.name}</span>
                  {inquiry.replies && inquiry.replies.length > 0 && (
                    <span className="text-blue-600">
                      답변 {inquiry.replies.length}개
                    </span>
                  )}
                </div>

                {/* Replies */}
                {inquiry.replies && inquiry.replies.length > 0 && (
                  <div className="mt-4 space-y-3 border-t pt-4">
                    {inquiry.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-sm font-medium ${
                            reply.isOfficial ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            {reply.author}
                            {reply.isOfficial && <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">관리자</span>}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(reply.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  )
}