'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  getProgramById,
  updateProgram,
  createProgramSession,
  updateProgramSession,
  deleteProgramSession,
  createSessionImage,
  deleteSessionImage,
  uploadImage,
  deleteImage
} from '@/lib/supabase'
import { Plus, Trash2, Upload, X, Save, GripVertical } from 'lucide-react'
import { useAlert } from '@/hooks/useAlert'
import { useConfirm } from '@/hooks/useConfirm'
import Link from 'next/link'

interface SessionImage {
  id?: string
  image_url: string
  order_num: number
  file?: File
  preview?: string
  isNew?: boolean
}

interface SessionForm {
  id?: string
  order_num: number
  title: string
  description: string
  images: SessionImage[]
  isNew?: boolean
}

export default function EditProgramPage() {
  const router = useRouter()
  const params = useParams()
  const { isAdmin, isLoading } = useAdminAuth()
  const { showAlert } = useAlert()
  const { showConfirm } = useConfirm()

  const [loading, setLoading] = useState(true)
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
  const [draggedSession, setDraggedSession] = useState<number | null>(null)

  useEffect(() => {
    if (isLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
    } else {
      loadProgram()
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

  const loadProgram = async () => {
    try {
      setLoading(true)
      const id = params.id as string
      const data = await getProgramById(id)

      setFormData({
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || '',
        target: data.target || '',
        duration: data.duration || '',
        max_participants: data.max_participants || '',
        fee: data.fee || '',
        location: data.location || '',
        category: data.category || 'building',
        is_active: data.is_active ?? true
      })

      if (data.sessions) {
        setSessions(
          data.sessions.map((s: any) => ({
            id: s.id,
            order_num: s.order_num,
            title: s.title,
            description: s.description || '',
            images: (s.images || []).map((img: any) => ({
              id: img.id,
              image_url: img.image_url,
              order_num: img.order_num
            }))
          }))
        )
      }
    } catch (error) {
      console.error(error)
      showAlert('프로그램을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddSession = () => {
    setSessions([
      ...sessions,
      {
        order_num: sessions.length + 1,
        title: '',
        description: '',
        images: [],
        isNew: true
      }
    ])
  }

  const handleRemoveSession = async (index: number) => {
    const session = sessions[index]

    if (session.id && !session.isNew) {
      const confirmed = await showConfirm({
        title: '세션 삭제',
        message: '정말로 이 세션을 삭제하시겠습니까?'
      })
      if (!confirmed) return
    }

    setSessions(sessions.filter((_, i) => i !== index).map((s, i) => ({ ...s, order_num: i + 1 })))
  }

  const handleSessionChange = (index: number, field: keyof SessionForm, value: string) => {
    const newSessions = [...sessions]
    newSessions[index] = { ...newSessions[index], [field]: value }
    setSessions(newSessions)
  }

  const handleImageAdd = (sessionIndex: number, file: File) => {
    const newSessions = [...sessions]
    const session = newSessions[sessionIndex]
    const preview = URL.createObjectURL(file)
    newSessions[sessionIndex] = {
      ...session,
      images: [
        ...session.images,
        {
          image_url: '',
          order_num: session.images.length + 1,
          file,
          preview,
          isNew: true
        }
      ]
    }
    setSessions(newSessions)
  }

  const handleImageRemove = async (sessionIndex: number, imageIndex: number) => {
    const image = sessions[sessionIndex].images[imageIndex]

    if (image.id && !image.isNew) {
      const confirmed = await showConfirm({
        title: '이미지 삭제',
        message: '정말로 이 이미지를 삭제하시겠습니까?'
      })
      if (!confirmed) return
    }

    // 메모리 해제
    if (image.preview) {
      URL.revokeObjectURL(image.preview)
    }

    const newSessions = [...sessions]
    newSessions[sessionIndex].images = newSessions[sessionIndex].images
      .filter((_, i) => i !== imageIndex)
      .map((img, i) => ({ ...img, order_num: i + 1 }))
    setSessions(newSessions)
  }

  const handleDragStart = (index: number) => {
    setDraggedSession(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedSession === null) return

    const newSessions = [...sessions]
    const [movedSession] = newSessions.splice(draggedSession, 1)
    newSessions.splice(dropIndex, 0, movedSession)

    const reordered = newSessions.map((session, index) => ({
      ...session,
      order_num: index + 1
    }))

    setSessions(reordered)
    setDraggedSession(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title) {
      showAlert('프로그램 제목을 입력해주세요.')
      return
    }

    setSaving(true)

    try {
      const programId = params.id as string

      // 1. 프로그램 기본 정보 업데이트
      await updateProgram(programId, formData)

      // 2. 세션 처리
      for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i]

        let sessionId = session.id

        if (session.isNew || !sessionId) {
          // 새 세션 생성
          const created = await createProgramSession({
            program_id: programId,
            order_num: session.order_num,
            title: session.title,
            description: session.description
          })
          sessionId = created.id
        } else {
          // 기존 세션 업데이트
          await updateProgramSession(sessionId, {
            order_num: session.order_num,
            title: session.title,
            description: session.description
          })
        }

        // 3. 이미지 처리
        if (sessionId) {
          for (let j = 0; j < session.images.length; j++) {
            const imageData = session.images[j]

            if (imageData.isNew && imageData.file) {
              // 새 이미지 업로드
              const imageUrl = await uploadImage(imageData.file, 'images', 'programs')
              if (imageUrl) {
                await createSessionImage({
                  session_id: sessionId,
                  image_url: imageUrl,
                  order_num: imageData.order_num
                })
              }
            }
          }
        }
      }

      showAlert('프로그램이 수정되었습니다.')
      router.push(`/admin/programs/${programId}`)
    } catch (error) {
      console.error(error)
      showAlert('프로그램 수정에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (isLoading || loading) {
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
          <h1 className="text-2xl font-bold">프로그램 수정</h1>
          <Link href={`/admin/programs/${params.id}`}>
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
                  <option value="building">한평집짓기</option>
                  <option value="model">모형집짓기</option>
                  <option value="gardening">원예</option>
                  <option value="science">과학창의</option>
                  <option value="rural">농촌활성화</option>
                  <option value="remodeling">공간재창조</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">대상</label>
                <input
                  type="text"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">기간</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">정원</label>
                <input
                  type="text"
                  value={formData.max_participants}
                  onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">비용</label>
                <input
                  type="text"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">장소</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                <div
                  key={sessionIndex}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                  draggable
                  onDragStart={() => handleDragStart(sessionIndex)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, sessionIndex)}
                >
                  <div className="flex items-start gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move mt-2" />
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-700 text-sm flex-shrink-0 mt-1">
                      {session.order_num}
                    </div>
                    <div className="flex-1 space-y-3">
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
                                ) : image.image_url ? (
                                  <img
                                    src={image.image_url}
                                    alt=""
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
                            id={`image-upload-edit-${sessionIndex}`}
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
                              document.getElementById(`image-upload-edit-${sessionIndex}`)?.click()
                            }}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            이미지 추가
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveSession(sessionIndex)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
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
            <Link href={`/admin/programs/${params.id}`}>
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
                  저장
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
