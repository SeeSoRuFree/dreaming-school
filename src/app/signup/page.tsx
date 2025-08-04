'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  gender: 'male' | 'female' | 'other'
  joinPath: string
  firstImpression: string
}

export default function SignupPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: 'male',
    joinPath: '',
    firstImpression: ''
  })
  const [errors, setErrors] = useState<Partial<SignupFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = '성명을 입력해주세요.'
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상 입력해주세요.'
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.'
    } else if (!/^010-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처 형식을 입력해주세요. (예: 010-1234-5678)'
    }

    if (!formData.joinPath.trim()) {
      newErrors.joinPath = '가입하게 된 경로를 입력해주세요.'
    }

    if (!formData.firstImpression.trim()) {
      newErrors.firstImpression = '꿈을짓는학교에 대한 첫 인상을 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const { confirmPassword: _, ...registerData } = formData
      const result = register(registerData)
      
      if (result.success) {
        const shouldApplyCrew = confirm('회원가입이 완료되었습니다! 크루 봉사자 신청을 하시겠습니까?')
        if (shouldApplyCrew) {
          router.push('/crew-application')
        } else {
          router.push('/')
        }
      } else {
        alert(result.error || '회원가입 중 오류가 발생했습니다.')
      }
    } catch {
      alert('회원가입 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="container-main section-padding">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="heading-1">회원가입</h1>
          <p className="text-gray-600 mt-4">
            꿈을짓는학교 사회적협동조합에 오신 것을 환영합니다.<br />
            아래 정보를 입력하여 조합원으로 가입해주세요.
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                성명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="실명을 입력해주세요"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="example@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="6자 이상 입력해주세요"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`input-field ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="비밀번호를 다시 입력해주세요"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="010-1234-5678"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                성별 <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female' | 'other')}
                className="input-field"
              >
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div>
              <label htmlFor="joinPath" className="block text-sm font-medium text-gray-700 mb-2">
                가입하게 된 경로 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="joinPath"
                value={formData.joinPath}
                onChange={(e) => handleInputChange('joinPath', e.target.value)}
                className={`input-field ${errors.joinPath ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="예: 지인 소개, 인터넷 검색, SNS 등"
              />
              {errors.joinPath && <p className="text-red-500 text-sm mt-1">{errors.joinPath}</p>}
            </div>

            <div>
              <label htmlFor="firstImpression" className="block text-sm font-medium text-gray-700 mb-2">
                꿈을짓는학교를 처음 보고 느낀 점 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="firstImpression"
                value={formData.firstImpression}
                onChange={(e) => handleInputChange('firstImpression', e.target.value)}
                rows={4}
                className={`textarea-field ${errors.firstImpression ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="꿈을짓는학교에 대한 첫 인상이나 기대하는 점을 자유롭게 작성해주세요."
              />
              {errors.firstImpression && <p className="text-red-500 text-sm mt-1">{errors.firstImpression}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                이전으로
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1"
              >
                {isSubmitting ? '가입 중...' : '회원가입 완료'}
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-blue-700 hover:underline font-medium"
            >
              로그인하기
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}