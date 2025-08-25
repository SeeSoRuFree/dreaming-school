'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { themes, ThemeType } from '@/types/theme'

const ThemeSelector = () => {
  const { currentTheme, setTheme, themeConfig } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themeIcons = {
    default: '🏠',
    modern: '💼',
    vibrant: '🎉',
    eco: '🌿'
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* 테마 토글 버튼 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg backdrop-blur-sm border-2 border-white/20 flex items-center justify-center text-2xl hover:scale-105 transition-all duration-300"
        style={{ 
          backgroundColor: `${themeConfig.colors.primary}20`,
          borderColor: themeConfig.colors.primary + '40'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {themeIcons[currentTheme]}
        </motion.span>
      </motion.button>

      {/* 테마 선택 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200/50 p-4 min-w-80"
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1">테마 선택</h3>
              <p className="text-sm text-gray-600">원하는 교육 컨셉을 선택하세요</p>
            </div>

            <div className="space-y-3">
              {Object.entries(themes).map(([key, theme]) => {
                const isSelected = currentTheme === key
                return (
                  <motion.button
                    key={key}
                    onClick={() => {
                      setTheme(key as ThemeType)
                      setIsOpen(false)
                    }}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                      isSelected 
                        ? 'border-gray-400 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    style={{
                      backgroundColor: isSelected ? theme.colors.background : 'white',
                      borderColor: isSelected ? theme.colors.primary : undefined
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                        style={{ backgroundColor: theme.colors.primary + '20' }}
                      >
                        {themeIcons[key as ThemeType]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 
                            className="font-semibold text-sm"
                            style={{ color: isSelected ? theme.colors.primary : '#374151' }}
                          >
                            {theme.name}
                          </h4>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {theme.description}
                        </p>
                      </div>
                    </div>

                    {/* 테마 컬러 미리보기 */}
                    <div className="flex space-x-1 mt-3">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/50"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/50"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/50"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* 현재 테마 키워드 미리보기 */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-2">현재 테마 특징:</div>
              <div className="flex flex-wrap gap-1">
                {themeConfig.keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="text-xs px-2 py-1 rounded-full border"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.primary + '40',
                      color: themeConfig.colors.primary
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSelector