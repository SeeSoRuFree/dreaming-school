'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
}

interface ConfirmContextType {
  showConfirm: (options: ConfirmOptions) => Promise<boolean>
}

export const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined)

interface ConfirmProviderProps {
  children: ReactNode
}

export function ConfirmProvider({ children }: ConfirmProviderProps) {
  const [confirm, setConfirm] = useState<{
    isOpen: boolean
    title: string
    message: string
    confirmText: string
    cancelText: string
    resolve?: (value: boolean) => void
  }>({
    isOpen: false,
    title: '확인',
    message: '',
    confirmText: '확인',
    cancelText: '취소'
  })

  const showConfirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirm({
        isOpen: true,
        title: options.title || '확인',
        message: options.message,
        confirmText: options.confirmText || '확인',
        cancelText: options.cancelText || '취소',
        resolve
      })
    })
  }

  const handleConfirm = () => {
    if (confirm.resolve) {
      confirm.resolve(true)
    }
    setConfirm(prev => ({ ...prev, isOpen: false, resolve: undefined }))
  }

  const handleCancel = () => {
    if (confirm.resolve) {
      confirm.resolve(false)
    }
    setConfirm(prev => ({ ...prev, isOpen: false, resolve: undefined }))
  }

  const value = {
    showConfirm
  }

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmModal
        isOpen={confirm.isOpen}
        title={confirm.title}
        message={confirm.message}
        confirmText={confirm.confirmText}
        cancelText={confirm.cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  )
}