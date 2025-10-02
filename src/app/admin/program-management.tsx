'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgramDetail, ProgramSession } from '@/types'
import { 
  getAllProgramDetails, 
  updateProgramDetail, 
  addProgramSession,
  updateProgramSession,
  deleteProgramSession,
  reorderProgramSessions 
} from '@/lib/program-data'
import { Pencil, Plus, Trash2, GripVertical, X, Save, Eye, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react'
import { useAlert } from '@/hooks/useAlert'
import { useConfirm } from '@/hooks/useConfirm'

export function ProgramManagementTab() {
  const [programs, setPrograms] = useState<ProgramDetail[]>([])
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null)
  const [editingProgram, setEditingProgram] = useState<ProgramDetail | null>(null)
  const [editingSession, setEditingSession] = useState<{ index: number; session: ProgramSession } | null>(null)
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())
  const [draggedSession, setDraggedSession] = useState<number | null>(null)
  const { showAlert } = useAlert()
  const { showConfirm } = useConfirm()

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = () => {
    const programList = getAllProgramDetails()
    setPrograms(programList)
  }

  const handleProgramEdit = (program: ProgramDetail) => {
    setEditingProgram({ ...program })
    setSelectedProgram(program)
  }

  const handleProgramSave = () => {
    if (!editingProgram) return

    const success = updateProgramDetail(editingProgram.id, editingProgram)
    if (success) {
      showAlert('프로그램이 성공적으로 수정되었습니다.')
      loadPrograms()
      setEditingProgram(null)
      setSelectedProgram(null)
    } else {
      showAlert('프로그램 수정에 실패했습니다.')
    }
  }

  const handleSessionAdd = () => {
    if (!editingProgram) return

    const newSession: ProgramSession = {
      order: editingProgram.sessions.length + 1,
      title: '새 세션',
      description: '',
      images: []
    }

    const updatedProgram = {
      ...editingProgram,
      sessions: [...editingProgram.sessions, newSession]
    }
    setEditingProgram(updatedProgram)
  }

  const handleSessionEdit = (index: number, session: ProgramSession) => {
    setEditingSession({ index, session: { ...session } })
  }

  const handleSessionSave = () => {
    if (!editingSession || !editingProgram) return

    const sessions = [...editingProgram.sessions]
    sessions[editingSession.index] = editingSession.session
    
    setEditingProgram({
      ...editingProgram,
      sessions
    })
    setEditingSession(null)
  }

  const handleSessionDelete = async (index: number) => {
    if (!editingProgram) return

    const confirmed = await showConfirm({
      title: '세션 삭제',
      message: '정말로 이 세션을 삭제하시겠습니까?'
    })
    if (!confirmed) return

    const sessions = editingProgram.sessions.filter((_, i) => i !== index)
      .map((session, i) => ({ ...session, order: i + 1 }))
    
    setEditingProgram({
      ...editingProgram,
      sessions
    })
  }

  const handleDragStart = (index: number) => {
    setDraggedSession(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedSession === null || !editingProgram) return

    const sessions = [...editingProgram.sessions]
    const [movedSession] = sessions.splice(draggedSession, 1)
    sessions.splice(dropIndex, 0, movedSession)
    
    const reorderedSessions = sessions.map((session, index) => ({
      ...session,
      order: index + 1
    }))
    
    setEditingProgram({
      ...editingProgram,
      sessions: reorderedSessions
    })
    setDraggedSession(null)
  }

  const handleImageUpload = (sessionIndex: number, imageUrl: string) => {
    if (!editingProgram) return

    const sessions = [...editingProgram.sessions]
    sessions[sessionIndex] = {
      ...sessions[sessionIndex],
      images: [...sessions[sessionIndex].images, imageUrl]
    }
    
    setEditingProgram({
      ...editingProgram,
      sessions
    })
  }

  const handleImageDelete = (sessionIndex: number, imageIndex: number) => {
    if (!editingProgram) return

    const sessions = [...editingProgram.sessions]
    sessions[sessionIndex] = {
      ...sessions[sessionIndex],
      images: sessions[sessionIndex].images.filter((_, i) => i !== imageIndex)
    }
    
    setEditingProgram({
      ...editingProgram,
      sessions
    })
  }

  const toggleProgramExpand = (programId: string) => {
    const newExpanded = new Set(expandedPrograms)
    if (newExpanded.has(programId)) {
      newExpanded.delete(programId)
    } else {
      newExpanded.add(programId)
    }
    setExpandedPrograms(newExpanded)
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      building: '집짓기',
      gardening: '원예',
      science: '과학창의',
      rural: '농촌활성화',
      remodeling: '리모델링'
    }
    return labels[category] || category
  }

  return (
    <div className="space-y-6">
      {/* 프로그램 목록 */}
      {!editingProgram && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">교육프로그램 관리</h2>
          
          {programs.map(program => (
            <Card key={program.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{program.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {getCategoryLabel(program.category)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{program.subtitle}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>대상: {program.target}</span>
                    <span>기간: {program.duration}</span>
                    <span>정원: {program.max_participants}명</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleProgramExpand(program.id)}
                  >
                    {expandedPrograms.has(program.id) ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        접기
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        세션 보기 ({program.sessions.length})
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleProgramEdit(program)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    수정
                  </Button>
                </div>
              </div>
              
              {/* 세션 목록 미리보기 */}
              {expandedPrograms.has(program.id) && (
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-2">
                    {program.sessions.map((session, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-medium text-xs">
                          {session.order}
                        </span>
                        <span className="flex-1">{session.title}</span>
                        <span className="text-gray-500">이미지 {session.images.length}개</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* 프로그램 편집 폼 */}
      {editingProgram && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">프로그램 수정</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingProgram(null)
                  setSelectedProgram(null)
                }}
              >
                <X className="w-4 h-4 mr-1" />
                취소
              </Button>
              <Button onClick={handleProgramSave}>
                <Save className="w-4 h-4 mr-1" />
                저장
              </Button>
            </div>
          </div>

          {/* 기본 정보 */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">기본 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">프로그램 제목</label>
                <input
                  type="text"
                  value={editingProgram.title}
                  onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">부제목</label>
                <input
                  type="text"
                  value={editingProgram.subtitle}
                  onChange={(e) => setEditingProgram({ ...editingProgram, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">설명</label>
                <textarea
                  value={editingProgram.description}
                  onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">대상</label>
                <input
                  type="text"
                  value={editingProgram.target}
                  onChange={(e) => setEditingProgram({ ...editingProgram, target: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">기간</label>
                <input
                  type="text"
                  value={editingProgram.duration}
                  onChange={(e) => setEditingProgram({ ...editingProgram, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">정원</label>
                <input
                  type="number"
                  value={editingProgram.max_participants}
                  onChange={(e) => setEditingProgram({ ...editingProgram, max_participants: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">비용</label>
                <input
                  type="text"
                  value={editingProgram.fee}
                  onChange={(e) => setEditingProgram({ ...editingProgram, fee: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">장소</label>
                <input
                  type="text"
                  value={editingProgram.location}
                  onChange={(e) => setEditingProgram({ ...editingProgram, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

          </Card>

          {/* 세션 관리 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">주차별 커리큘럼</h3>
              <Button onClick={handleSessionAdd} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                세션 추가
              </Button>
            </div>

            <div className="space-y-4">
              {editingProgram.sessions.map((session, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  {editingSession?.index === index ? (
                    // 세션 편집 모드
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">제목</label>
                        <input
                          type="text"
                          value={editingSession.session.title}
                          onChange={(e) => setEditingSession({
                            ...editingSession,
                            session: { ...editingSession.session, title: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">설명</label>
                        <textarea
                          value={editingSession.session.description}
                          onChange={(e) => setEditingSession({
                            ...editingSession,
                            session: { ...editingSession.session, description: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">이미지 URL</label>
                        <div className="space-y-2">
                          {editingSession.session.images.map((image, imgIndex) => (
                            <div key={imgIndex} className="flex gap-2">
                              <input
                                type="text"
                                value={image}
                                onChange={(e) => {
                                  const newImages = [...editingSession.session.images]
                                  newImages[imgIndex] = e.target.value
                                  setEditingSession({
                                    ...editingSession,
                                    session: { ...editingSession.session, images: newImages }
                                  })
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newImages = editingSession.session.images.filter((_, i) => i !== imgIndex)
                                  setEditingSession({
                                    ...editingSession,
                                    session: { ...editingSession.session, images: newImages }
                                  })
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingSession({
                                ...editingSession,
                                session: { 
                                  ...editingSession.session, 
                                  images: [...editingSession.session.images, ''] 
                                }
                              })
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            이미지 추가
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSessionSave}>
                          저장
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setEditingSession(null)}
                        >
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // 세션 보기 모드
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-move mt-1" />
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-700">
                        {session.order}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{session.title}</h4>
                        {session.description && (
                          <p className="text-sm text-gray-600 mt-1">{session.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <ImageIcon className="w-4 h-4" />
                          <span>{session.images.length}개 이미지</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSessionEdit(index, session)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSessionDelete(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}