'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FootstepPost } from '@/types'
import { Calendar, ArrowLeft, Eye, User } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function FootstepDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<FootstepPost | null>(null)
  const [loading, setLoading] = useState(true)

  const categoryNames = {
    building: '집짓기',
    gardening: '원예',
    science: '과학창의',
    rural: '농촌활성화',
    remodeling: '리모델링',
    general: '기타'
  }

  useEffect(() => {
    const loadPost = () => {
      const savedPosts = localStorage.getItem('footstep-posts')
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts)
        const postsWithDates = parsedPosts.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined
        }))
        
        const foundPost = postsWithDates.find((p: FootstepPost) => p.id === params.id)
        setPost(foundPost || null)
      }
      setLoading(false)
    }

    if (params.id) {
      loadPost()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white pt-24">
        <div className="container-main py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white pt-24">
        <div className="container-main py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">게시글을 찾을 수 없습니다</h1>
            <p className="text-gray-600 mb-8">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
            <Link
              href="/footsteps"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24">
        <div className="container-main py-12">
          <div className="max-w-4xl mx-auto">
            {/* 브레드크럼 */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-blue-600">홈</Link>
              <span>/</span>
              <Link href="/footsteps" className="hover:text-blue-600">걸어온 발자취</Link>
              <span>/</span>
              <span className="text-gray-900">게시글</span>
            </nav>

            {/* 뒤로가기 버튼 */}
            <div className="mb-6">
              <Link
                href="/footsteps"
                className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록으로 돌아가기
              </Link>
            </div>

            {/* 게시글 정보 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* 헤더 정보 */}
              <div className="border-b border-gray-200 pb-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {categoryNames[post.programCategory]}
                  </span>
                  <span className="text-blue-600 font-medium text-sm">
                    {post.programName}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{format(post.createdAt, 'yyyy년 MM월 dd일', { locale: ko })}</span>
                    </div>
                  </div>
                </div>
              </div>


              {/* 게시글 내용 */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>

            {/* 하단 네비게이션 */}
            <div className="mt-8 text-center">
              <Link
                href="/footsteps"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}