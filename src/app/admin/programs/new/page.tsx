'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  createProgram,
  createProgramSession,
  createSessionImage,
  uploadImage
} from '@/lib/supabase'
import { Plus, Trash2, Upload, X, Save } from 'lucide-react'
import { useAlert } from '@/hooks/useAlert'
import Link from 'next/link'

interface SessionForm {
  title: string
  description: string
  images: { file?: File; url?: string; preview?: string }[]
}

export default function NewProgramPage() {
  const router = useRouter()
  const { isAdmin, isLoading } = useAdminAuth()
  const { showAlert } = useAlert()

  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    target: '',
    duration: '',
    max_participants: '',
    fee: '',
    location: '',
    category: 'building',
    is_active: true
  })

  const [sessions, setSessions] = useState<SessionForm[]>([])

  useEffect(() => {
    if (isLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [isAdmin, isLoading, router])

  // 컴포넌트 언마운트 시 메모리 해제
  useEffect(() => {
    return () => {
      sessions.forEach(session => {
        session.images.forEach(image => {
          if (image.preview) {
            URL.revokeObjectURL(image.preview)
          }
        })
      })
    }
  }, [sessions])

  const handleAddSession = () => {
    setSessions([...sessions, { title: '', description: '', images: [] }])
  }

  const handleRemoveSession = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index))
  }

  const handleSessionChange = (index: number, field: keyof SessionForm, value: string) => {
    const newSessions = [...sessions]
    newSessions[index] = { ...newSessions[index], [field]: value }
    setSessions(newSessions)
  }

  const handleImageAdd = (sessionIndex: number, file: File) => {
    const newSessions = [...sessions]
    const preview = URL.createObjectURL(file)
    newSessions[sessionIndex].images.push({ file, preview })
    setSessions(newSessions)
  }

  const handleImageRemove = (sessionIndex: number, imageIndex: number) => {
    const newSessions = [...sessions]
    const image = newSessions[sessionIndex].images[imageIndex]
    // 메모리 해제
    if (image.preview) {
      URL.revokeObjectURL(image.preview)
    }
    newSessions[sessionIndex].images = newSessions[sessionIndex].images.filter((_, i) => i !== imageIndex)
    setSessions(newSessions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title) {
      showAlert('프로그램 제목을 입력해주세요.')
      return
    }

    setSaving(true)

    try {
      // 1. 프로그램 생성
      const program = await createProgram(formData)

      // 2. 세션 생성
      for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i]
        if (!session.title) continue

        const createdSession = await createProgramSession({
          program_id: program.id,
          order_num: i + 1,
          title: session.title,
          description: session.description
        })

        // 3. 이미지 업로드 및 세션 이미지 등록
        for (let j = 0; j < session.images.length; j++) {
          const imageData = session.images[j]
          if (imageData.file) {
            const imageUrl = await uploadImage(imageData.file, 'images', 'programs')
            await createSessionImage({
              session_id: createdSession.id,
              image_url: imageUrl,
              order_num: j + 1
            })
          }
        }
      }

      showAlert('프로그램이 등록되었습니다.')
      router.push('/admin/programs')
    } catch (error) {
      console.error(error)
      showAlert('프로그램 등록에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">새 프로그램 등록</h1>
          <Link href="/admin/programs">
            <Button variant="outline">
              <X className="w-4 h-4 mr-2" />
              취소
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">기본 정보</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  프로그램 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">부제목</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="building">집짓기</option>
                  <option value="gardening">원예</option>
                  <option value="science">과학창의</option>
                  <option value="rural">농촌활성화</option>
                  <option value="remodeling">리모델링</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">대상</label>
                <input
                  type="text"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="예: 초등학생"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">기간</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="예: 8주"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">정원</label>
                <input
                  type="text"
                  value={formData.max_participants}
                  onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="예: 20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">비용</label>
                <input
                  type="text"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="예: 무료"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">장소</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="예: 꿈을짓는학교"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">프로그램 활성화</span>
                </label>
              </div>
            </div>
          </Card>

          {/* 세션 관리 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">주차별 커리큘럼</h2>
              <Button type="button" onClick={handleAddSession} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                세션 추가
              </Button>
            </div>

            <div className="space-y-4">
              {sessions.map((session, sessionIndex) => (
                <div key={sessionIndex} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">세션 {sessionIndex + 1}</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveSession(sessionIndex)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">제목</label>
                      <input
                        type="text"
                        value={session.title}
                        onChange={(e) => handleSessionChange(sessionIndex, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">설명</label>
                      <textarea
                        value={session.description}
                        onChange={(e) => handleSessionChange(sessionIndex, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">이미지</label>
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2">
                          {session.images.map((image, imageIndex) => (
                            <div key={imageIndex} className="relative aspect-square group">
                              {image.preview ? (
                                <img
                                  src={image.preview}
                                  alt={image.file?.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-600 p-2">
                                  {image.file?.name}
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => handleImageRemove(sessionIndex, imageIndex)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          id={`image-upload-${sessionIndex}`}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageAdd(sessionIndex, file)
                            e.target.value = ''
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            document.getElementById(`image-upload-${sessionIndex}`)?.click()
                          }}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          이미지 추가
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {sessions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  세션을 추가해주세요.
                </div>
              )}
            </div>
          </Card>

          <div className="flex justify-end gap-2">
            <Link href="/admin/programs">
              <Button type="button" variant="outline">
                취소
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  등록하기
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
