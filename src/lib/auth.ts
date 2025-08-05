'use client'

import { User } from '@/types'

const AUTH_KEY = 'dream-house-auth'
const USERS_KEY = 'dream-house-users'

// Custom event for auth state changes
const AUTH_STATE_CHANGE_EVENT = 'auth-state-change'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Helper function to dispatch auth state change event
const dispatchAuthStateChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_STATE_CHANGE_EVENT))
  }
}

export const authUtils = {
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null
    
    try {
      const authData = localStorage.getItem(AUTH_KEY)
      if (!authData) return null
      
      const { userId } = JSON.parse(authData)
      const users = authUtils.getAllUsers()
      return users.find(user => user.id === userId) || null
    } catch {
      return null
    }
  },

  login: (email: string, password: string): { success: boolean; user?: User; error?: string } => {
    try {
      const users = authUtils.getAllUsers()
      const user = users.find(u => u.email === email)
      
      if (!user) {
        return { success: false, error: '사용자를 찾을 수 없습니다.' }
      }
      
      // Check if password matches stored password
      if (password !== user.password) {
        return { success: false, error: '비밀번호가 일치하지 않습니다.' }
      }
      
      localStorage.setItem(AUTH_KEY, JSON.stringify({ userId: user.id }))
      dispatchAuthStateChange() // Notify auth state change
      return { success: true, user }
    } catch {
      return { success: false, error: '로그인 중 오류가 발생했습니다.' }
    }
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_KEY)
    dispatchAuthStateChange() // Notify auth state change
  },

  register: (userData: Omit<User, 'id' | 'createdAt' | 'role' | 'crewStatus'>): { success: boolean; user?: User; error?: string } => {
    try {
      const users = authUtils.getAllUsers()
      
      // Check if email already exists
      if (users.some(u => u.email === userData.email)) {
        return { success: false, error: '이미 등록된 이메일입니다.' }
      }
      
      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        role: 'member',
        crewStatus: undefined
      }
      
      const updatedUsers = [...users, newUser]
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
      
      // Auto login after registration
      localStorage.setItem(AUTH_KEY, JSON.stringify({ userId: newUser.id }))
      dispatchAuthStateChange() // Notify auth state change
      
      return { success: true, user: newUser }
    } catch {
      return { success: false, error: '회원가입 중 오류가 발생했습니다.' }
    }
  },

  getAllUsers: (): User[] => {
    if (typeof window === 'undefined') return []
    
    try {
      const usersData = localStorage.getItem(USERS_KEY)
      return usersData ? JSON.parse(usersData) : []
    } catch {
      return []
    }
  },

  updateUser: (userId: string, updates: Partial<User>): boolean => {
    try {
      const users = authUtils.getAllUsers()
      const userIndex = users.findIndex(u => u.id === userId)
      
      if (userIndex === -1) return false
      
      users[userIndex] = { ...users[userIndex], ...updates }
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      
      return true
    } catch {
      return false
    }
  },

  isAuthenticated: (): boolean => {
    return authUtils.getCurrentUser() !== null
  },

  isCrew: (): boolean => {
    const user = authUtils.getCurrentUser()
    return user?.role === 'crew' && user?.crewStatus === 'approved'
  },

  isAdmin: (): boolean => {
    const user = authUtils.getCurrentUser()
    return user?.role === 'admin'
  },

  // Get auth state change event name
  getAuthStateChangeEvent: (): string => AUTH_STATE_CHANGE_EVENT,

  // Initialize default users and data for testing
  initializeDefaultUsers: (): void => {
    if (typeof window === 'undefined') return
    
    const users = authUtils.getAllUsers()
    
    if (users.length === 0) {
      // Import and initialize mock data
      import('@/lib/mock-data').then(({ initializeMockData }) => {
        initializeMockData()
      })
    } else {
      // Check if existing users have password field
      if (users[0] && !users[0].password) {
        // Force update with new data structure
        import('@/lib/mock-data').then(({ resetMockData }) => {
          resetMockData()
          window.location.reload() // Reload to apply changes
        })
      }
    }
  },

  // Force reset all data (for debugging)
  resetAllData: (): void => {
    if (typeof window === 'undefined') return
    
    import('@/lib/mock-data').then(({ resetMockData }) => {
      resetMockData()
      window.location.reload()
    })
  }
}

// Initialize default users when the module loads
if (typeof window !== 'undefined') {
  authUtils.initializeDefaultUsers()
}