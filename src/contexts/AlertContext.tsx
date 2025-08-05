'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { AlertModal } from '@/components/ui/AlertModal'

interface AlertContextType {
  showAlert: (message: string, title?: string) => void
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined)

interface AlertProviderProps {
  children: ReactNode
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '알림',
    message: ''
  })

  const showAlert = (message: string, title: string = '알림') => {
    setAlert({
      isOpen: true,
      title,
      message
    })
  }

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }))
  }

  const value = {
    showAlert
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertModal
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        onClose={closeAlert}
      />
    </AlertContext.Provider>
  )
}