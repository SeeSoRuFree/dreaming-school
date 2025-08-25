'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAlert } from '@/hooks/useAlert'

const ADMIN_CREDENTIALS = {
  email: 'admin@dreamschool.com',
  password: 'dream2024admin'
}

export default function AdminLoginPage() {
  const router = useRouter()
  const { showAlert } = useAlert()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.email === ADMIN_CREDENTIALS.email && 
        formData.password === ADMIN_CREDENTIALS.password) {
      // 관리자 로그인 성공
      localStorage.setItem('adminAuth', JSON.stringify({
        isAdmin: true,
        loginTime: new Date().toISOString()
      }))
      router.push('/admin')
    } else {
      showAlert('이메일 또는 비밀번호가 올바르지 않습니다.', 'error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              관리자 로그인
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              꿈을 짓는 학교 관리자 시스템
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                관리자 이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-colors"
            >
              로그인
            </button>
          </form>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800 font-medium mb-1">보안 안내</p>
            <p className="text-xs text-amber-700">
              관리자 계정은 권한이 있는 담당자만 사용할 수 있습니다.
              무단 접근 시 법적 책임을 물을 수 있습니다.
            </p>
          </div>

          {/* 개발용 테스트 계정 자동 입력 */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">테스트 계정</p>
            <button
              type="button"
              onClick={() => setFormData({
                email: ADMIN_CREDENTIALS.email,
                password: ADMIN_CREDENTIALS.password
              })}
              className="w-full py-2 px-4 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              테스트 계정 자동 입력
            </button>
            <p className="text-xs text-blue-700 mt-2">
              이메일: {ADMIN_CREDENTIALS.email}<br/>
              비밀번호: {ADMIN_CREDENTIALS.password}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}