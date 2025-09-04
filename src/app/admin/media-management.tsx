'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { Upload } from 'lucide-react'

export function MediaManagementTab() {
  const { showAlert } = useAlert()
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('')
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // localStorage에서 현재 설정된 동영상 URL 불러오기
    const savedUrl = localStorage.getItem('hero-video-url')
    const defaultUrl = 'https://oprwxbtukrafehaotgqm.supabase.co/storage/v1/object/public/sales-storage//test.mp4'
    
    if (savedUrl) {
      setCurrentVideoUrl(savedUrl)
    } else {
      setCurrentVideoUrl(defaultUrl)
      localStorage.setItem('hero-video-url', defaultUrl)
    }
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 비디오 파일 검증
    if (!file.type.startsWith('video/')) {
      showAlert('동영상 파일만 업로드할 수 있습니다.')
      return
    }

    // 파일 크기 체크 (100MB)
    const maxSize = 100 * 1024 * 1024
    if (file.size > maxSize) {
      showAlert('파일 크기는 100MB 이하여야 합니다.')
      return
    }

    setPreviewFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleUpload = () => {
    if (!previewFile) {
      showAlert('업로드할 동영상 파일을 선택해주세요.')
      return
    }

    // 실제 업로드는 백엔드가 필요하므로 URL만 저장
    // 여기서는 미리보기 URL을 임시로 저장 (실제로는 작동하지 않음)
    showAlert('백엔드 구현이 필요합니다. 현재는 URL 직접 입력만 가능합니다.')
    
    // UI 초기화
    setPreviewFile(null)
    setPreviewUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUrlInput = () => {
    const url = prompt('동영상 URL을 입력하세요:', currentVideoUrl)
    if (!url) return

    try {
      new URL(url)
      // 비디오 파일 확장자 체크
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov']
      const hasVideoExtension = videoExtensions.some(ext => url.toLowerCase().includes(ext))
      
      if (!hasVideoExtension) {
        showAlert('올바른 동영상 파일 URL이 아닙니다. (.mp4, .webm, .ogg, .mov)')
        return
      }

      localStorage.setItem('hero-video-url', url)
      setCurrentVideoUrl(url)
      showAlert('메인페이지 동영상이 변경되었습니다. 홈페이지를 새로고침하면 적용됩니다.')
    } catch {
      showAlert('올바른 URL 형식이 아닙니다.')
    }
  }

  const handleReset = () => {
    const defaultUrl = 'https://oprwxbtukrafehaotgqm.supabase.co/storage/v1/object/public/sales-storage//test.mp4'
    localStorage.setItem('hero-video-url', defaultUrl)
    setCurrentVideoUrl(defaultUrl)
    showAlert('기본 동영상으로 초기화되었습니다.')
  }

  return (
    <div>
      <h2 className="heading-2 mb-6">메인페이지 동영상 관리</h2>
      
      {/* 현재 동영상 */}
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">현재 메인페이지 동영상</h3>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              동영상 업로드
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              현재 URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentVideoUrl}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(currentVideoUrl)
                  showAlert('URL이 클립보드에 복사되었습니다.')
                }}
                variant="outline"
                size="sm"
              >
                복사
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              미리보기
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-black">
              {currentVideoUrl ? (
                <video
                  key={currentVideoUrl}
                  src={currentVideoUrl}
                  controls
                  className="w-full max-h-[400px] object-contain"
                >
                  <source src={currentVideoUrl} type="video/mp4" />
                  동영상을 재생할 수 없습니다.
                </video>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-gray-400">
                  동영상이 설정되지 않았습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* 파일 업로드 미리보기 */}
      {previewUrl && previewFile && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">업로드할 동영상</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                파일 정보
              </label>
              <div className="text-sm text-gray-600">
                <p>파일명: {previewFile.name}</p>
                <p>크기: {(previewFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                <p>형식: {previewFile.type}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                미리보기
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-black">
                <video
                  key={previewUrl}
                  src={previewUrl}
                  controls
                  className="w-full max-h-[400px] object-contain"
                >
                  동영상을 재생할 수 없습니다.
                </video>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleUpload}
                className="btn-primary"
              >
                업로드 (백엔드 필요)
              </Button>
              <Button
                onClick={() => {
                  setPreviewFile(null)
                  setPreviewUrl('')
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
                variant="outline"
              >
                취소
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* 안내 사항 */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h4 className="font-semibold text-amber-900 mb-2">⚠️ 주의사항</h4>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• 동영상 업로드 기능은 백엔드 구현이 필요합니다.</li>
          <li>• 현재는 URL 직접 입력 방식으로만 동영상을 변경할 수 있습니다.</li>
          <li>• 동영상 URL은 직접 접근 가능한 .mp4, .webm, .ogg, .mov 파일이어야 합니다.</li>
          <li>• 변경사항은 홈페이지를 새로고침하면 즉시 적용됩니다.</li>
        </ul>
      </div>
    </div>
  )
}