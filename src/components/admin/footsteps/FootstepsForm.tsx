'use client'

import { useState, useMemo, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { FootstepPost, User } from '@/types'
import dynamic from 'next/dynamic'
import { uploadImage } from '@/lib/supabase'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface FootstepsFormProps {
  currentUser: User
  initialData?: FootstepPost
  mode: 'create' | 'edit'
}

export default function FootstepsForm({ currentUser, initialData, mode }: FootstepsFormProps) {
  const router = useRouter()
  const { showAlert } = useAlert()

  const [title, setTitle] = useState(initialData?.title || '')
  const [programCategory, setProgramCategory] = useState<'building' | 'gardening' | 'science' | 'rural' | 'remodeling' | 'general'>(
    initialData?.programCategory || 'building'
  )
  const [programName, setProgramName] = useState(initialData?.programName || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: async function(this: any) {
          const input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', 'image/*')
          input.click()

          input.onchange = async () => {
            const file = input.files?.[0]
            if (file) {
              try {
                const imageUrl = await uploadImage(file, 'images', 'footsteps')
                const quill = this.quill
                const range = quill.getSelection(true)
                quill.insertEmbed(range.index, 'image', imageUrl)
                quill.setSelection(range.index + 1)
              } catch (error) {
                showAlert('이미지 업로드에 실패했습니다.', 'error')
              }
            }
          }
        }
      }
    }
  }), [showAlert])

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',
    'align',
    'blockquote', 'code-block',
    'link', 'image'
  ]

  const programOptions = {
    building: ['한평 집짓기', '벽걸이용 모형집짓기', '한평형 모형집짓기', '두평형 모형집짓기'],
    gardening: ['분경수업', '테라리움수업', '플렌테리어수업', '정원만들기수업', '압화캐릭터수업', '리스화관수업', '축하꽃양초수업', '아로마 꽃 비누수업', '우드버닝화수업'],
    science: ['과학교육', '창의목공'],
    rural: ['농촌주민들과 함께하는 세상에서 가장 위대한 한평집짓기', '농촌주민들과 함께하는 원예치유프로그램', '함께하는 농촌지역 살리기 컨설팅'],
    remodeling: ['공간 재창조 리모델링 사업 (실내,실외)'],
    general: ['기타 프로그램']
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !programName.trim() || !content.trim()) {
      showAlert('모든 필수 항목을 입력해주세요.', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const postData = {
        title: title.trim(),
        program_category: programCategory,
        program_name: programName.trim(),
        content: content.trim(),
        author_id: currentUser.id,
        author_name: currentUser.name,
        ...(mode === 'edit' ? { updated_at: new Date().toISOString() } : {})
      }

      const url = mode === 'create'
        ? `${SUPABASE_URL}/rest/v1/footsteps`
        : `${SUPABASE_URL}/rest/v1/footsteps?id=eq.${initialData?.id}`

      const response = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(postData)
      })

      if (!response.ok) {
        throw new Error('저장에 실패했습니다.')
      }

      showAlert(mode === 'create' ? '게시글이 작성되었습니다.' : '게시글이 수정되었습니다.', 'success')
      router.push('/admin/footsteps')
    } catch (error) {
      showAlert('저장에 실패했습니다.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? '새 글 작성' : '글 수정'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">프로그램 활동 후기를 작성합니다</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          취소
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          {/* 프로그램 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로그램 카테고리 *
            </label>
            <select
              value={programCategory}
              onChange={(e) => {
                setProgramCategory(e.target.value as any)
                setProgramName('')
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="building">집짓기</option>
              <option value="gardening">원예</option>
              <option value="science">과학창의</option>
              <option value="rural">농촌활성화</option>
              <option value="remodeling">리모델링</option>
              <option value="general">기타</option>
            </select>
          </div>

          {/* 프로그램명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로그램명 *
            </label>
            <select
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">선택하세요</option>
              {programOptions[programCategory].map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내용 *
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              formats={quillFormats}
              className="bg-white"
              style={{ height: '400px', marginBottom: '50px' }}
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : (mode === 'create' ? '작성하기' : '수정하기')}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  )
}
