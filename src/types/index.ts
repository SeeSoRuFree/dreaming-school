export interface Program {
  id: string
  title: string
  description: string
  duration: string
  target: string
  fee: number
  category: 'building' | 'gardening' | 'science' | 'rural' | 'remodeling'
  image?: string
  video?: string
  details?: string[]
  createdAt: Date
}

export interface ProgramSession {
  order: number
  title: string
  description: string
  images: string[]
}

export interface ProgramDetail {
  id: string
  title: string
  subtitle: string
  description: string
  target: string
  duration: string
  max_participants: number | string
  fee: string
  location: string
  sessions: ProgramSession[]
  category: 'building' | 'gardening' | 'science' | 'rural' | 'remodeling'
  is_active: boolean
  created_at: Date
  updated_at?: Date
}

export interface ProgramSessionData {
  id: string
  program_id: string
  order_num: number
  title: string
  description: string
  created_at: Date
  updated_at?: Date
  images?: ProgramSessionImage[]
}

export interface ProgramSessionImage {
  id: string
  session_id: string
  image_url: string
  order_num: number
  created_at: Date
}

export interface News {
  id: string
  title: string
  content: string
  category: 'news' | 'notice'
  createdAt: Date
  updatedAt?: Date
  featured?: boolean
  imageUrl?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  type: 'general' | 'donation'
  message: string
  createdAt: Date
  category?: string
  company?: string
  donationType?: 'corporate' | 'material' | 'equipment' | 'individual'
}

export interface GeneralInquiry {
  id: string
  name: string
  email: string
  title: string
  content: string
  category: '교육프로그램' | '시설이용' | '기타'
  isPublic: boolean
  createdAt: Date
  replies?: Reply[]
}

export interface Reply {
  id: string
  content: string
  author: string
  isOfficial: boolean
  createdAt: Date
}

export interface DonationInquiry {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  donationType: 'corporate' | 'material' | 'equipment' | 'individual'
  message: string
  createdAt: Date
}

export interface Member {
  id: string
  name: string
  email: string
  phone: string
  address: string
  birthDate: string
  occupation: string
  motivation: string
  createdAt: Date
}

export interface HistoryItem {
  id: string
  year: number
  month: number
  title: string
  description: string
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  gender: 'male' | 'female' | 'other'
  joinPath: string
  firstImpression: string
  createdAt: Date
  role: 'member' | 'crew' | 'admin'
  crewStatus?: 'pending' | 'approved' | 'rejected'
}

export interface CrewApplication {
  id: string
  userId: string
  motivation: string
  experience: string
  availableTime: string
  skills: string[]
  status: 'pending' | 'approved' | 'rejected'
  appliedAt: Date
  processedAt?: Date
  processedBy?: string
  notes?: string
}

export interface CrewPost {
  id: string
  authorId: string
  authorName: string
  title: string
  content: string
  images?: string[]
  likes: string[]
  comments: CrewComment[]
  createdAt: Date
  updatedAt?: Date
  category?: 'general' | 'event' | 'notice' | 'qa'
}

export interface CrewComment {
  id: string
  postId: string
  authorId: string
  authorName: string
  content: string
  createdAt: Date
  updatedAt?: Date
}


export interface EmailTemplate {
  id: string
  title: string
  subject: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export interface EmailSent {
  id: string
  templateId?: string
  subject: string
  content: string
  recipients: string[]
  recipientType: 'all' | 'members' | 'crew' | 'selected'
  sentAt: Date
  sentBy: string
}

export interface FootstepPost {
  id: string
  title: string
  content: string
  programCategory: 'building' | 'gardening' | 'science' | 'rural' | 'remodeling' | 'general'
  programName: string
  createdAt: Date
  updatedAt?: Date
  authorId: string
  authorName: string
}

export interface MediaCoverage {
  id: string
  mediaOutlet: string
  title: string
  articleUrl: string
  publishedAt: Date
  createdAt: Date
}