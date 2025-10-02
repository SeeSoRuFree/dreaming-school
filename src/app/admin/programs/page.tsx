'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getPrograms, deleteProgram } from '@/lib/supabase'
import { Pencil, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { useAlert } from '@/hooks/useAlert'
import { useConfirm } from '@/hooks/useConfirm'
import Link from 'next/link'

interface Program {
  id: string
  title: string
  subtitle?: string
  description?: string
  target?: string
  duration?: string
  max_participants?: string
  fee?: string
  location?: string
  category: string
  is_active: boolean
  created_at: string
  updated_at?: string
}

export default function ProgramsPage() {
  const router = useRouter()
  const { isAdmin, isLoading } = useAdminAuth()
  const { showAlert } = useAlert()
  const { showConfirm } = useConfirm()

  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
    } else {
      loadPrograms()
    }
  }, [isAdmin, isLoading, router])

  const loadPrograms = async () => {
    try {
      setLoading(true)
      const data = await getPrograms()
      setPrograms(data)
    } catch (error) {
      showAlert('프로그램 목록을 불러오는데 실패했습니다.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm({
      title: '프로그램 삭제',
      message: '정말로 이 프로그램을 삭제하시겠습니까? 관련된 모든 세션과 이미지도 함께 삭제됩니다.'
    })

    if (!confirmed) return

    try {
      await deleteProgram(id)
      showAlert('프로그램이 삭제되었습니다.')
      loadPrograms()
    } catch (error) {
      showAlert('프로그램 삭제에 실패했습니다.')
      console.error(error)
    }
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
          <h1 className="text-2xl font-bold">교육프로그램 관리</h1>
          <Link href="/admin/programs/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              새 프로그램 등록
            </Button>
          </Link>
        </div>

        {programs.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 mb-4">등록된 프로그램이 없습니다.</p>
            <Link href="/admin/programs/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                첫 프로그램 등록하기
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {programs.map(program => (
              <Card key={program.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{program.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        program.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {program.is_active ? '활성' : '비활성'}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {getCategoryLabel(program.category)}
                      </span>
                    </div>
                    {program.subtitle && (
                      <p className="text-sm text-gray-600 mb-2">{program.subtitle}</p>
                    )}

                    {expandedPrograms.has(program.id) && (
                      <div className="mt-3 space-y-2 text-sm">
                        {program.description && (
                          <p className="text-gray-700">{program.description}</p>
                        )}
                        <div className="grid grid-cols-2 gap-2 text-gray-600">
                          {program.target && <div>• 대상: {program.target}</div>}
                          {program.duration && <div>• 기간: {program.duration}</div>}
                          {program.max_participants && <div>• 정원: {program.max_participants}명</div>}
                          {program.fee && <div>• 비용: {program.fee}</div>}
                          {program.location && <div>• 장소: {program.location}</div>}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleProgramExpand(program.id)}
                    >
                      {expandedPrograms.has(program.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                    <Link href={`/admin/programs/${program.id}`}>
                      <Button variant="outline" size="sm">
                        상세
                      </Button>
                    </Link>
                    <Link href={`/admin/programs/${program.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(program.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
