'use client'

import { useEffect } from 'react'
import { initializeProgramData } from '@/lib/program-data'

export default function DataInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // localStorage에 프로그램 데이터 초기화
    initializeProgramData()
  }, [])

  return <>{children}</>
}