'use client'

import Link from 'next/link'
import Image from 'next/image'
import { homeImageGroups } from '@/lib/home-images'

export default function Home() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Media */}
        <div className="absolute inset-0 w-full h-full">
          {/* GIF Fallback Background */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/home/hero.gif"
              alt="꿈을짓는학교 Hero Background"
              fill
              className="w-full h-full object-cover"
              sizes="100vw"
              priority
              unoptimized={true}
            />
          </div>
          
          {/* Video Background (overlay on gif) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover relative z-10"
            poster="/images/home/hero.gif"
            onError={(e) => {
              // Hide video if it fails to load, showing the GIF background
              e.currentTarget.style.display = 'none';
            }}
          >
            <source src="/images/02.dream builders F (1).mp4" type="video/mp4" />
          </video>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          
          {/* Gradient overlay for enhanced visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"></div>
          
          {/* Additional center overlay for text area */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/50 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto hero-content">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0px 0px 20px rgba(0,0,0,0.6)'}}>
            함께 <span className="text-blue-200 animate-pulse drop-shadow-lg">꿈</span>을 짓는
            <br />
            <span className="text-amber-200 drop-shadow-lg">학교</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white font-medium leading-relaxed max-w-4xl mx-auto drop-shadow-lg" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>
            <span className="text-blue-100 font-semibold">배움의 행복을 전하고 삶의 가치를 나누는</span><br />
            사회적협동조합으로<br />
            <span className="text-blue-100">품성교육 + 이론 + 실기</span>가 복합된 키자니아식 교육을 통해<br />
            <span className="text-white font-semibold">도서지역 청소년들의 전인적 성장</span>을 돕습니다
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/programs" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/30 border border-blue-500/50"
              style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
            >
              교육프로그램 둘러보기
            </Link>
            <Link 
              href="/about" 
              className="bg-white/25 backdrop-blur-enhanced hover:bg-white/35 text-white font-bold px-8 py-4 rounded-lg border-2 border-white/50 hover:border-white/70 transition-all duration-300 hover:scale-105 shadow-2xl"
              style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}
            >
              꿈을짓는학교 소개
            </Link>
          </div>
          
          {/* Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/15 backdrop-blur-enhanced rounded-lg p-6 border-2 border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-2xl">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>11명</div>
              <div className="text-white font-semibold drop-shadow-md" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>전문 조합원</div>
            </div>
            <div className="bg-white/15 backdrop-blur-enhanced rounded-lg p-6 border-2 border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-2xl">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>5가지</div>
              <div className="text-white font-semibold drop-shadow-md" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>주요 교육사업</div>
            </div>
            <div className="bg-white/15 backdrop-blur-enhanced rounded-lg p-6 border-2 border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-2xl">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>2022년</div>
              <div className="text-white font-semibold drop-shadow-md" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>설립</div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Introduction Section */}
      <section className="bg-gradient-to-b from-white to-blue-50">
        <div className="container-main section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">꿈을짓는학교는?</h2>
              <p className="text-xl text-blue-700 font-medium">배움의 행복을 전하고 삶의 가치를 나누는 사회적협동조합</p>
            </div>
            
            {/* Main Introduction Card */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-blue-100">
              {/* 배경 이미지 */}
              <div className="absolute inset-0 opacity-5">
                <Image
                  src="/images/home/KakaoTalk_20240528_130049921_02.jpg"
                  alt="꿈을짓는학교 배경"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              
              <div className="relative z-10 p-8 md:p-12">
                <div className="prose max-w-none text-center">
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    꿈을짓는학교는 <span className="font-semibold text-blue-700">OECD 국가 청소년 행복지수가 최하위</span>인 대한민국 청소년들에게
                    <span className="text-blue-700 font-semibold"> 집단성취감을 통한 바른 품성과 자긍심 회복</span>을 목적으로 설립되었습니다.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    특히 <span className="text-blue-700 font-semibold">도서 지역 청소년들의 열악한 교육환경 개선</span> 및 
                    교육기회 불평등을 해소하고, <span className="text-blue-700 font-semibold">인구소멸 위기지역의 작은학교 살리기</span>에 집중하고 있습니다.
                  </p>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl mt-8">
                    <p className="text-xl font-medium italic">
                      &ldquo;모든 체험학습의 주인공은 가르치는 사람이 아니라<br/>
                      언제나 배우려는 아이들이어야 한다는 것이 저희의 신념입니다.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">키자니아식 교육</h3>
                <p className="text-gray-600">품성교육 + 이론 + 실기가 복합된 현장감 있는 체험교육</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">전문 조합원 운영</h3>
                <p className="text-gray-600">다양한 분야의 전문가 11명이 함께하는 교육 공동체</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">지역사회 연계</h3>
                <p className="text-gray-600">지역업체 CSR활동 연계 및 폐교위기 학교 살리기 운동</p>
              </div>
            </div>
            
            {/* 활동 이미지 섹션 */}
            <div className="mt-16">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/home/KakaoTalk_20240528_130049921_02.jpg"
                    alt="활동 사진 1"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/home/KakaoTalk_20240528_130049921_07.jpg"
                    alt="활동 사진 2"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/home/KakaoTalk_20240528_130049921_08.jpg"
                    alt="활동 사진 3"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/home/KakaoTalk_20240528_130049921_09.jpg"
                    alt="활동 사진 4"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 교육 현장 섹션 */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container-main section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">우리가 만들어가는 교육 현장</h2>
              <p className="text-xl text-gray-600">학교와 지역사회가 함께하는 체험교육의 현장</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 교육 현장 이미지 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/home/KakaoTalk_20240516_190354456_11.jpg"
                    alt="학교 현장 교육"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/home/KakaoTalk_20240516_190354456_16.jpg"
                    alt="체험 학습 진행"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/home/KakaoTalk_20240528_130049921_15.jpg"
                    alt="야외 체험 활동"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              
              {/* 교육 방식 설명 */}
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">찾아가는 맞춤형 체험교육</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      학교로 직접 찾아가는 현장 중심 교육 프로그램 운영
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      각 학교의 환경과 특성에 맞춘 맞춤형 커리큘럼 제공
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      전문 교육 장비와 재료를 현장으로 이동하여 교육 진행
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      학교 내 유휴공간을 활용한 창의적 교육 환경 조성
                    </p>
                  </div>
                </div>
                
                {/* 교육 철학 */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">품성·이론·실기 복합교육</h4>
                  <p className="text-gray-700 leading-relaxed">
                    꿈을짓는학교는 <span className="font-semibold text-blue-700">품성교육 + 이론 + 실기</span>가 
                    복합된 키자니아식 교육을 통해 학생들이 있는 곳에서 최상의 교육을 제공합니다. 
                    7명의 전문 조합원과 교육봉사 크루가 각 분야별 전문성을 바탕으로 
                    도서 지역과 소규모 학교까지 찾아가는 교육 서비스를 실현합니다.
                  </p>
                </div>
                
                {/* 프로그램 운영 방식 */}
                <div className="border-l-4 border-blue-600 pl-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">프로그램별 운영 방식</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• <span className="font-medium">소형 집짓기</span>: 학교 운동장이나 강당에서 10~12회기 진행</li>
                    <li>• <span className="font-medium">과학창의교육</span>: 교실 및 과학실을 활용한 실험 교육</li>
                    <li>• <span className="font-medium">공간 리모델링</span>: 학교 유휴공간을 학생들과 함께 재창조</li>
                    <li>• <span className="font-medium">원예 프로그램</span>: 학교 텃밭이나 화단을 활용한 생태 교육</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview Section */}
      <section className="bg-gray-50">
        <div className="container-main section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">주요 교육사업</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              꿈을짓는학교가 운영하는 5가지 핵심 교육 프로그램을 소개합니다
            </p>
          </div>
          
          {/* Programs Grid - Different Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Featured Program - Large Card */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8 md:p-12 text-white">
                    <div className="inline-block bg-white/20 backdrop-blur rounded-lg px-4 py-2 mb-4">
                      <span className="text-sm font-semibold">대표 프로그램</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">소형 집짓기 체험교육</h3>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                      학생들이 직접 짓는 세상에서 가장 위대한 한 평 집 짓기 프로젝트
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-200 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-50">실기, 이론, 품성교육의 복합교육</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-200 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-50">키자니아식 현장감있는 교육</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-200 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-50">10~12회기 (회당 2~3시간)</span>
                      </li>
                    </ul>
                    <Link href="/programs" className="inline-flex items-center bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                      자세히 보기
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div className="relative bg-gradient-to-br from-blue-500/20 to-blue-700/20 h-full min-h-[300px] overflow-hidden">
                    <Image
                      src="/images/program/1/20200910_104741.jpg"
                      alt="소형 집짓기 체험교육 현장"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* 이미지 위 그라데이션 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-800/60 via-blue-600/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Programs - Smaller Cards */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border-l-4 border-blue-500">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">과학창의교육 및 체험학습</h3>
                  <p className="text-gray-600 mb-4">
                    비행기 원리 학습, 창의목공, IT메이커 교육 등 다양한 과학 체험
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">단기 및 심화과정 운영</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border-l-4 border-blue-500">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">공간 재창조 리모델링</h3>
                  <p className="text-gray-600 mb-4">
                    학교 유휴공간을 교육적 환경으로 리모델링하는 참여형 프로젝트
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">학생 참여형 공간 설계</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border-l-4 border-blue-500">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">원예프로그램</h3>
                  <p className="text-gray-600 mb-4">
                    텃밭과 꽃밭 가꾸기를 통한 생명 존중 교육과 정서 함양
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">10차수 체계적 교육</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border-l-4 border-blue-500">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">농촌활성화 사업</h3>
                  <p className="text-gray-600 mb-4">
                    주거역량강화 체험학습으로 지역 공동체 활성화 프로그램
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">지역 맞춤형 교육</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/programs" className="inline-flex items-center bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors shadow-lg">
              전체 프로그램 상세보기
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 특별한 순간들 섹션 */}
      <section className="bg-white">
        <div className="container-main section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">특별한 순간들</h2>
              <p className="text-xl text-gray-600">꿈을짓는학교에서 만들어가는 소중한 추억</p>
            </div>
            
            {/* 이벤트 이미지 갤러리 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src="/images/home/KakaoTalk_20240528_130049921_22.jpg"
                  alt="특별한 순간 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-semibold">함께하는 체험학습</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src="/images/home/KakaoTalk_20240528_130049921_23.jpg"
                  alt="특별한 순간 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-semibold">성취의 기쁨</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src="/images/home/KakaoTalk_20240528_130049921_27.jpg"
                  alt="특별한 순간 3"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-semibold">꿈의 실현</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                매 순간이 소중한 배움이 되는 <span className="text-blue-700 font-semibold">꿈을짓는학교</span>에서<br/>
                아이들은 자신의 가능성을 발견하고 <span className="text-blue-700 font-semibold">미래를 준비</span>합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container-main section-padding text-center">
          <h2 className="heading-2 mb-6">
            함께 꿈을 키워나가요
          </h2>
          <p className="body-text text-gray-700 mb-10 max-w-2xl mx-auto">
            꿈을 짓는 학교 사회적협동조합의 조합원이 되어<br />
            지역사회 교육 발전에 함께 참여해보세요.
          </p>
          <Link href="/signup" className="btn-primary inline-block hover-scale">
            지금 회원가입 하기
          </Link>
        </div>
      </section>
    </>
  )
}
