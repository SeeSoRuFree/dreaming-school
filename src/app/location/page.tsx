'use client'

import { Card } from "@/components/ui/card"
import { MapPin, Phone, Clock, Car, Bus, Navigation } from 'lucide-react'

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

  const handleMapClick = () => {
    // 카카오맵으로 연결 (실제 구현 시 좌표 사용)
    window.open('https://map.kakao.com/link/search/경남 산청군 신안면 하정리 928-1', '_blank')
  }

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
          
          {/* 기본 정보 카드 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">주소</h3>
              <p className="text-gray-600 leading-relaxed">{contactInfo.address}</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">연락처</h3>
              <div className="space-y-1">
                {contactInfo.phones.map((phone, index) => (
                  <button
                    key={index}
                    onClick={() => handleCallClick(phone)}
                    className="block text-gray-600 hover:text-blue-700 transition-colors mx-auto"
                  >
                    {phone}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">운영시간</h3>
              <p className="text-gray-600">{contactInfo.hours}</p>
              <p className="text-sm text-gray-500 mt-1">주말 및 공휴일 휴무</p>
            </Card>
          </div>

          {/* 지도 섹션 */}
          <div className="mb-12">
            <h2 className="heading-2 text-center mb-8">위치</h2>
            <Card className="overflow-hidden">
              <div className="relative">
                {/* 지도 플레이스홀더 - 실제로는 카카오맵이나 구글맵 API 사용 */}
                <div 
                  className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center cursor-pointer hover:from-blue-200 hover:to-blue-100 transition-colors"
                  onClick={handleMapClick}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">지도에서 보기</h3>
                    <p className="text-blue-600 mb-2">경남 산청군 신안면 하정리 928-1</p>
                    <p className="text-sm text-blue-500">클릭하여 카카오맵에서 확인하기</p>
                  </div>
                </div>
                
                {/* 지도 오버레이 버튼 */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={handleMapClick}
                    className="flex items-center gap-2 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-md text-blue-700 font-medium transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    길찾기
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* 교통편 안내 */}
          <div>
            <h2 className="heading-2 text-center mb-8">교통편 안내</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {transportInfo.map((transport, index) => (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {transport.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{transport.type}</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4 font-medium">{transport.description}</p>
                  
                  <ul className="space-y-2">
                    {transport.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-blue-700 mt-1.5">•</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* 추가 안내사항 */}
          <div className="mt-12">
            <Card className="bg-blue-50 border-blue-200 p-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">방문 안내</h3>
                <div className="max-w-2xl mx-auto space-y-3 text-blue-800">
                  <p>• 방문 전 사전 연락을 부탁드립니다.</p>
                  <p>• 주차공간이 마련되어 있습니다.</p>
                  <p>• 대중교통 이용 시 시간표를 미리 확인해 주세요.</p>
                  <p>• 길을 잃으실 경우 언제든 연락주시기 바랍니다.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  {contactInfo.phones.map((phone, index) => (
                    <button
                      key={index}
                      onClick={() => handleCallClick(phone)}
                      className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {phone}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}