'use client'

import { Card } from "@/components/ui/card"
import { MapPin, Phone, Clock, Car, Bus, Train, CheckCircle } from 'lucide-react'

export default function LocationPage() {
  const contactInfo = {
    address: '경남 산청군 신안면 하정리 928-1',
    phones: ['010-2672-1109', '010-2863-2731'],
    hours: '평일 09:00 - 18:00'
  }

  const transportInfo = [
    {
      type: '자가용',
      icon: <Car className="w-5 h-5" />,
      description: '산청군청에서 신안면 방향으로 약 15분',
      details: [
        '경상남도 산청군 신안면 하정리 928-1',
        '네비게이션: "꿈을짓는학교" 또는 주소 검색'
      ]
    },
    {
      type: '대중교통',
      icon: <Bus className="w-5 h-5" />,
      description: '산청터미널에서 마을버스 이용',
      details: [
        '산청터미널 → 신안면 방향 마을버스',
        '하정리 정류장 하차 후 도보 5분'
      ]
    }
  ]


  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container-main py-16">
          <h1 className="heading-1 text-center">오시는 길</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            꿈을짓는학교 위치 정보 및 교통편 안내
          </p>
        </div>
      </section>

      <div className="container-main section-padding">
        <div className="max-w-6xl mx-auto">
          
          {/* 기본 정보 카드 - 개선된 디자인 */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="group relative p-8 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/20 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">주소</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{contactInfo.address}</p>
                <p className="text-sm text-gray-500 mt-2">꿈을짓는학교 사회적협동조합</p>
              </div>
            </Card>

            <Card className="group relative p-8 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/20 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">연락처</h3>
                <div className="space-y-2">
                  {contactInfo.phones.map((phone, index) => (
                    <button
                      key={index}
                      onClick={() => handleCallClick(phone)}
                      className="block text-gray-700 hover:text-blue-700 font-medium transition-colors mx-auto hover:scale-105 transform"
                    >
                      {phone}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="group relative p-8 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/20 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">운영시간</h3>
                <p className="text-gray-700 font-medium">{contactInfo.hours}</p>
                <p className="text-sm text-gray-500 mt-2">주말 및 공휴일 휴무</p>
              </div>
            </Card>
          </div>


          {/* 교통편 안내 - 개선된 레이아웃 */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">교통편 안내</h2>
              <p className="text-lg text-gray-600">자가용 또는 대중교통을 이용하여 방문하실 수 있습니다</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {transportInfo.map((transport, index) => (
                <Card key={index} className="group p-8 hover:shadow-xl transition-all duration-300 border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      {transport.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{transport.type}</h3>
                      <p className="text-gray-700 font-medium">{transport.description}</p>
                    </div>
                  </div>
                  
                  <div className="ml-16">
                    <ul className="space-y-3">
                      {transport.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-600">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* 추가 교통 정보 */}
            <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start gap-3">
                <Train className="w-6 h-6 text-amber-700 mt-1 flex-shrink-0" />
                <div className="text-amber-800">
                  <p className="font-semibold mb-1">추가 교통 정보</p>
                  <p className="text-sm leading-relaxed">
                    서울에서 출발 시 약 3시간 30분, 부산에서 출발 시 약 1시간 30분이 소요됩니다.
                    대중교통 이용 시 산청터미널까지 시외버스를 이용하신 후 마을버스로 환승하시면 됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}