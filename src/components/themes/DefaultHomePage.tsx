'use client'

import Link from 'next/link'
import Image from 'next/image'
import { homeImageGroups } from '@/lib/home-images'
import InfiniteScrollGallery from '@/components/ui/InfiniteScrollGallery'

export default function DefaultHomePage() {
  return (
    <>
      {/* Educational Philosophy Section - Moved to top */}
      <section className="bg-white">
        <div className="container-main section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">꿈을짓는학교는?</h2>
            <p className="text-xl text-gray-600">배움의 행복을 전하고 삶의 가치를 나누는 사회적협동조합</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* 1. 왜 '집짓기'로 교육하는가? */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">왜 '집짓기'로 교육하는가?</h2>
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg">
                <p className="text-xl font-semibold text-blue-700 text-center mb-8">
                  자기 손으로 직접 집을 짓는 경험보다 더 큰 감동이 있을까요?
                </p>
                <div className="space-y-4 mb-8">
                  <p className="body-text leading-relaxed">
                    집짓기에는 <span className="font-semibold text-blue-700">서로 협력하고 도와주어야 이룰 수 있는 집단성취감</span>이 담겨 있습니다.
                  </p>
                  <p className="body-text leading-relaxed">
                    집짓기에는 <span className="font-semibold text-blue-700">생각의 범위를 확장시키는 과학과 수학의 원리</span>가 담겨 있습니다.
                  </p>
                  <p className="body-text leading-relaxed">
                    집짓기에는 <span className="font-semibold text-blue-700">각종 장비와 도구는 물론 톱질, 망치질의 굵은 땀방울</span>이 담겨 있습니다.
                  </p>
                  <p className="body-text leading-relaxed">
                    집짓기에는 <span className="font-semibold text-blue-700">인내와 책임감을 통한 인격적 성장</span>이 담겨 있습니다.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <p className="body-text leading-relaxed text-center">
                    우리가 집짓기 교육을 하는 것은 이론과 실제가 복합된 역동적 체험교육을 통해<br/>
                    우리 아이들의 자긍심이 회복되고 무엇이든 해낼 수 있다는 도전의 용기를 주고자 함입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 1-1. 왜 아이들은 집을 지으며 배워야 하는가? */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">왜 아이들은 집을 지으며 배워야 하는가?</h2>
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg">
                <div className="space-y-4">
                  <p className="body-text leading-relaxed">
                    청소년들의 바른 성장을 방해하는 가장 큰 요인 중 하나가 <span className="font-semibold text-blue-700">중독과 무기력증</span>입니다.
                  </p>
                  <p className="body-text leading-relaxed">
                    정적 프로그램의 비중이 높은 교육현실 속에서 청소년들의 <span className="font-semibold text-blue-700">역동적 에너지 발산 기회가 부족</span>합니다.
                  </p>
                  <p className="body-text leading-relaxed">
                    많은 청소년들 가운데 하고 싶은 것도 되고 싶은 것도 없는 <span className="font-semibold text-blue-700">심각한 무기력증</span>을 발견하게 됩니다.
                  </p>
                  <p className="body-text leading-relaxed">
                    집짓기 프로그램은 톱질, 망치질 등 역동적 활동이 중심이어서 청소년들의 <span className="font-semibold text-blue-700">역동성과 열정을 이끌어</span> 냅니다.
                  </p>
                  <p className="body-text leading-relaxed bg-amber-50 p-4 rounded-lg">
                    그리고 마침내 땀방울의 결실로 집이 완성되었을 때 느끼는 가슴 벅찬 성취감은<br/>
                    우리 아이들을 분명 한 단계 더 미래로 이끌어 나갈 것이라 확신합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. 무엇을 가르치는가? */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">무엇을 가르치는가?</h2>
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg">
                <p className="body-text leading-relaxed mb-6">
                  꿈을짓는학교는 단순히 집을 짓는 과정이 아닌 <span className="font-semibold text-blue-700">꿈을 짓는 과정</span>을 전달합니다.
                </p>
                <p className="body-text leading-relaxed mb-6">
                  집짓기에 참여한 모든 청소년들은 <span className="font-semibold text-blue-700">'Dream builders'</span>라는 정체성을 가지고
                  집과 함께 자신만의 꿈을 발견하고 세워 나가는 과정을 배우게 됩니다.
                </p>
                <p className="body-text leading-relaxed mb-6">
                  물론 그 과정 속에서 집을 구성하는데 필요한 <span className="font-semibold text-blue-700">수학과 과학적 원리, 집의 구조에 대한 지식,
                  각종 도구와 공구를 다루는 원리와 방법</span> 등을 함께 익혀 전인적인 성장을 도모하게 됩니다.
                </p>
                <p className="body-text leading-relaxed bg-blue-50 p-4 rounded-lg">
                  그 모든 과정 속에서 마침내 해낸 <span className="font-semibold text-blue-700">긍지와 자부심</span>,
                  한 사람 한 사람의 <span className="font-semibold text-blue-700">존엄성의 중요성</span>을 배우게 됩니다.
                </p>
              </div>
            </div>

            {/* 3. 어떻게 가르치는가? */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">어떻게 가르치는가?</h2>
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg">
                <p className="body-text leading-relaxed mb-6">
                  '세상에서 가장 위대한 한 평 집짓기' 프로그램은 <span className="font-semibold text-blue-700">품성교육+이론교육+실기교육이 복합된
                  키자니아식 교육방식</span>입니다.
                </p>
                <p className="body-text leading-relaxed mb-6">
                  참여자는 각종 도구를 장착한 실제 건축가의 복장으로 참여하여 <span className="font-semibold text-blue-700">모든 과정을 스스로 해 나가게</span> 됩니다.
                </p>
                <p className="body-text leading-relaxed mb-6">
                  그 과정에서 우리는 잘 하는 아이를 칭찬하기 보다 <span className="font-semibold text-blue-700">부족한 아이를 격려하고 북돋아
                  새로운 용기와 자기효능감을 높이고자</span> 합니다.
                </p>
                <p className="body-text leading-relaxed bg-emerald-50 p-4 rounded-lg">
                  우리 교육방식의 차별점은 품성교육을 통한 <span className="font-semibold text-emerald-700">올바른 인성과 사고력의 성장</span>에 초점을 맞춰
                  단순한 체험의 확대가 아닌 <span className="font-semibold text-emerald-700">심신의 성장, 인격적 성장</span>을 도모하는 것입니다.
                </p>
              </div>
            </div>

            {/* 4. 우리의 교육적 신념과 가치관 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">우리의 교육적 신념과 가치관</h2>
              
              {/* 이미지와 명언 */}
              <div className="mb-8">
                <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/home/mot.png"
                    alt="하나의 못을 박기 위한 망치자국"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <p className="text-white text-lg md:text-xl lg:text-2xl font-medium p-8 leading-relaxed">
                      "하나의 못을 박기 위해 수십 번 내리친 망치자국은<br />
                      실패의 흔적이 아니라<br />
                      마침내 이루어낸 의지의 자국이다"
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 설명 텍스트 */}
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                    우리의 교육적 신념을 상징적으로 표현한 우리의 표어같은 말입니다.
                  </p>
                  <div className="border-l-4 border-blue-500 pl-6 py-2">
                    <p className="text-xl text-gray-800 leading-relaxed font-medium">
                      우리는 아이들의 실패를 바라보지 않습니다.
                    </p>
                    <p className="text-xl text-gray-800 leading-relaxed font-medium mt-2">
                      우리는 마침내 해내고만 아이들의 의지를 바라보며 <span className="text-blue-600">진심 어린 박수</span>를 보냅니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-gradient-to-b from-white to-blue-50">
        <div className="container-main section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">핵심 가치</h2>
              <p className="text-xl text-blue-700 font-medium">꿈을짓는학교가 추구하는 교육 가치</p>
            </div>
            
            {/* Key Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-400 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">키자니아식 교육</h3>
                <p className="text-gray-600">품성교육 + 이론 + 실기가 복합된 현장감 있는 체험교육</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-400 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">전문 조합원 운영</h3>
                <p className="text-gray-600">다양한 분야의 전문가 11명이 함께하는 교육 공동체</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-400 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">지역사회 연계</h3>
                <p className="text-gray-600">지역업체 CSR활동 연계 및 폐교위기 학교 살리기 운동</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-white py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">활동 갤러리</h2>
          <p className="text-xl text-blue-700 font-medium">꿈을짓는학교의 다양한 활동 모습</p>
        </div>
        
        {/* 무한 스크롤 갤러리 */}
        <InfiniteScrollGallery 
          images={[
            { src: "/images/home/KakaoTalk_20240528_130049921_02.jpg", alt: "활동 사진 1" },
            { src: "/images/home/KakaoTalk_20240528_130049921_07.jpg", alt: "활동 사진 2" },
            { src: "/images/home/KakaoTalk_20240528_130049921_08.jpg", alt: "활동 사진 3" },
            { src: "/images/home/KakaoTalk_20240528_130049921_09.jpg", alt: "활동 사진 4" },
            { src: "/images/home/KakaoTalk_20240528_130049921_15.jpg", alt: "활동 사진 5" },
            { src: "/images/home/KakaoTalk_20240528_130049921_22.jpg", alt: "활동 사진 6" },
            { src: "/images/home/KakaoTalk_20240528_130049921_23.jpg", alt: "활동 사진 7" },
            { src: "/images/home/KakaoTalk_20240528_130049921_27.jpg", alt: "활동 사진 8" },
            { src: "/images/home/KakaoTalk_20240516_190354456_11.jpg", alt: "활동 사진 9" },
            { src: "/images/home/KakaoTalk_20240516_190354456_16.jpg", alt: "활동 사진 10" },
          ]}
          speed={40} // 40초에 한 사이클
        />
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
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-8 border-l-4 border-blue-400">
              <div className="">
                <div className="">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">과학창의교육 및 체험학습</h3>
                  <p className="text-gray-600 mb-4">
                    비행기 원리 학습, 창의목공, IT메이커 교육 등 다양한 과학 체험
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">단기 및 심화과정 운영</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-8 border-l-4 border-blue-400">
              <div className="">
                <div className="">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">공간 재창조 리모델링</h3>
                  <p className="text-gray-600 mb-4">
                    학교 유휴공간을 교육적 환경으로 리모델링하는 참여형 프로젝트
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">학생 참여형 공간 설계</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-8 border-l-4 border-blue-400">
              <div className="">
                <div className="">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">원예프로그램</h3>
                  <p className="text-gray-600 mb-4">
                    텃밭과 꽃밭 가꾸기를 통한 생명 존중 교육과 정서 함양
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">10차수 체계적 교육</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-8 border-l-4 border-blue-400">
              <div className="">
                <div className="">
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
      <section className="bg-white py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">특별한 순간들</h2>
          <p className="text-xl text-gray-600">꿈을짓는학교에서 만들어가는 소중한 추억</p>
        </div>
        
        {/* 무한 스크롤 갤러리 - 반대 방향 */}
        <div className="mb-12">
          <InfiniteScrollGallery 
            images={[
              { src: "/images/home/KakaoTalk_20240528_130049921_22.jpg", alt: "함께하는 체험학습" },
              { src: "/images/home/KakaoTalk_20240528_130049921_23.jpg", alt: "성취의 기쁨" },
              { src: "/images/home/KakaoTalk_20240528_130049921_27.jpg", alt: "꿈의 실현" },
              { src: "/images/home/KakaoTalk_20240528_130049921_02.jpg", alt: "협동 학습" },
              { src: "/images/home/KakaoTalk_20240528_130049921_07.jpg", alt: "창의적 활동" },
              { src: "/images/home/KakaoTalk_20240528_130049921_08.jpg", alt: "즐거운 수업" },
              { src: "/images/home/KakaoTalk_20240528_130049921_09.jpg", alt: "야외 활동" },
              { src: "/images/home/KakaoTalk_20240528_130049921_15.jpg", alt: "팀워크 활동" },
            ]}
            speed={35} // 다른 속도로 설정
          />
        </div>
        
        <div className="text-center px-4">
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            매 순간이 소중한 배움이 되는 <span className="text-blue-700 font-semibold">꿈을짓는학교</span>에서<br/>
            아이들은 자신의 가능성을 발견하고 <span className="text-blue-700 font-semibold">미래를 준비</span>합니다.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container-main section-padding text-center">
          <h2 className="heading-2 mb-6">
            함께 만들어가는 교육의 미래
          </h2>
          <p className="body-text text-gray-700 mb-10 max-w-2xl mx-auto">
            꿈을 짓는 학교와 함께 지역사회 교육 발전을 위한<br />
            다양한 프로그램과 협력 방안에 대해 문의해보세요.
          </p>
          <Link href="/contact" className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg inline-block">
            문의하기
          </Link>
        </div>
      </section>
    </>
  )
}