'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ExternalServicesTab() {
  const externalServices = [
    {
      id: 'maily',
      name: 'Maily 메일 서비스',
      description: '대량 메일 발송 및 메일 템플릿 관리',
      url: 'https://maily.so',
      icon: '📧',
      category: 'mail'
    },
    {
      id: 'nhn-sms',
      name: 'NHN Cloud SMS 서비스',
      description: '문자 메시지 발송 및 알림 관리',
      url: 'https://www.nhncloud.com/kr/service/notification/sms',
      icon: '💬',
      category: 'sms'
    }
  ]

  const handleServiceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div>
      <h2 className="heading-2 mb-6">메일/문자 관리</h2>
      
      <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-blue-900">외부 서비스 연동</h3>
            <p className="mt-1 text-sm text-blue-700">
              아래 서비스들을 클릭하면 각 서비스의 관리 페이지로 이동합니다.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {externalServices.map((service) => (
          <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleServiceClick(service.url)}>
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{service.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">{service.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleServiceClick(service.url)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  서비스 바로가기 →
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}