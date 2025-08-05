'use client'

import { useState } from 'react'
import { DonationInquiry } from '@/types'
import { useAlert } from '@/hooks/useAlert'

export default function DonationInquirySection() {
  const { showAlert } = useAlert()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    donationType: 'corporate' as 'corporate' | 'material' | 'equipment' | 'individual',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newInquiry: DonationInquiry = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date()
    }

    const saved = localStorage.getItem('donation-inquiries')
    const existing = saved ? JSON.parse(saved) : []
    const updated = [newInquiry, ...existing]
    localStorage.setItem('donation-inquiries', JSON.stringify(updated))
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      donationType: 'corporate',
      message: ''
    })
    
    showAlert('후원 문의가 접수되었습니다. 빠른 시일 내에 이메일로 연락드리겠습니다.')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="heading-2 mb-6">농촌 아이들의 교육 격차를 해결해주세요</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          도서지역 아이들이 도시 아이들과 동등한 교육 기회를 가질 수 있도록<br />
          여러분의 따뜻한 관심이 필요합니다
        </p>
      </div>

      {/* Crisis Statistics */}
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            교육 현실을 보여주는 통계
          </h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">3,829개</div>
            <div className="text-gray-700 font-medium">폐교된 학교</div>
            <p className="text-sm text-gray-500 mt-1">2022년까지</p>
          </div>
          
          <div className="text-center bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,424개</div>
            <div className="text-gray-700 font-medium">폐교 위기 학교</div>
            <p className="text-sm text-gray-500 mt-1">60명 이하 초등학교</p>
          </div>
          
          <div className="text-center bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">23%</div>
            <div className="text-gray-700 font-medium">위기 학교 비율</div>
            <p className="text-sm text-gray-500 mt-1">전국 초등학교 중</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            폐교 위기 지역에는 학원이나 교육 지원 기관이 거의 없어<br />
            아이들이 양질의 교육을 받기 어려운 상황입니다
          </p>
        </div>
      </div>

      {/* Solution & Vision */}
      <div className="bg-blue-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">
            꿈을짓는학교의 교육 솔루션
          </h3>
          <p className="text-gray-700 mb-6">
            2025년 공익법인 지정으로 투명하고 체계적인 후원 운영을 약속합니다
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h4 className="font-semibold text-blue-700 mb-3">교육희망 SOS</h4>
            <p className="text-sm text-gray-600">
              모르는 문제가 있을 때<br />
              전문가와 1:1 맞춤 지도
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h4 className="font-semibold text-emerald-700 mb-3">재능 발견 지원</h4>
            <p className="text-sm text-gray-600">
              음악, 미술, 체육 등<br />
              재능 개발 전문가 매칭
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className="font-semibold text-amber-700 mb-3">지역공동체 연결</h4>
            <p className="text-sm text-gray-600">
              지역 어르신과 아이들<br />
              서로 도움되는 멘토링
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-gray-700 italic">
            &ldquo;시골에서 늙어가고 있었는데, 아이들과 재능을 나누는 시간이<br />
            저에게 &lsquo;살아있구나&rsquo;라는 감동을 주었습니다.&rdquo;
          </p>
          <div className="text-sm text-gray-500 mt-2">- 시니어 봉사크루 참여자</div>
        </div>
      </div>

      {/* How to Support */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
          후원 참여 방법
        </h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">💰</div>
            <h4 className="font-semibold text-gray-800 mb-2">정기 후원</h4>
            <p className="text-sm text-gray-600">월 1만원부터 지속적인 교육 지원</p>
          </div>
          
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🛠️</div>
            <h4 className="font-semibold text-gray-800 mb-2">물품 후원</h4>
            <p className="text-sm text-gray-600">교육 도구, 자재 등 직접 지원</p>
          </div>
          
          <div className="text-center p-4">
            <div className="text-4xl mb-3">⏰</div>
            <h4 className="font-semibold text-gray-800 mb-2">재능 기부</h4>
            <p className="text-sm text-gray-600">시간과 재능으로 멘토링 참여</p>
          </div>
          
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🏢</div>
            <h4 className="font-semibold text-gray-800 mb-2">기업 협력</h4>
            <p className="text-sm text-gray-600">CSR 활동과 연계한 후원</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="card">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">후원 상담 신청</h3>
          <p className="text-gray-600 mb-6">
            아래 양식을 작성해 주시면 담당자가 빠르게 연락드리겠습니다
          </p>
        </div>
        
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연락처
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="input-field"
                placeholder="010-1234-5678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                회사/단체명
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="input-field"
                placeholder="개인 후원의 경우 비워두세요"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              후원 유형 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: 'corporate', label: '기업 후원', icon: '🏢' },
                { value: 'material', label: '자재 후원', icon: '🧱' },
                { value: 'equipment', label: '공구 후원', icon: '🔨' },
                { value: 'individual', label: '개인 후원', icon: '💖' }
              ].map((type) => (
                <label key={type.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="donationType"
                    value={type.value}
                    checked={formData.donationType === type.value}
                    onChange={(e) => setFormData({...formData, donationType: e.target.value as 'corporate' | 'material' | 'equipment' | 'individual'})}
                    className="sr-only"
                  />
                  <div className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                    formData.donationType === type.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="text-xl mb-1">{type.icon}</div>
                    <div className="text-sm font-medium">{type.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              문의 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="textarea-field"
              rows={5}
              placeholder="후원 규모, 후원 방식, 기대하시는 협력 방안 등을 자세히 알려주세요."
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-4 text-center">
              후원자 혜택
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                <span>기부금 영수증 발급</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                <span>투명한 사용내역 공개</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                <span>정기 소식지 발송</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                <span>교육 현장 참관 기회</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full text-lg py-3">
            후원 상담 신청하기
          </button>
        </form>
      </div>

      {/* Final Call to Action */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 text-blue-800">
          함께 만드는 변화
        </h3>
        <p className="text-blue-700 text-lg mb-6 max-w-2xl mx-auto">
          당신의 작은 관심이 농촌 아이들에게는 큰 희망이 됩니다<br />
          지금 바로 후원 상담을 신청해 보세요
        </p>
        
        <div className="bg-white text-gray-800 rounded-lg p-6 max-w-md mx-auto shadow-sm">
          <div className="font-bold text-lg mb-2">📞 상담 전화</div>
          <div className="text-2xl font-bold text-blue-600 mb-2">010-0000-0000</div>
          <div className="text-sm text-gray-600">
            평일 9:00~18:00 | 주말 상담 가능
          </div>
        </div>
      </div>
    </div>
  )
}