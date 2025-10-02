'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import dynamic from 'next/dynamic'
import { uploadImage } from '@/lib/supabase'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function NewsCreatePage() {
  const router = useRouter()
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const { showAlert } = useAlert()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<'news' | 'notice'>('news')
  const [featured, setFeatured] = useState(false)
  const [content, setContent] = useState('')
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
                const imageUrl = await uploadImage(file, 'images', 'news')
                const quill = this.quill
                const range = quill.getSelection(true)
                quill.insertEmbed(range.index, 'image', imageUrl)
                quill.setSelection(range.index + 1)
              } catch (error) {
                alert('이미지 업로드에 실패했습니다.')
              }
            }
          }
        }
      }
    }
  }), [])

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',
    'align',
    'blockquote', 'code-block',
    'link', 'image'
  ]

  useEffect(() => {
    if (authLoading) return

    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [isAdmin, authLoading, router])

  const handleSubmit = async () => {
    if (!title.trim()) {
      showAlert('제목을 입력해주세요.')
      return
    }

    if (!content.trim() || content === '<p><br></p>') {
      showAlert('내용을 입력해주세요.')
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/news`,
        {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
          },
          body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
            category,
            featured,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('소식 등록에 실패했습니다.')
      }

      showAlert('소식이 등록되었습니다.')
      router.push('/admin/news')
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
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
          <h3 className="text-xl font-semibold">새 소식 작성</h3>
          <div className="flex gap-2">
            <Button
              onClick={() => router.push('/admin/news')}
              variant="outline"
            >
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            {/* Category and Featured Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  분류 *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="news"
                      checked={category === 'news'}
                      onChange={(e) => setCategory(e.target.value as 'news' | 'notice')}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">소식</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="notice"
                      checked={category === 'notice'}
                      onChange={(e) => setCategory(e.target.value as 'news' | 'notice')}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">공지사항</span>
                  </label>
                </div>
              </div>

              {/* Featured Checkbox */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  중요도
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">중요 표시</span>
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                제목 *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="제목을 입력하세요"
              />
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
