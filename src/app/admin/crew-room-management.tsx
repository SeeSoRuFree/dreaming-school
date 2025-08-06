// Crew Room Management Tab Component
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, CrewPost } from '@/types'
import { useAlert } from '@/hooks/useAlert'
import { useConfirm } from '@/hooks/useConfirm'
import { Trash2 } from 'lucide-react'

interface CrewRoomManagementTabProps {
  currentUser: User
}

export function CrewRoomManagementTab({ currentUser }: CrewRoomManagementTabProps) {
  const { showAlert } = useAlert()
  const { showConfirm } = useConfirm()
  const [posts, setPosts] = useState<CrewPost[]>([])
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'notice' as CrewPost['category'] })
  const [editingPost, setEditingPost] = useState<CrewPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'notice' | 'event'>('all')

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    try {
      const savedPosts = localStorage.getItem('crew-posts')
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts)
        // Sort by creation date (newest first)
        parsedPosts.sort((a: CrewPost, b: CrewPost) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setPosts(parsedPosts)
      }
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      showAlert('제목과 내용을 모두 입력해주세요.', '입력 오류')
      return
    }

    const post: CrewPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      authorId: currentUser.id,
      authorName: currentUser.name + ' (관리자)',
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      category: newPost.category,
      likes: [],
      comments: [],
      createdAt: new Date()
    }

    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem('crew-posts', JSON.stringify(updatedPosts))

    setNewPost({ title: '', content: '', category: 'notice' })
    showAlert('게시글이 작성되었습니다.', '작성 완료')
  }

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingPost || !editingPost.title.trim() || !editingPost.content.trim()) {
      showAlert('제목과 내용을 모두 입력해주세요.', '입력 오류')
      return
    }

    const updatedPosts = posts.map(post => 
      post.id === editingPost.id 
        ? { ...editingPost, title: editingPost.title.trim(), content: editingPost.content.trim() }
        : post
    )

    setPosts(updatedPosts)
    localStorage.setItem('crew-posts', JSON.stringify(updatedPosts))

    setEditingPost(null)
    showAlert('게시글이 수정되었습니다.', '수정 완료')
  }

  const handleDeletePost = async (postId: string) => {
    const confirmed = await showConfirm({
      title: '게시글 삭제',
      message: '정말 이 게시글을 삭제하시겠습니까?\n삭제된 게시글은 복구할 수 없습니다.',
      confirmText: '삭제',
      cancelText: '취소'
    })

    if (!confirmed) return

    const updatedPosts = posts.filter(p => p.id !== postId)
    setPosts(updatedPosts)
    localStorage.setItem('crew-posts', JSON.stringify(updatedPosts))
    
    showAlert('게시글이 삭제되었습니다.', '삭제 완료')
  }

  const getCategoryDisplay = (category: string | undefined) => {
    switch (category) {
      case 'notice': return '공지'
      case 'event': return '이벤트'
      case 'general': return '일반'
      case 'qa': return 'Q&A'
      default: return '일반'
    }
  }

  const getCategoryColor = (category: string | undefined) => {
    switch (category) {
      case 'notice': return 'bg-red-100 text-red-700'
      case 'event': return 'bg-purple-100 text-purple-700'
      case 'general': return 'bg-gray-100 text-gray-700'
      case 'qa': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredPosts = posts.filter(post => {
    if (selectedCategory === 'all') {
      return post.category === 'notice' || post.category === 'event'
    }
    return post.category === selectedCategory
  })

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        <p className="mt-4 text-gray-600">게시글을 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-2 mb-6">크루룸 공지/이벤트 관리</h2>

        {/* Create/Edit Post Form */}
        <Card className="p-6 mb-6">
          <h3 className="heading-4 mb-4">
            {editingPost ? '게시글 수정' : '새 게시글 작성'}
          </h3>
          <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={editingPost ? editingPost.category : newPost.category}
                onChange={(e) => {
                  const category = e.target.value as CrewPost['category']
                  if (editingPost) {
                    setEditingPost({ ...editingPost, category })
                  } else {
                    setNewPost({ ...newPost, category })
                  }
                }}
                className="input-field"
              >
                <option value="notice">공지</option>
                <option value="event">이벤트</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={editingPost ? editingPost.title : newPost.title}
                onChange={(e) => {
                  if (editingPost) {
                    setEditingPost({ ...editingPost, title: e.target.value })
                  } else {
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                }}
                className="input-field"
                placeholder="제목을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <textarea
                value={editingPost ? editingPost.content : newPost.content}
                onChange={(e) => {
                  if (editingPost) {
                    setEditingPost({ ...editingPost, content: e.target.value })
                  } else {
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                }}
                className="textarea-field"
                rows={6}
                placeholder="내용을 입력하세요"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="btn-primary">
                {editingPost ? '수정하기' : '작성하기'}
              </Button>
              {editingPost && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingPost(null)}
                >
                  취소
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Filter Buttons */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체 ({posts.filter(p => p.category === 'notice' || p.category === 'event').length})
            </button>
            <button
              onClick={() => setSelectedCategory('notice')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'notice'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              공지 ({posts.filter(p => p.category === 'notice').length})
            </button>
            <button
              onClick={() => setSelectedCategory('event')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'event'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              이벤트 ({posts.filter(p => p.category === 'event').length})
            </button>
          </div>
        </Card>

        {/* Posts List */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작성자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작성일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    반응
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      게시글이 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                          {getCategoryDisplay(post.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{post.authorName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          ❤️ {post.likes.length} | 💬 {post.comments.length}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingPost(post)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}