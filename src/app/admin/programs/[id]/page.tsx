'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getProgramById } from '@/lib/supabase'
import { Pencil, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ProgramSession {
  id: string
  order_num: number
  title: string
  description?: string
  images?: { id: string; image_url: string; order_num: number }[]
}

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
  sessions?: ProgramSession[]
}

export default function ProgramDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isAdmin, isLoading } = useAdminAuth()

  const [program, setProgram] = useState<Program | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
    } else {
      loadProgram()
    }
  }, [isAdmin, isLoading, router])

  const loadProgram = async () => {
    try {
      setLoading(true)
      const id = params.id as string
      const data = await getProgramById(id)
      setProgram(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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

  if (!isAdmin || !program) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/programs">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">프로그램 상세</h1>
          </div>
          <Link href={`/admin/programs/${program.id}/edit`}>
            <Button>
              <Pencil className="w-4 h-4 mr-2" />
              수정
            </Button>
          </Link>
        </div>

        {/* 기본 정보 */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">기본 정보</h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold">{program.title}</h3>
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
              <p className="text-gray-600">{program.subtitle}</p>
            )}

            {program.description && (
              <div className="pt-3 border-t">
                <h4 className="font-medium text-sm text-gray-700 mb-1">설명</h4>
                <p className="text-gray-600">{program.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-3 border-t">
              {program.target && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">대상</h4>
                  <p className="text-gray-600">{program.target}</p>
                </div>
              )}
              {program.duration && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">기간</h4>
                  <p className="text-gray-600">{program.duration}</p>
                </div>
              )}
              {program.max_participants && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">정원</h4>
                  <p className="text-gray-600">{program.max_participants}명</p>
                </div>
              )}
              {program.fee && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">비용</h4>
                  <p className="text-gray-600">{program.fee}</p>
                </div>
              )}
              {program.location && (
                <div className="col-span-2">
                  <h4 className="font-medium text-sm text-gray-700 mb-1">장소</h4>
                  <p className="text-gray-600">{program.location}</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* 세션 정보 */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            주차별 커리큘럼 ({program.sessions?.length || 0}개)
          </h2>

          {program.sessions && program.sessions.length > 0 ? (
            <div className="space-y-4">
              {program.sessions.map((session) => (
                <div key={session.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-700 flex-shrink-0">
                      {session.order_num}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-lg mb-1">{session.title}</h4>
                      {session.description && (
                        <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                      )}

                      {session.images && session.images.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            이미지 ({session.images.length}개)
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {session.images.map((image) => (
                              <div key={image.id} className="relative aspect-square">
                                <img
                                  src={image.image_url}
                                  alt={session.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">등록된 세션이 없습니다.</p>
          )}
        </Card>

        {/* 메타 정보 */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">메타 정보</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">생성일</span>
              <span>{new Date(program.created_at).toLocaleString('ko-KR')}</span>
            </div>
            {program.updated_at && (
              <div className="flex justify-between">
                <span className="text-gray-600">수정일</span>
                <span>{new Date(program.updated_at).toLocaleString('ko-KR')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">프로그램 ID</span>
              <span className="font-mono text-xs">{program.id}</span>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
