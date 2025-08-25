'use client'

import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [delayedPosition, setDelayedPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const requestRef = useRef<number>(0)
  const previousTimeRef = useRef<number>(0)

  // 터치 디바이스 체크
  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  useEffect(() => {
    if (isTouchDevice) return

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorState = () => {
      const target = document.elementFromPoint(position.x, position.y)
      if (target) {
        const isClickable = 
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          window.getComputedStyle(target).cursor === 'pointer'
        
        setIsPointer(isClickable)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    // 부드러운 애니메이션을 위한 RAF
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        
        // Lerp (선형 보간) 적용
        const speed = 0.35
        setDelayedPosition(prev => ({
          x: prev.x + (position.x - prev.x) * speed,
          y: prev.y + (position.y - prev.y) * speed
        }))
      }
      
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', updateCursorPosition)
    document.addEventListener('mousemove', updateCursorState)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition)
      document.removeEventListener('mousemove', updateCursorState)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [position.x, position.y, isTouchDevice])

  // 터치 디바이스에서는 렌더링하지 않음
  if (isTouchDevice) return null

  return (
    <>
      {/* 중앙 점 (실제 커서 위치) */}
      <div
        className={`custom-cursor-dot ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* 외부 링 (지연된 위치) */}
      <div
        className={`custom-cursor-ring 
          ${isPointer ? 'border-blue-500' : 'border-blue-600'} 
          ${isClicking ? 'scale-90' : ''} 
          ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: `${delayedPosition.x}px`,
          top: `${delayedPosition.y}px`,
        }}
      />
    </>
  )
}