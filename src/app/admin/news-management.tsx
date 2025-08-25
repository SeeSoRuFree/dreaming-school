'use client'

import { useState, useRef, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { News, User } from '@/types'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

interface NewsManagementTabProps {
  news: News[]
  setNews: React.Dispatch<React.SetStateAction<News[]>>
  currentUser: User
}

// Tiptap Editor Toolbar Component
function MenuBar({ editor }: { editor: any }) {
  if (!editor) {
    return null
  }

  const addImage = useCallback(() => {
    const url = window.prompt('이미지 URL을 입력하세요:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
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
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('strike') ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="취소선"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12M9 6l3 12m3-12l-3 12" />
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
        <span className="text-xs font-bold">H1</span>
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="제목 2"
      >
        <span className="text-xs font-bold">H2</span>
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="제목 3"
      >
        <span className="text-xs font-bold">H3</span>
      </button>
      
      <div className="w-px h-8 bg-gray-300 mx-1 self-center"></div>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('bulletList') ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="글머리 기호"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('orderedList') ? 'bg-gray-300 text-blue-600' : 'bg-white'
        }`}
        title="번호 매기기"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6h10M7 12h10M7 18h10M3 6h.01M3 12h.01M3 18h.01" />
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8m-8 4h6" />
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
        className="p-2 rounded hover:bg-gray-200 transition-colors bg-white"
        title="이미지"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      
      <div className="w-px h-8 bg-gray-300 mx-1 self-center"></div>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-200 transition-colors bg-white"
        title="실행 취소"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-200 transition-colors bg-white"
        title="다시 실행"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
        </svg>
      </button>
    </div>
  )
}

export function NewsManagementTab({ news, setNews, currentUser }: NewsManagementTabProps) {
  const { showAlert } = useAlert()
  const [activeSubTab, setActiveSubTab] = useState<'list' | 'create' | 'edit'>('list')
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'news' as 'news' | 'notice',
    featured: false
  })

  // Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-6',
      },
    },
    immediatelyRender: false,
  })

  const saveNews = () => {
    if (!formData.title.trim() || !editor?.getHTML()) {
      showAlert('제목과 내용을 모두 입력해주세요.')
      return
    }

    const content = editor.getHTML()

    if (editingNews) {
      const updatedNews = news.map(item => 
        item.id === editingNews.id 
          ? {
              ...item,
              title: formData.title,
              content: content,
              category: formData.category,
              featured: formData.featured,
              updatedAt: new Date()
            }
          : item
      )
      setNews(updatedNews)
      localStorage.setItem('dream-house-news', JSON.stringify(updatedNews))
      showAlert('소식이 수정되었습니다.')
    } else {
      const newNews: News = {
        id: `news_${Date.now()}`,
        title: formData.title,
        content: content,
        category: formData.category,
        featured: formData.featured,
        createdAt: new Date()
      }
      const updatedNews = [newNews, ...news]
      setNews(updatedNews)
      localStorage.setItem('dream-house-news', JSON.stringify(updatedNews))
      showAlert('새 소식이 작성되었습니다.')
    }

    // Reset form
    setFormData({
      title: '',
      category: 'news',
      featured: false
    })
    editor?.commands.clearContent()
    setEditingNews(null)
    setActiveSubTab('list')
  }

  const editNews = (newsItem: News) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      category: newsItem.category,
      featured: newsItem.featured || false
    })
    editor?.commands.setContent(newsItem.content)
    setActiveSubTab('edit')
  }

  const deleteNews = (newsId: string) => {
    const updatedNews = news.filter(item => item.id !== newsId)
    setNews(updatedNews)
    localStorage.setItem('dream-house-news', JSON.stringify(updatedNews))
    showAlert('소식이 삭제되었습니다.')
  }

  const cancelEdit = () => {
    setEditingNews(null)
    setFormData({
      title: '',
      category: 'news',
      featured: false
    })
    editor?.commands.clearContent()
    setActiveSubTab('list')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">소식/공지 관리</h2>
          <p className="mt-2 text-gray-600">새로운 소식과 공지사항을 작성하고 관리합니다.</p>
        </div>
        {activeSubTab === 'list' && (
          <Button
            onClick={() => setActiveSubTab('create')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            새 글 작성
          </Button>
        )}
      </div>

      {activeSubTab === 'list' && (
        <NewsListTab 
          news={news} 
          onEdit={editNews} 
          onDelete={deleteNews} 
        />
      )}

      {(activeSubTab === 'create' || activeSubTab === 'edit') && (
        <Card className="p-8 shadow-xl border-0">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {activeSubTab === 'edit' ? '글 수정' : '새 글 작성'}
            </h3>
            <p className="mt-2 text-gray-600">
              {activeSubTab === 'edit' ? '기존 글을 수정합니다.' : '새로운 소식이나 공지사항을 작성합니다.'}
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Category and Featured Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  분류
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: 'news' }))}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      formData.category === 'news'
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    소식
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: 'notice' }))}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      formData.category === 'notice'
                        ? 'bg-red-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    공지사항
                  </button>
                </div>
              </div>

              {/* Featured Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  중요도
                </label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                    formData.featured
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className={`w-5 h-5 mr-2 ${formData.featured ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {formData.featured ? '중요 표시됨' : '중요 표시'}
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="제목을 입력하세요"
              />
            </div>
            
            {/* Rich Text Editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                내용
              </label>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <MenuBar editor={editor} />
                <EditorContent 
                  editor={editor} 
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <Button
              onClick={saveNews}
              disabled={!formData.title.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {activeSubTab === 'edit' ? '수정 완료' : '작성 완료'}
            </Button>
            <Button
              onClick={cancelEdit}
              variant="outline"
              className="px-6 py-3 border-2 hover:bg-gray-50"
            >
              취소
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

// News List Tab Component
interface NewsListTabProps {
  news: News[]
  onEdit: (news: News) => void
  onDelete: (newsId: string) => void
}

function NewsListTab({ news, onEdit, onDelete }: NewsListTabProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<'all' | 'news' | 'notice'>('all')

  const filteredNews = news.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="p-6 shadow-lg border-0">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="제목으로 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">분류 필터</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">전체</option>
              <option value="news">소식</option>
              <option value="notice">공지사항</option>
            </select>
          </div>
        </div>
      </Card>

      {/* News List */}
      <div className="grid gap-4">
        {filteredNews.length === 0 ? (
          <Card className="p-12 text-center shadow-lg border-0">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-gray-500">작성된 글이 없습니다.</p>
          </Card>
        ) : (
          filteredNews.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-xl transition-all duration-200 border-0 bg-white">
              <div className="flex items-start gap-4">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-32 h-24 object-cover rounded-lg shadow-md"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        item.category === 'notice' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.category === 'notice' ? '공지사항' : '소식'}
                      </span>
                      {item.featured && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          중요
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="수정"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <div 
                    className="text-sm text-gray-600 mb-3 line-clamp-2"
                    dangerouslySetInnerHTML={{ 
                      __html: item.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' 
                    }}
                  />
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    작성일: {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                    {item.updatedAt && (
                      <span className="ml-4">
                        <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        수정일: {new Date(item.updatedAt).toLocaleDateString('ko-KR')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}