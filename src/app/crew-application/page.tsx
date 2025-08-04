'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CrewApplication } from '@/types'

interface CrewApplicationFormData {
  motivation: string
  experience: string
  availableTime: string
  skills: string[]
}

const skillOptions = [
  '목공 작업',
  '원예 활동',
  'IT/컴퓨터',
  '교육 및 강의',
  '사진/영상 촬영',
  '디자인',
  '요리',
  '청소 및 정리',
  '운전',
  '번역',
  '기타'
]

export default function CrewApplicationPage() {
  const router = useRouter()
  const { user, isAuthenticated, updateUser, isLoading: authLoading } = useAuth()
  const [formData, setFormData] = useState<CrewApplicationFormData>({
    motivation: '',
    experience: '',
    availableTime: '',
    skills: []
  })
  const [errors, setErrors] = useState<Partial<CrewApplicationFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return

    if (!isAuthenticated) {
      alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    if (user?.crewStatus) {
      alert('이미 크루 봉사자 신청을 하셨습니다.')
      router.push('/crew-application-status')
      return
    }
  }, [isAuthenticated, user, authLoading, router])

  const validateForm = (): boolean => {
    const newErrors: Partial<CrewApplicationFormData> = {}

    if (!formData.motivation.trim()) {
      newErrors.motivation = '지원 동기를 입력해주세요.'
    }

    if (!formData.experience.trim()) {
      newErrors.experience = '관련 경험을 입력해주세요.'
    }

    if (!formData.availableTime.trim()) {
      newErrors.availableTime = '가능한 활동 시간을 입력해주세요.'
    }

    if (formData.skills.length === 0) {
      newErrors.skills = '하나 이상의 스킬을 선택해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !user) return

    setIsSubmitting(true)

    try {
      // Create crew application
      const application: CrewApplication = {
        id: `crew_app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        ...formData,
        status: 'pending',
        appliedAt: new Date()
      }

      // Save to localStorage
      const applications = JSON.parse(localStorage.getItem('crew-applications') || '[]')
      applications.push(application)
      localStorage.setItem('crew-applications', JSON.stringify(applications))

      // Update user status
      updateUser({ crewStatus: 'pending' })

      alert('크루 봉사자 신청이 완료되었습니다! 승인 결과를 기다려주세요.')
      router.push('/crew-application-status')
    } catch {
      alert('신청 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CrewApplicationFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const toggleSkill = (skill: string) => {
    const newSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill]
    
    handleInputChange('skills', newSkills)
  }

  if (authLoading) {
    return (
      <div className="container-main section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container-main section-padding">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="heading-1">크루 봉사자 신청</h1>
          <p className="text-gray-600 mt-4">
            꿈을짓는학교와 함께 활동할 크루 봉사자로 신청해주세요.<br />
            여러분의 재능과 열정을 기다리고 있습니다.
          </p>
        </div>

        <Card className="p-8">
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">신청자 정보</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>이름:</strong> {user.name}</p>
              <p><strong>이메일:</strong> {user.email}</p>
              <p><strong>연락처:</strong> {user.phone}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                지원 동기 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                rows={4}
                className={`textarea-field ${errors.motivation ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="크루 봉사자로 활동하고 싶은 이유를 자세히 작성해주세요."
              />
              {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                관련 경험 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                rows={4}
                className={`textarea-field ${errors.experience ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="봉사활동, 교육 경험, 관련 프로젝트 등을 작성해주세요. 경험이 없어도 괜찮습니다."
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>

            <div>
              <label htmlFor="availableTime" className="block text-sm font-medium text-gray-700 mb-2">
                가능한 활동 시간 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="availableTime"
                value={formData.availableTime}
                onChange={(e) => handleInputChange('availableTime', e.target.value)}
                rows={3}
                className={`textarea-field ${errors.availableTime ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="예: 주말 오전, 평일 저녁, 월 2-3회 등"
              />
              {errors.availableTime && <p className="text-red-500 text-sm mt-1">{errors.availableTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                보유 기술/관심 분야 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillOptions.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">크루 봉사자 혜택</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 크루들의 방 (전용 소통 공간) 이용</li>
                <li>• 다양한 교육 프로그램 우선 참여</li>
                <li>• 정기 모임 및 워크숍 참가</li>
                <li>• 봉사활동 인증서 발급</li>
                <li>• 네트워킹 및 성장 기회 제공</li>
              </ul>
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
                {isSubmitting ? '신청 중...' : '크루 봉사자 신청하기'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}