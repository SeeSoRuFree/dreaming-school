'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { FootstepPost, User } from '@/types'
import dynamic from 'next/dynamic'
import { Plus, Edit, Trash2, Eye, Calendar, Search } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { uploadImage } from '@/lib/supabase'
import 'react-quill-new/dist/quill.snow.css'

// react-quill-new를 동적 임포트 (SSR 방지)
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface FootstepsManagementTabProps {
  currentUser: User
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function FootstepsManagementTab({ currentUser }: FootstepsManagementTabProps) {
  const { showAlert } = useAlert()
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState<FootstepPost | null>(null)
  const [selectedPost, setSelectedPost] = useState<FootstepPost | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'building' | 'gardening' | 'science' | 'rural' | 'remodeling' | 'general'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  // 데이터 상태
  const [posts, setPosts] = useState<FootstepPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 폼 상태
  const [title, setTitle] = useState('')
  const [programCategory, setProgramCategory] = useState<'building' | 'gardening' | 'science' | 'rural' | 'remodeling' | 'general'>('building')
  const [programName, setProgramName] = useState('')
  const [content, setContent] = useState('')

  // Quill 에디터 설정
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
                const imageUrl = await uploadImage(file, 'footsteps')
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

  // 프로그램 이름 옵션
  const programOptions = {
    building: [
      '한평 집짓기',
      '벽걸이용 모형집짓기',
      '한평형 모형집짓기',
      '두평형 모형집짓기'
    ],
    gardening: [
      '분경수업',
      '테라리움수업',
      '플렌테리어수업',
      '정원만들기수업',
      '압화캐릭터수업',
      '리스화관수업',
      '축하꽃양초수업',
      '아로마 꽃 비누수업',
      '우드버닝화수업'
    ],
    science: [
      '과학교육',
      '창의목공'
    ],
    rural: [
      '농촌주민들과 함께하는 세상에서 가장 위대한 한평집짓기',
      '농촌주민들과 함께하는 원예치유프로그램',
      '함께하는 농촌지역 살리기 컨설팅'
    ],
    remodeling: [
      '공간 재창조 리모델링 사업 (실내,실외)'
    ],
    general: [
      '기타 프로그램'
    ]
  }

  const categoryNames = {
    all: '전체',
    building: '집짓기',
    gardening: '원예',
    science: '과학창의',
    rural: '농촌활성화',
    remodeling: '리모델링',
    general: '기타'
  }

  // 데이터 로딩
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/footsteps?select=*&order=created_at.desc`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('데이터를 불러오지 못했습니다.')
      }

      const data = await response.json()
      const formattedPosts: FootstepPost[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        programCategory: item.program_category,
        programName: item.program_name,
        createdAt: new Date(item.created_at),
        updatedAt: item.updated_at ? new Date(item.updated_at) : undefined,
        authorId: item.author_id,
        authorName: item.author_name,
      }))

      setPosts(formattedPosts)
    } catch (error) {
      showAlert('게시글을 불러오는데 실패했습니다.', 'error')
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  // 필터링된 게시글
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.programCategory === selectedCategory
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.programName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const resetForm = () => {
    setTitle('')
    setProgramCategory('building')
    setProgramName('')
    setContent('')
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      showAlert('제목을 입력해주세요.', 'error')
      return
    }

    if (!programName.trim()) {
      showAlert('프로그램명을 입력해주세요.', 'error')
      return
    }

    if (!content.trim() || content === '<p><br></p>') {
      showAlert('내용을 입력해주세요.', 'error')
      return
    }

    try {
      if (editingPost) {
        // 수정
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/footsteps?id=eq.${editingPost.id}`,
          {
            method: 'PATCH',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation',
            },
            body: JSON.stringify({
              title: title.trim(),
              content: content,
              program_category: programCategory,
              program_name: programName.trim(),
            }),
          }
        )

        if (!response.ok) {
          throw new Error('게시글 수정에 실패했습니다.')
        }

        showAlert('게시글이 수정되었습니다.', 'success')
        setEditingPost(null)
      } else {
        // 생성
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/footsteps`,
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
              content: content,
              program_category: programCategory,
              program_name: programName.trim(),
              author_id: currentUser.id,
              author_name: currentUser.name,
            }),
          }
        )

        if (!response.ok) {
          throw new Error('게시글 작성에 실패했습니다.')
        }

        showAlert('게시글이 작성되었습니다.', 'success')
        setIsCreating(false)
      }

      resetForm()
      fetchPosts()
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '오류가 발생했습니다.', 'error')
    }
  }

  const handleEdit = (post: FootstepPost) => {
    setEditingPost(post)
    setTitle(post.title)
    setProgramCategory(post.programCategory)
    setProgramName(post.programName)
    setContent(post.content)
    setIsCreating(true)
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/footsteps?id=eq.${postId}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('게시글 삭제에 실패했습니다.')
      }

      showAlert('게시글이 삭제되었습니다.', 'success')
      fetchPosts()
    } catch (error) {
      showAlert(error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.', 'error')
    }
  }

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    )
  }

  if (isCreating || editingPost) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {editingPost ? '게시글 수정' : '새 게시글 작성'}
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setIsCreating(false)
                setEditingPost(null)
                resetForm()
              }}
              variant="outline"
            >
              취소
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              {editingPost ? '수정하기' : '게시하기'}
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="게시글 제목을 입력하세요"
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
                  setProgramName('') // 카테고리 변경 시 프로그램명 초기화
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">프로그램을 선택하세요</option>
                {programOptions[programCategory].map((program) => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>

            {/* 내용 에디터 */}
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
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">걸어온 발자취 관리</h3>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          새 게시글 작성
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="제목, 프로그램명으로 검색..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as any)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(categoryNames).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {currentPosts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">게시글이 없습니다.</p>
          </Card>
        ) : (
          currentPosts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                      {categoryNames[post.programCategory]}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(post.createdAt, 'yyyy.MM.dd HH:mm', { locale: ko })}
                    </span>
                    {post.updatedAt && (
                      <span className="text-gray-400 text-xs">
                        (수정됨)
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {post.title}
                  </h4>
                  <p className="text-blue-600 text-sm mb-2">
                    {post.programName}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {stripHtml(post.content)}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>작성자: {post.authorName}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => setSelectedPost(post)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleEdit(post)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              size="sm"
            >
              {page}
            </Button>
          ))}
        </div>
      )}

      {/* 상세 모달 */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mb-2 inline-block">
                    {categoryNames[selectedPost.programCategory]}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedPost.title}
                  </h2>
                  <p className="text-blue-600 font-medium mb-2">
                    {selectedPost.programName}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>작성자: {selectedPost.authorName}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(selectedPost.createdAt, 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
                    </span>
                    {selectedPost.updatedAt && (
                      <span>(수정: {format(selectedPost.updatedAt, 'MM/dd HH:mm', { locale: ko })})</span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedPost(null)}
                  variant="outline"
                >
                  닫기
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
