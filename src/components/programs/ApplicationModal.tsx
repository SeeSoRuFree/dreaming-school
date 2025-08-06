'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  programTitle: string
}

export default function ApplicationModal({
  isOpen,
  onClose,
  programTitle
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    schoolName: '',
    grade: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // localStorage에 신청 데이터 저장
    const applications = JSON.parse(localStorage.getItem('programApplications') || '[]')
    const newApplication = {
      id: Date.now().toString(),
      programTitle,
      ...formData,
      createdAt: new Date().toISOString()
    }
    applications.push(newApplication)
    localStorage.setItem('programApplications', JSON.stringify(applications))
    
    // 폼 초기화
    setFormData({
      name: '',
      phone: '',
      email: '',
      schoolName: '',
      grade: '',
      message: ''
    })
    
    alert('신청이 완료되었습니다. 담당자가 확인 후 연락드리겠습니다.')
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-900">
            프로그램 신청하기
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {programTitle} 프로그램 신청을 위해 아래 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="홍길동"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">연락처 *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="010-1234-5678"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">학교명 *</Label>
              <Input
                id="schoolName"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
                placeholder="꿈을짓는 초등학교"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">학년 *</Label>
              <Input
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                placeholder="초등학교 4학년"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">추가 메시지</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="프로그램 참여 동기나 기타 전달사항을 입력해주세요."
              className="resize-none"
            />
          </div>
          
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800"
            >
              신청하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}