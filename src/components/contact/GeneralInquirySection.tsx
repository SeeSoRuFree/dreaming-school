'use client'

import { useState } from 'react'
import { useAlert } from '@/hooks/useAlert'
import { Search } from 'lucide-react'
import { createInquiry } from '@/lib/supabase'

export default function GeneralInquirySection() {
  const { showAlert } = useAlert()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createInquiry({
        type: 'general',
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message
      })

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
      showAlert('문의가 등록되었습니다.')
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '문의 등록 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="heading-2">일반 문의</h2>
        <p className="body-text text-gray-600 mt-2">
          교육프로그램, 시설이용 등 궁금한 사항을 문의해 주세요
        </p>
      </div>

      {/* Form */}
      <div className="card">
        <h3 className="heading-4 mb-6">문의하기</h3>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
          </div>

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
              disabled={isSubmitting}
            />
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
              placeholder="문의하실 내용을 자세히 작성해 주세요."
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '문의하기'}
            </button>
          </div>
        </form>
      </div>

      {/* Contact Info */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">문의 안내</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• 접수된 문의는 담당자가 확인 후 이메일로 답변드립니다.</p>
          <p>• 영업일 기준 1-2일 이내 답변드리겠습니다.</p>
          <p>• 긴급한 사항은 전화로 문의해 주시기 바랍니다.</p>
        </div>
      </div>
    </div>
  )
}