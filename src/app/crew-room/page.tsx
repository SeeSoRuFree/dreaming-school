'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CrewPost, CrewComment } from '@/types'

export default function CrewRoomPage() {
  const router = useRouter()
  const { user, isAuthenticated, isCrew, isLoading: authLoading } = useAuth()
  const [posts, setPosts] = useState<CrewPost[]>([])
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' as CrewPost['category'] })
  const [isLoading, setIsLoading] = useState(true)
  const [showNewPostForm, setShowNewPostForm] = useState(false)

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return

    if (!isAuthenticated) {
      alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    if (!isCrew) {
      alert('크루 봉사자만 접근할 수 있습니다.')
      router.push('/')
      return
    }

    loadPosts()
  }, [isAuthenticated, isCrew, authLoading, router])

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
    
    if (!newPost.title.trim() || !newPost.content.trim() || !user) return

    const post: CrewPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      authorId: user.id,
      authorName: user.name,
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

    setNewPost({ title: '', content: '', category: 'general' })
    setShowNewPostForm(false)
  }

  const handleLikePost = (postId: string) => {
    if (!user) return

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(user.id)
        const newLikes = isLiked 
          ? post.likes.filter(id => id !== user.id)
          : [...post.likes, user.id]
        
        return { ...post, likes: newLikes }
      }
      return post
    })

    setPosts(updatedPosts)
    localStorage.setItem('crew-posts', JSON.stringify(updatedPosts))
  }

  const handleAddComment = (postId: string, content: string) => {
    if (!content.trim() || !user) return

    const comment: CrewComment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      postId,
      authorId: user.id,
      authorName: user.name,
      content: content.trim(),
      createdAt: new Date()
    }

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] }
      }
      return post
    })

    setPosts(updatedPosts)
    localStorage.setItem('crew-posts', JSON.stringify(updatedPosts))
  }

  const getCategoryDisplay = (category: string | undefined) => {
    switch (category) {
      case 'general': return '일반'
      case 'event': return '이벤트'
      case 'notice': return '공지'
      case 'qa': return 'Q&A'
      default: return '일반'
    }
  }

  const getCategoryColor = (category: string | undefined) => {
    switch (category) {
      case 'general': return 'bg-gray-100 text-gray-700'
      case 'event': return 'bg-purple-100 text-purple-700'
      case 'notice': return 'bg-red-100 text-red-700'
      case 'qa': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (authLoading || (!isAuthenticated || !isCrew) && authLoading) {
    return (
      <div className="container-main section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !isCrew) {
    return null
  }

  if (isLoading) {
    return (
      <div className="container-main section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <p className="mt-4 text-gray-600">게시글을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-main section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-1">크루들의 방</h1>
          <p className="text-gray-600 mt-4">
            크루 봉사자들만의 특별한 소통 공간입니다. 자유롭게 이야기를 나누어보세요.
          </p>
        </div>

        {/* Welcome Card */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{user?.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">안녕하세요, {user?.name}님!</h3>
              <p className="text-blue-700">크루 봉사자로서 활동해주셔서 감사합니다.</p>
            </div>
          </div>
        </Card>

        {/* Create Post Section */}
        <Card className="p-6 mb-8">
          {!showNewPostForm ? (
            <button
              onClick={() => setShowNewPostForm(true)}
              className="w-full p-4 text-left text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              무엇을 공유하고 싶나요?
            </button>
          ) : (
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value as CrewPost['category'] })}
                  className="input-field mb-4"
                >
                  <option value="general">일반</option>
                  <option value="event">이벤트</option>
                  <option value="notice">공지</option>
                  <option value="qa">Q&A</option>
                </select>
              </div>
              
              <input
                type="text"
                placeholder="제목을 입력하세요..."
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="input-field"
                required
              />
              
              <textarea
                placeholder="내용을 입력하세요..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={4}
                className="textarea-field"
                required
              />
              
              <div className="flex space-x-2">
                <Button type="submit" className="btn-primary">
                  게시하기
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setShowNewPostForm(false)
                    setNewPost({ title: '', content: '', category: 'general' })
                  }}
                >
                  취소
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">아직 게시글이 없습니다. 첫 번째 글을 작성해보세요!</p>
            </Card>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={user!}
                onLike={() => handleLikePost(post.id)}
                onComment={(content) => handleAddComment(post.id, content)}
                getCategoryDisplay={getCategoryDisplay}
                getCategoryColor={getCategoryColor}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// Post Card Component
interface PostCardProps {
  post: CrewPost
  currentUser: NonNullable<ReturnType<typeof useAuth>['user']>
  onLike: () => void
  onComment: (content: string) => void
  getCategoryDisplay: (category: string | undefined) => string
  getCategoryColor: (category: string | undefined) => string
}

function PostCard({ post, currentUser, onLike, onComment, getCategoryDisplay, getCategoryColor }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onComment(newComment)
      setNewComment('')
    }
  }

  const isLiked = post.likes.includes(currentUser.id)

  return (
    <Card className="p-6">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-700 font-medium">{post.authorName.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{post.authorName}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString('ko-KR')}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
          {getCategoryDisplay(post.category)}
        </span>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
        <button
          onClick={onLike}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            isLiked 
              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{post.likes.length}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.comments.length}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-4">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-700 text-sm font-medium">{currentUser.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="댓글을 입력하세요..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button type="submit" size="sm" disabled={!newComment.trim()}>
                등록
              </Button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-700 text-sm font-medium">{comment.authorName.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{comment.authorName}</p>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(comment.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}