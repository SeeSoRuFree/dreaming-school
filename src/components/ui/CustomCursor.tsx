'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHidden, setIsHidden] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // 터치 디바이스 체크
  const isTouchDevice = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  useEffect(() => {
    if (isTouchDevice) return

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    document.addEventListener('mousemove', updateCursorPosition)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isTouchDevice])

  // 터치 디바이스에서는 렌더링하지 않음
  if (isTouchDevice) return null

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-opacity duration-200 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`relative w-[60px] h-[30px] overflow-hidden transition-transform duration-100 ${isClicking ? 'scale-90' : 'scale-100'}`}
        style={{
          transformOrigin: 'top center'
        }}
      >
        <Image
          src="/images/Logo.png"
          alt="cursor"
          width={60}
          height={60}
          className="drop-shadow-lg absolute top-0 left-0"
        />
      </div>
    </div>
  )
}