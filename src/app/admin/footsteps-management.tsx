'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { FootstepPost, User } from '@/types'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Plus, Edit, Trash2, Eye, Calendar, Search, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface FootstepsManagementTabProps {
  posts: FootstepPost[]
  setPosts: React.Dispatch<React.SetStateAction<FootstepPost[]>>
  currentUser: User
}

// Tiptap Editor Toolbar Component
function MenuBar({ editor }: { editor: any }) {
  if (!editor) {
    return null
  }

  const addImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const src = event.target?.result as string
          editor.chain().focus().setImage({ src }).run()
        }
        reader.readAsDataURL(file)
      }
    }
    
    input.click()
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('링크 URL을 입력하세요:', previousUrl)
    
    if (url === null) {
      return
    }
    
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-3 flex flex-wrap gap-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('bold') ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="굵게"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6v8h9a4 4 0 014-4 4 4 0 01-4 4H6V4z" />
        </svg>
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('italic') ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="기울임"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4m0 0l-4 16m4-16h4m-8 16h4" />
        </svg>
      </button>
      
      <div className="w-px h-8 bg-gray-300 mx-1 self-center"></div>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('heading', { level: 1 }) ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="제목 1"
      >
        H1
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="제목 2"
      >
        H2
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="제목 3"
      >
        H3
      </button>
      
      <div className="w-px h-8 bg-gray-300 mx-1 self-center"></div>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('bulletList') ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="불릿 리스트"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('orderedList') ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="번호 리스트"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('blockquote') ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="인용"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l-5-5v10a2 2 0 002 2h10m4-2V4a2 2 0 00-2-2H9" />
        </svg>
      </button>
      
      <div className="w-px h-8 bg-gray-300 mx-1 self-center"></div>
      
      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('link') ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="링크"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
      
      <button
        type="button"
        onClick={addImage}
        className="p-2 rounded bg-white hover:bg-gray-200 transition-colors"
        title="이미지"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  )
}

export default function FootstepsManagementTab({ posts, setPosts, currentUser }: FootstepsManagementTabProps) {
  const { showAlert } = useAlert()
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState<FootstepPost | null>(null)
  const [selectedPost, setSelectedPost] = useState<FootstepPost | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'building' | 'gardening' | 'science' | 'rural' | 'remodeling' | 'general'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  // 폼 상태
  const [title, setTitle] = useState('')
  const [programCategory, setProgramCategory] = useState<'building' | 'gardening' | 'science' | 'rural' | 'remodeling' | 'general'>('building')
  const [programName, setProgramName] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border-0 p-4 min-h-[200px] max-w-none',
      },
    },
  })

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
    editor?.commands.setContent('')
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

    const content = editor?.getHTML() || ''
    if (!content.trim() || content === '<p></p>') {
      showAlert('내용을 입력해주세요.', 'error')
      return
    }

    const postData: Omit<FootstepPost, 'id'> = {
      title: title.trim(),
      content,
      programCategory,
      programName: programName.trim(),
      createdAt: new Date(),
      authorId: currentUser.id,
      authorName: currentUser.name
    }

    if (editingPost) {
      // 수정
      const updatedPost: FootstepPost = {
        ...editingPost,
        ...postData,
        updatedAt: new Date()
      }

      const updatedPosts = posts.map(post => 
        post.id === editingPost.id ? updatedPost : post
      )
      setPosts(updatedPosts)
      localStorage.setItem('footstep-posts', JSON.stringify(updatedPosts))
      
      setEditingPost(null)
      showAlert('게시글이 수정되었습니다.', 'success')
    } else {
      // 생성
      const newPost: FootstepPost = {
        ...postData,
        id: `footstep_${Date.now()}`
      }

      const updatedPosts = [newPost, ...posts]
      setPosts(updatedPosts)
      localStorage.setItem('footstep-posts', JSON.stringify(updatedPosts))
      
      setIsCreating(false)
      showAlert('게시글이 작성되었습니다.', 'success')
    }

    resetForm()
  }

  const handleEdit = (post: FootstepPost) => {
    setEditingPost(post)
    setTitle(post.title)
    setProgramCategory(post.programCategory)
    setProgramName(post.programName)
    editor?.commands.setContent(post.content)
    setIsCreating(true)
  }

  const handleDelete = (postId: string) => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      const updatedPosts = posts.filter(post => post.id !== postId)
      setPosts(updatedPosts)
      localStorage.setItem('footstep-posts', JSON.stringify(updatedPosts))
      showAlert('게시글이 삭제되었습니다.', 'success')
    }
  }


  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
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
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <MenuBar editor={editor} />
                <EditorContent 
                  editor={editor} 
                  className="border-0 rounded-b-lg bg-white min-h-[300px]"
                />
              </div>
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