'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Fallback background in case video doesn't load */}
          <div className="absolute inset-0 w-full h-full video-fallback"></div>
          
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover relative z-10"
            poster="/images/Logo.png"
            onError={(e) => {
              // Hide video if it fails to load, showing the fallback background
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
          <p className="text-xl md:text-2xl mb-8 text-white font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-lg" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>
            지역사회 교육 발전을 위한 사회적협동조합으로<br />
            <span className="text-blue-100 font-semibold">모든 사람이 꿈을 키우고 실현할 수 있는</span><br />
            교육의 기회를 제공합니다
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
              <div className="text-3xl font-bold text-amber-100 mb-2 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>500+</div>
              <div className="text-white font-semibold drop-shadow-md" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>교육 수료생</div>
            </div>
            <div className="bg-white/15 backdrop-blur-enhanced rounded-lg p-6 border-2 border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-2xl">
              <div className="text-3xl font-bold text-blue-100 mb-2 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>12</div>
              <div className="text-white font-semibold drop-shadow-md" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>다양한 프로그램</div>
            </div>
            <div className="bg-white/15 backdrop-blur-enhanced rounded-lg p-6 border-2 border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-2xl">
              <div className="text-3xl font-bold text-emerald-100 mb-2 drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>4년</div>
              <div className="text-white font-semibold drop-shadow-md" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>교육 운영 경험</div>
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

      {/* Features Section */}
      <section className="container-main section-padding">
        <h2 className="heading-2 text-center mb-12">우리가 추구하는 가치</h2>
        <div className="card-grid">
          <div className="card hover-lift text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="heading-4">다양한 교육과정</h3>
            <p className="text-gray-600">청소년부터 성인까지 다양한 연령대를 위한 맞춤형 교육 프로그램을 제공합니다.</p>
          </div>
          
          <div className="card hover-lift text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="heading-4">공동체 중심</h3>
            <p className="text-gray-600">사회적협동조합으로서 지역사회와 함께 성장하는 교육 공동체를 만들어갑니다.</p>
          </div>
          
          <div className="card hover-lift text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="heading-4">실용적 교육</h3>
            <p className="text-gray-600">이론과 실습을 병행하여 실제 삶에 도움이 되는 실용적인 교육을 지향합니다.</p>
          </div>
        </div>
      </section>


      {/* Programs Preview */}
      <section className="container-main section-padding">
        <div className="text-center mb-12">
          <h2 className="heading-2">인기 교육 프로그램</h2>
          <p className="body-text text-gray-600 mt-4">꿈을 짓는 학교의 대표 교육과정을 소개합니다</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="card-program hover-lift">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">청소년 창업 교육</h3>
              <p className="text-gray-600 mb-4">창업에 대한 기초 지식과 실무 능력을 기를 수 있는 프로그램</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">3개월 과정</span>
                <span className="text-lg font-bold text-blue-700">무료</span>
              </div>
            </div>
          </div>
          
          <div className="card-program hover-lift">
            <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">디지털 리터러시</h3>
              <p className="text-gray-600 mb-4">디지털 시대에 필요한 기초 컴퓨터 활용 능력 교육</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">2개월 과정</span>
                <span className="text-lg font-bold text-blue-700">30,000원</span>
              </div>
            </div>
          </div>
          
          <div className="card-program hover-lift">
            <div className="h-48 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">성인 평생교육</h3>
              <p className="text-gray-600 mb-4">새로운 기술과 지식을 습득할 수 있는 평생교육 과정</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">6개월 과정</span>
                <span className="text-lg font-bold text-blue-700">50,000원</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/programs" className="btn-soft inline-block">
            모든 프로그램 보기 →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-50 to-amber-50">
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
