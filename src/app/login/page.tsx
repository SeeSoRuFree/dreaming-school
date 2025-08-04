'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {}

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const result = login(formData.email, formData.password)
      
      if (result.success) {
        alert(`환영합니다, ${result.user?.name}님!`)
        router.push('/')
      } else {
        setErrors({ password: result.error })
      }
    } catch {
      setErrors({ password: '로그인 중 오류가 발생했습니다.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="container-main section-padding">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="heading-1">로그인</h1>
          <p className="text-gray-600 mt-4">
            꿈을짓는학교에 오신 것을 환영합니다.
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일
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
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="비밀번호를 입력하세요"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <p className="text-sm text-gray-500 mt-1">
                비밀번호를 입력해주세요.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              계정이 없으신가요?
            </p>
            <Button
              variant="outline"
              onClick={() => router.push('/signup')}
              className="w-full"
            >
              회원가입하기
            </Button>
          </div>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">테스트 계정</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>관리자:</strong> admin@dreamhouse.coop / admin123</p>
            <p><strong>크루:</strong> crew1@example.com / crew123</p>
            <p><strong>일반 회원:</strong> member1@example.com / member123</p>
            <p><strong>신규 가입:</strong> 회원가입 후 로그인 가능</p>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs text-blue-600 mb-2">로그인이 안 될 경우:</p>
            <button
              onClick={() => {
                if (confirm('모든 데이터를 초기화하고 새로고침하시겠습니까?')) {
                  localStorage.clear()
                  window.location.reload()
                }
              }}
              className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              데이터 초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}