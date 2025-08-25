'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeType, themes } from '@/types/theme'

interface ThemeContextType {
  currentTheme: ThemeType
  setTheme: (theme: ThemeType) => void
  themeConfig: typeof themes[ThemeType]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default')

  useEffect(() => {
    // localStorage에서 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('theme-preference') as ThemeType
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme)
    localStorage.setItem('theme-preference', theme)
  }

  const themeConfig = themes[currentTheme]

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}