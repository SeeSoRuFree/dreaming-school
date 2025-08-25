'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Heart, Users, Sparkles, MessageCircle, HandHeart, 
  Smile, Star, ArrowRight, Calendar, Clock, MapPin
} from 'lucide-react'

const VibrantCommunityHomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const programs = [
    {
      emoji: '🏠',
      title: '소형 집짓기 체험교육',
      description: '친구들과 함께 만드는 우리만의 공간',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-300',
      students: '320명 참여'
    },
    {
      emoji: '🔬',
      title: '과학창의교육',
      description: '호기심이 가득한 실험과 발견의 시간',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      students: '450명 참여'
    },
    {
      emoji: '🎨',
      title: '공간 재창조',
      description: '상상력으로 채우는 특별한 디자인',
      bgColor: 'bg-pink-100',
      borderColor: 'border-pink-300',
      students: '280명 참여'
    },
    {
      emoji: '🌱',
      title: '원예 프로그램',
      description: '자연과 교감하며 성장하는 시간',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-300',
      students: '380명 참여'
    },
    {
      emoji: '🌾',
      title: '농촌활성화',
      description: '마을과 함께 꿈꾸는 미래',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-300',
      students: '210명 참여'
    }
  ]

  const testimonials = [
    {
      message: "선생님들이 정말 친절하고 재미있게 가르쳐주셔서 매주 기다려져요!",
      author: "김민지 학생",
      school: "○○초등학교 5학년",
      avatar: "👧"
    },
    {
      message: "아이가 집에 와서 수업 이야기를 신나게 해요. 정말 즐거워하는 모습을 보니 뿌듯합니다.",
      author: "박○○ 학부모",
      school: "○○중학교 학부모",
      avatar: "👨"
    },
    {
      message: "함께 만들고 협력하면서 친구들과 더 가까워졌어요. 최고의 경험이었습니다!",
      author: "이준호 학생",
      school: "○○중학교 2학년",
      avatar: "👦"
    }
  ]

  const activities = [
    { icon: <Users />, count: '50+', label: '월간 프로그램' },
    { icon: <Heart />, count: '98%', label: '학생 만족도' },
    { icon: <Sparkles />, count: '2,840+', label: '행복한 학생들' },
    { icon: <HandHeart />, count: '100+', label: '열정 선생님' }
  ]

  return (
    <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 min-h-screen">
      {/* 플로팅 이모지 애니메이션 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {['🎈', '🌟', '🎨', '📚', '🌈'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{ x: Math.random() * window.innerWidth, y: -50 }}
            animate={{
              y: window.innerHeight + 50,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* 웰컴 섹션 */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-yellow-200 rounded-full px-4 py-2 mb-4">
              <span className="text-yellow-800 font-medium">🎉 함께 만드는 즐거운 배움</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              우리가 <span className="text-orange-500">함께</span> 성장하는 
              <span className="text-pink-500"> 공동체</span>
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto">
              웃음과 배움이 가득한 교실, 친구들과 선생님이 함께 만들어가는 특별한 시간
            </p>
          </motion.div>

          {/* 활동 지표 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-orange-100"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full text-white mb-3">
                  {activity.icon}
                </div>
                <div className="text-2xl font-bold text-gray-800">{activity.count}</div>
                <div className="text-gray-600">{activity.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 카드 섹션 */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900"
          >
            신나는 <span className="text-orange-500">프로그램</span>들
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  rotate: [-1, 1, -1, 0],
                  transition: { duration: 0.3 }
                }}
                className={`${program.bgColor} border-2 ${program.borderColor} rounded-3xl p-6 shadow-md hover:shadow-xl transition-all`}
              >
                <div className="text-5xl mb-4">{program.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-700 mb-4">{program.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-white/70 px-3 py-1 rounded-full">
                    {program.students}
                  </span>
                  <Link 
                    href="/programs" 
                    className="text-gray-700 hover:text-gray-900 font-medium flex items-center"
                  >
                    더보기 <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 후기 섹션 - 말풍선 스타일 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-pink-500">행복한</span> 이야기들
            </h2>
            <p className="text-gray-700 text-lg">실제 참여자들의 생생한 후기</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-xl relative"
              >
                {/* 말풍선 꼬리 */}
                <div className="absolute -bottom-4 left-16 w-8 h-8 bg-white transform rotate-45"></div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{testimonials[activeTestimonial].avatar}</div>
                  <div className="flex-1">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg mb-4 italic">
                      "{testimonials[activeTestimonial].message}"
                    </p>
                    <div>
                      <p className="font-bold text-gray-900">{testimonials[activeTestimonial].author}</p>
                      <p className="text-sm text-gray-600">{testimonials[activeTestimonial].school}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 후기 네비게이션 */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeTestimonial === index 
                      ? 'bg-orange-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-pink-400">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 backdrop-blur rounded-3xl p-12 max-w-3xl mx-auto"
          >
            <Smile className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              우리와 함께 행복한 배움을 시작해요!
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              즐거운 친구들과 따뜻한 선생님이 여러분을 기다리고 있어요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/programs" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
              >
                프로그램 참여하기 🎉
              </Link>
              <Link 
                href="/contact" 
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg inline-flex items-center"
              >
                <MessageCircle className="mr-2 w-5 h-5" /> 문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default VibrantCommunityHomePage