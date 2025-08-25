'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { CrewApplication } from '@/types'

export default function CrewApplicationPage() {
  const router = useRouter()
  const { showAlert } = useAlert()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // 개인정보 동의
    privacyConsent: '',
    // 기본 정보
    name: '',
    phone: '',
    email: '',
    gender: '',
    // 지원 정보
    motivation: '',
    questions: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사
    if (formData.privacyConsent !== '동의') {
      showAlert('개인정보 제공 및 활용에 동의해주세요.', '필수 항목')
      return
    }

    if (!formData.name || !formData.phone || !formData.email || !formData.gender || !formData.motivation) {
      showAlert('모든 필수 항목을 입력해주세요.', '입력 오류')
      return
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showAlert('올바른 이메일 주소를 입력해주세요.', '입력 오류')
      return
    }

    // 전화번호 형식 확인
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/
    if (!phoneRegex.test(formData.phone)) {
      showAlert('전화번호를 xxx-xxxx-xxxx 형식으로 입력해주세요.', '입력 오류')
      return
    }

    setIsSubmitting(true)

    try {
      // 비로그인 사용자를 위한 임시 사용자 생성
      const userId = `guest_${Date.now()}`
      
      // 크루 신청 생성
      const newApplication: CrewApplication = {
        id: `crew_app_${Date.now()}`,
        userId: userId,
        status: 'pending',
        appliedAt: new Date(),
        motivation: formData.motivation,
        experience: '', // 폼에서 경험 필드를 추가할 수도 있음
        availableTime: '', // 폼에서 활동 가능 시간 필드를 추가할 수도 있음
        skills: [], // 폼에서 기술 필드를 추가할 수도 있음
      }

      // 기존 신청 확인 (이메일 기준)
      const existingApplications = localStorage.getItem('crew-applications')
      const applications = existingApplications ? JSON.parse(existingApplications) : []
      
      // 이메일로 중복 신청 확인
      const existingUsers = localStorage.getItem('dream-house-users')
      const users = existingUsers ? JSON.parse(existingUsers) : []
      const hasExistingApplication = users.find(
        (user: any) => user.email === formData.email && user.crewStatus === 'pending'
      )
      
      if (hasExistingApplication) {
        showAlert('해당 이메일로 이미 대기 중인 크루 신청이 있습니다.', '중복 신청')
        return
      }

      // 신청 저장
      applications.push(newApplication)
      localStorage.setItem('crew-applications', JSON.stringify(applications))

      // 게스트 사용자 정보 생성 및 저장
      const newUser = {
        id: userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: '', // 게스트 사용자는 비밀번호 없음
        role: 'guest' as const,
        gender: formData.gender,
        crewStatus: 'pending' as const,
        joinPath: '크루 신청',
        firstImpression: formData.motivation,
        createdAt: new Date()
      }
      
      users.push(newUser)
      localStorage.setItem('dream-house-users', JSON.stringify(users))

      showAlert('크루 신청이 완료되었습니다. 검토 후 연락드리겠습니다.', '신청 완료')
      router.push('/')
    } catch (error) {
      console.error('Failed to submit crew application:', error)
      showAlert('신청 중 오류가 발생했습니다. 다시 시도해주세요.', '오류')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 shadow-xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              꿈을짓는학교 크루 신청서
            </h1>
            <p className="text-gray-600">
              꿈을짓는학교의 크루가 되어 함께 아이들의 꿈을 키워주세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 개인정보 동의 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">
                개인정보 제공 및 활용동의서 & 사진·영상촬영·초상의 이용 등 영상활용 동의서
              </h2>
              
              <div className="space-y-4 text-sm text-gray-700 mb-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h3 className="font-semibold mb-2">[개인정보 제공 및 활용동의서]</h3>
                  <p className="mb-2">
                    본인은 「꿈을짓는학교사회적협동조합」에서 추진하는 꿈을짓는학교사회적협동조합 크루활동 및 운영 업무의 원활한 진행을 위해
                    ｢개인정보보호법｣ 제15조 내지 제22조에 의거하여 아래의 내용과 같이 본인의 개인정보에 대한 제공 및 수집·이용에 동의합니다.
                  </p>
                  <p className="font-medium">
                    □ 개인정보 수집 항목<br/>
                    - 성명, 주소, 주민등록번호, 전화번호(휴대폰번호 포함), 이메일
                  </p>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200">
                  <h3 className="font-semibold mb-2">[사진·영상촬영·초상의 이용 등 영상활용 동의서]</h3>
                  <p className="mb-2">
                    프로그램의 원활한 운영을 위해 프로그램 강사, 참여자를 대상으로 아래와 같이 사진·영상촬영·초상의 이용 동의서를 수집하고자 합니다.
                  </p>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">1. 영상활용 목적</span><br/>
                      - 프로그램 진행<br/>
                      - 프로그램 홍보, 결과보고에 활용
                    </div>
                    <div>
                      <span className="font-medium">2. 영상촬영 대상 및 방법</span><br/>
                      - 강사·참여자의 초상, 음성, 성명, 창작물, 교육자료 등이 촬영될 수 있음
                    </div>
                    <div>
                      <span className="font-medium">3. 영상의 편집 등</span><br/>
                      - 2.항에서와 같이 촬영된 영상콘텐츠는 아래 4.항에 기재된 각 용도에 맞게 적절히 편집, 보정될 수 있음
                    </div>
                    <div>
                      <span className="font-medium">4. 영상콘텐츠 활용 방법</span><br/>
                      - 참여자에게 영상콘텐츠 파일 전송<br/>
                      - 도서관 홈페이지, 인스타그램, 블로그 등 온라인·모바일 플랫폼 일체에 업로드 될 수 있음<br/>
                      - 도서관 교육프로그램에 대한 보도자료, 홍보자료에 포함, 배포됨<br/>
                      - 도서관의 기록물로 보관, 관리됨
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-red-600">* 필수</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="privacyConsent"
                      value="동의"
                      checked={formData.privacyConsent === '동의'}
                      onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.value })}
                      className="mr-2"
                    />
                    동의
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="privacyConsent"
                      value="비동의"
                      checked={formData.privacyConsent === '비동의'}
                      onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.value })}
                      className="mr-2"
                    />
                    비동의
                  </label>
                </div>
              </div>
            </div>

            {/* 기본 정보 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  1. 크루님의 성함을 알려주세요 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="익명을 원하실 경우 '익명'이라고 적어주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2. 연락처를 적어주세요 <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  3. 메일주소를 적어주세요 <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  4. 크루님의 성별은? <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="mr-2"
                    />
                    남자
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="mr-2"
                    />
                    여자
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  5. 꿈을짓는학교 "봉사크루" 신청한 이유는? <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="지원 동기를 자유롭게 작성해주세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  (선택) 꿈을짓는학교 활동에 대한 궁금한점, 설명이 부족해서 이해가 잘 되지 않았던 점이 있다면 남겨주세요.
                </label>
                <textarea
                  value={formData.questions}
                  onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="궁금한 점이 있다면 작성해주세요. 개인톡이나 메일에서 설명해 드리겠습니다."
                />
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold shadow-lg"
              >
                {isSubmitting ? '제출 중...' : '신청서 제출'}
              </Button>
              <Button
                type="button"
                onClick={() => router.push('/')}
                variant="outline"
                className="px-8 py-3 text-lg"
              >
                취소
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}