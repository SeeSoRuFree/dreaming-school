'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'

interface MediaFile {
  id: string
  name: string
  url: string
  type: 'image' | 'video'
  category: 'hero' | 'program' | 'gallery' | 'general'
  programId?: string
  order: number
  uploadedAt: Date
  size: number
}

const PROGRAMS = [
  { id: 'building', name: '소형 집짓기 체험교육' },
  { id: 'science', name: '과학창의교육 및 체험학습' },
  { id: 'remodeling', name: '공간 재창조 리모델링' },
  { id: 'gardening', name: '원예프로그램' },
  { id: 'rural', name: '농촌활성화 주거역량강화' }
]

export function MediaManagementTab() {
  const { showAlert } = useAlert()
  const [activeSubTab, setActiveSubTab] = useState<'upload' | 'library'>('upload')
  const [selectedCategory, setSelectedCategory] = useState<'hero' | 'program' | 'gallery' | 'general'>('general')
  const [selectedProgram, setSelectedProgram] = useState<string>('')
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [filterProgram, setFilterProgram] = useState<string>('all')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load media files from localStorage
    const savedMedia = localStorage.getItem('media-files')
    if (savedMedia) {
      const parsedMedia = JSON.parse(savedMedia)
      // Date 객체로 변환
      const mediaWithDates = parsedMedia.map((file: any) => ({
        ...file,
        uploadedAt: new Date(file.uploadedAt)
      }))
      setMediaFiles(mediaWithDates)
    }
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm']
    if (!allowedTypes.includes(file.type)) {
      showAlert('지원하지 않는 파일 형식입니다. JPG, PNG, GIF, WebP, MP4, WebM 파일만 업로드 가능합니다.')
      return
    }

    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      showAlert('파일 크기는 50MB 이하여야 합니다.')
      return
    }

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      showAlert('파일을 선택해주세요.')
      return
    }

    if (selectedCategory === 'program' && !selectedProgram) {
      showAlert('프로그램을 선택해주세요.')
      return
    }

    setIsUploading(true)

    try {
      const programFiles = selectedCategory === 'program' && selectedProgram 
        ? mediaFiles.filter(f => f.programId === selectedProgram)
        : []
      
      const newMedia: MediaFile = {
        id: `media_${Date.now()}`,
        name: file.name,
        url: previewUrl || '',
        type: file.type.startsWith('video/') ? 'video' : 'image',
        category: selectedCategory,
        programId: selectedCategory === 'program' ? selectedProgram : undefined,
        order: programFiles.length,
        uploadedAt: new Date(),
        size: file.size
      }

      const updatedFiles = [...mediaFiles, newMedia]
      setMediaFiles(updatedFiles)
      localStorage.setItem('media-files', JSON.stringify(updatedFiles))

      showAlert('파일이 성공적으로 업로드되었습니다.')
      
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setActiveSubTab('library')
    } catch (error) {
      console.error('Upload failed:', error)
      showAlert('파일 업로드에 실패했습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  const deleteMedia = (mediaId: string) => {
    const updatedFiles = mediaFiles.filter(file => file.id !== mediaId)
    setMediaFiles(updatedFiles)
    localStorage.setItem('media-files', JSON.stringify(updatedFiles))
    showAlert('파일이 삭제되었습니다.')
  }

  const moveMedia = (mediaId: string, direction: 'up' | 'down', programId?: string) => {
    const programFiles = programId 
      ? mediaFiles.filter(f => f.programId === programId).sort((a, b) => a.order - b.order)
      : mediaFiles.filter(f => f.category === 'hero').sort((a, b) => a.order - b.order)
    
    const currentIndex = programFiles.findIndex(f => f.id === mediaId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= programFiles.length) return

    const updatedFiles = [...mediaFiles]
    const currentFile = programFiles[currentIndex]
    const swapFile = programFiles[newIndex]

    const currentFileIndex = updatedFiles.findIndex(f => f.id === currentFile.id)
    const swapFileIndex = updatedFiles.findIndex(f => f.id === swapFile.id)

    updatedFiles[currentFileIndex] = { ...currentFile, order: swapFile.order }
    updatedFiles[swapFileIndex] = { ...swapFile, order: currentFile.order }

    setMediaFiles(updatedFiles)
    localStorage.setItem('media-files', JSON.stringify(updatedFiles))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'hero': return '히어로 섹션'
      case 'program': return '프로그램'
      case 'gallery': return '갤러리'
      default: return '일반'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hero': return 'bg-purple-100 text-purple-700'
      case 'program': return 'bg-blue-100 text-blue-700'
      case 'gallery': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredFiles = filterProgram === 'all' 
    ? mediaFiles 
    : mediaFiles.filter(f => f.programId === filterProgram || (filterProgram === 'hero' && f.category === 'hero'))

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (a.programId === b.programId || a.category === b.category) {
      return a.order - b.order
    }
    return 0
  })

  return (
    <div>
      <h2 className="heading-2 mb-6">영상/이미지 업로드 관리</h2>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveSubTab('upload')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'upload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              파일 업로드
            </button>
            <button
              onClick={() => setActiveSubTab('library')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === 'library'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              미디어 라이브러리
            </button>
          </nav>
        </div>
      </div>

      {activeSubTab === 'upload' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">새 파일 업로드</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사용 위치
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('hero')
                    setSelectedProgram('')
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'hero'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  히어로 섹션
                </button>
                <button
                  onClick={() => setSelectedCategory('program')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'program'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  프로그램
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('gallery')
                    setSelectedProgram('')
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'gallery'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  갤러리
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('general')
                    setSelectedProgram('')
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'general'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  일반
                </button>
              </div>
            </div>

            {selectedCategory === 'program' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  프로그램 선택
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">프로그램을 선택하세요</option>
                  {PROGRAMS.map(program => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                파일 선택
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      클릭하여 파일 선택
                    </span>
                    {' '}또는 드래그 앤 드롭
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG, GIF, WebP, MP4, WebM (최대 50MB)
                  </p>
                </label>
              </div>
            </div>

            {previewUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  미리보기
                </label>
                <div className="border border-gray-200 rounded-lg p-4">
                  {fileInputRef.current?.files?.[0]?.type.startsWith('video/') ? (
                    <video
                      src={previewUrl}
                      controls
                      className="w-full max-w-md mx-auto rounded"
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full max-w-md mx-auto rounded"
                    />
                  )}
                  <div className="mt-3 text-sm text-gray-600">
                    <p>파일명: {fileInputRef.current?.files?.[0]?.name}</p>
                    <p>크기: {formatFileSize(fileInputRef.current?.files?.[0]?.size || 0)}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleUpload}
                disabled={!previewUrl || isUploading || (selectedCategory === 'program' && !selectedProgram)}
                className="btn-primary"
              >
                {isUploading ? '업로드 중...' : '업로드'}
              </Button>
              {previewUrl && (
                <Button
                  onClick={() => {
                    setPreviewUrl(null)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  variant="outline"
                >
                  취소
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeSubTab === 'library' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">미디어 라이브러리</h3>
            <div className="flex items-center gap-4">
              <select
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">전체</option>
                <option value="hero">히어로 섹션</option>
                {PROGRAMS.map(program => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-500">총 {sortedFiles.length}개</span>
            </div>
          </div>
          
          {sortedFiles.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-3 text-sm text-gray-500">
                {filterProgram === 'all' 
                  ? '아직 업로드된 파일이 없습니다.'
                  : '해당 카테고리에 파일이 없습니다.'}
              </p>
              <Button
                onClick={() => setActiveSubTab('upload')}
                className="mt-4"
                variant="outline"
              >
                파일 업로드하기
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedFiles.map((file, index) => {
                const programFiles = file.programId 
                  ? sortedFiles.filter(f => f.programId === file.programId)
                  : sortedFiles.filter(f => f.category === file.category)
                const fileIndex = programFiles.findIndex(f => f.id === file.id)
                
                return (
                  <div key={file.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      {file.type === 'video' ? (
                        <video
                          src={file.url}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-2 right-2 flex gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(file.category)}`}>
                          {getCategoryName(file.category)}
                        </span>
                        {file.programId && (
                          <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                            {PROGRAMS.find(p => p.id === file.programId)?.name}
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        순서: {fileIndex + 1}
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{file.type === 'video' ? '동영상' : '이미지'}</span>
                      </div>
                      <div className="mt-2 flex gap-1">
                        {fileIndex > 0 && (
                          <button
                            onClick={() => moveMedia(file.id, 'up', file.programId)}
                            className="flex-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                            title="위로 이동"
                          >
                            ↑
                          </button>
                        )}
                        {fileIndex < programFiles.length - 1 && (
                          <button
                            onClick={() => moveMedia(file.id, 'down', file.programId)}
                            className="flex-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                            title="아래로 이동"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(file.url)
                            showAlert('URL이 클립보드에 복사되었습니다.')
                          }}
                          className="flex-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                          URL 복사
                        </button>
                        <button
                          onClick={() => deleteMedia(file.id)}
                          className="flex-1 text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}