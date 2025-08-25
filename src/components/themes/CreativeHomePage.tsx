'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const CreativeHomePage = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 min-h-screen">
      {/* 떠다니는 창의적 요소들 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-orange-300/30 rounded-full"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-16 w-12 h-12 bg-pink-300/30"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{
            rotate: [0, -90, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-yellow-300/20 rounded-lg"
          animate={{
            rotate: [0, 45, 90, 135, 180],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* About 섹션 - 대각선 분할 */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽 - 텍스트 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="mb-6">
                <span className="inline-block bg-orange-200 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  🎨 Creative Education
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
                  상상력을 현실로
                  <br />
                  <span className="text-pink-600">만드는 교육</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  꿈을짓는학교는 창의적 사고와 혁신적 아이디어를 키우는 교육 공간입니다. 
                  VR/AR 기술과 메이커 교육을 통해 학생들의 무한한 상상력을 현실로 구현합니다.
                </p>
              </div>

              {/* 창의 도구 아이콘들 */}
              <div className="flex space-x-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-white p-4 rounded-xl shadow-lg border border-orange-100"
                >
                  <div className="text-3xl">🎨</div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Digital Art</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="bg-white p-4 rounded-xl shadow-lg border border-pink-100"
                >
                  <div className="text-3xl">🥽</div>
                  <p className="text-sm font-medium text-gray-600 mt-2">VR/AR</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-white p-4 rounded-xl shadow-lg border border-yellow-100"
                >
                  <div className="text-3xl">🔧</div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Maker</p>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                창의 여행 시작하기 ✨
              </motion.button>
            </motion.div>

            {/* 오른쪽 - 비주얼 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="bg-gradient-to-br from-orange-200 to-pink-200 rounded-3xl p-8 transform rotate-3"
                >
                  <Image
                    src="/images/home/KakaoTalk_20240528_130049921_02.jpg"
                    alt="창의적 교육 현장"
                    width={500}
                    height={300}
                    className="rounded-2xl object-cover"
                  />
                </motion.div>
                
                {/* 플로팅 카드들 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-4 -left-4 bg-white p-3 rounded-lg shadow-lg border-2 border-orange-200"
                >
                  <div className="text-xl">💡</div>
                  <p className="text-xs font-medium">아이디어</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg border-2 border-pink-200"
                >
                  <div className="text-xl">🚀</div>
                  <p className="text-xs font-medium">실현</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs 섹션 - 3D 틸트 카드들 */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-orange-900 mb-4">
              창의력을 깨우는 <span className="text-pink-600">프로그램</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              상상력과 실용성이 만나는 혁신적인 교육 프로그램들
            </p>
          </motion.div>

          {/* 불규칙한 카드 배치 */}
          <div className="relative max-w-6xl mx-auto">
            {/* 첫 번째 줄 */}
            <div className="flex justify-center items-start space-x-8 mb-12">
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 15,
                  rotateX: 5,
                  z: 50
                }}
                className="bg-gradient-to-br from-orange-100 to-orange-200 p-8 rounded-3xl shadow-xl border border-orange-200 max-w-sm transform rotate-2"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-orange-900 mb-3">디지털 아트</h3>
                <p className="text-gray-700 mb-4">
                  태블릿과 디지털 도구를 활용한 창의적 작품 제작
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-300 text-orange-800 px-3 py-1 rounded-full text-xs">
                    창의성
                  </span>
                  <span className="bg-pink-300 text-pink-800 px-3 py-1 rounded-full text-xs">
                    디지털
                  </span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: -15,
                  rotateX: 5,
                  z: 50
                }}
                className="bg-gradient-to-br from-pink-100 to-pink-200 p-8 rounded-3xl shadow-xl border border-pink-200 max-w-sm transform -rotate-1 mt-8"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-4xl mb-4">🥽</div>
                <h3 className="text-2xl font-bold text-pink-900 mb-3">VR 체험</h3>
                <p className="text-gray-700 mb-4">
                  가상현실로 펼치는 무한한 상상의 세계
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-pink-300 text-pink-800 px-3 py-1 rounded-full text-xs">
                    몰입형
                  </span>
                  <span className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-xs">
                    미래기술
                  </span>
                </div>
              </motion.div>
            </div>

            {/* 두 번째 줄 */}
            <div className="flex justify-center items-start space-x-8">
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  rotateX: -5,
                  z: 50
                }}
                className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 rounded-3xl shadow-xl border border-yellow-200 max-w-sm transform rotate-1"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-2xl font-bold text-yellow-900 mb-3">메이커 스페이스</h3>
                <p className="text-gray-700 mb-4">
                  3D 프린팅과 IoT로 아이디어를 현실로
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-yellow-300 text-yellow-800 px-3 py-1 rounded-full text-xs">
                    제작
                  </span>
                  <span className="bg-orange-300 text-orange-800 px-3 py-1 rounded-full text-xs">
                    기술
                  </span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: -10,
                  rotateX: -5,
                  z: 50
                }}
                className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-3xl shadow-xl border border-green-200 max-w-sm transform -rotate-2 mt-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold text-green-900 mb-3">스토리텔링</h3>
                <p className="text-gray-700 mb-4">
                  상상력과 이야기가 만나는 창의적 표현
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-300 text-green-800 px-3 py-1 rounded-full text-xs">
                    창작
                  </span>
                  <span className="bg-blue-300 text-blue-800 px-3 py-1 rounded-full text-xs">
                    소통
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              모든 프로그램 탐험하기 🌟
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Gallery 섹션 - 모자이크형 Pinterest 스타일 */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-orange-900 mb-4">
              창의적 <span className="text-pink-600">순간들</span>
            </h2>
            <p className="text-xl text-gray-600">
              상상이 현실이 되는 마법 같은 순간들
            </p>
          </motion.div>

          {/* 모자이크 그리드 */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {[
              { src: "/images/home/KakaoTalk_20240528_130049921_22.jpg", title: "디지털 아트 작품", emoji: "🎨" },
              { src: "/images/home/KakaoTalk_20240528_130049921_23.jpg", title: "VR 체험", emoji: "🥽" },
              { src: "/images/home/KakaoTalk_20240528_130049921_27.jpg", title: "메이커 프로젝트", emoji: "🔧" },
              { src: "/images/home/KakaoTalk_20240516_190354456_11.jpg", title: "창의적 협업", emoji: "🤝" },
              { src: "/images/home/KakaoTalk_20240516_190354456_16.jpg", title: "상상력 발현", emoji: "💭" },
              { src: "/images/home/KakaoTalk_20240528_130049921_15.jpg", title: "혁신적 아이디어", emoji: "💡" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="break-inside-avoid mb-6"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100">
                  <div className="relative">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <span className="text-xl">{item.emoji}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      창의력과 상상력이 만나는 특별한 순간
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 - 스티커/배지 스타일 */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-pink-200 to-yellow-200"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🌟
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                창의적 여정을 함께 시작해요!
              </h2>
              
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                상상력을 현실로 만드는 특별한 교육 프로그램에 참여하고, 
                미래를 바꿀 혁신적인 아이디어를 함께 만들어보세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  🎨 창의 프로그램 체험하기
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-300 text-lg"
                >
                  💭 아이디어 공유하기
                </motion.button>
              </div>

              {/* 스티커 요소들 */}
              <div className="flex justify-center space-x-4 mt-10">
                {['🎯', '⚡', '🚀', '💡', '🌈'].map((emoji, index) => (
                  <motion.div
                    key={emoji}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="bg-white p-3 rounded-full shadow-lg text-2xl cursor-pointer"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CreativeHomePage