'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAlert } from '@/hooks/useAlert'
import { User } from '@/types'

interface MembersManagementTabProps {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export function MembersManagementTab({ users, setUsers }: MembersManagementTabProps) {
  const { showAlert } = useAlert()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'member' | 'crew' | 'admin'>('all')
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female' | 'other'>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isViewingDetail, setIsViewingDetail] = useState(false)

  // 회원 필터링
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesGender = filterGender === 'all' || user.gender === filterGender
    
    return matchesSearch && matchesRole && matchesGender
  })

  // 역할 변경
  const changeUserRole = (userId: string, newRole: 'member' | 'crew' | 'admin') => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    )
    setUsers(updatedUsers)
    localStorage.setItem('dream-house-users', JSON.stringify(updatedUsers))
    showAlert('회원 역할이 변경되었습니다.')
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700'
      case 'crew':
        return 'bg-emerald-100 text-emerald-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return '관리자'
      case 'crew':
        return '크루'
      default:
        return '일반회원'
    }
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male':
        return '남성'
      case 'female':
        return '여성'
      default:
        return '기타'
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  return (
    <div>
      <h2 className="heading-2 mb-6">회원 관리</h2>
      
      {/* 검색 및 필터 */}
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          {/* 검색 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              회원 검색
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 이메일, 전화번호로 검색"
              className="input-field"
            />
          </div>
          
          {/* 필터 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                회원 유형
              </label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as any)}
                className="input-field"
              >
                <option value="all">전체</option>
                <option value="member">일반회원</option>
                <option value="crew">크루</option>
                <option value="admin">관리자</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                성별
              </label>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value as any)}
                className="input-field"
              >
                <option value="all">전체</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* 회원 목록 */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">회원 목록</h3>
          <span className="text-sm text-gray-500">
            총 {filteredUsers.length}명 / 전체 {users.length}명
          </span>
        </div>
        
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            검색 결과가 없습니다.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    전화번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    성별
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    역할
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getGenderText(user.gender)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadge(user.role)}`}>
                        {getRoleName(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setIsViewingDetail(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* 회원 상세 보기 모달 */}
      {isViewingDetail && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-4">회원 상세 정보</h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">이름</p>
                  <p className="text-sm text-gray-900">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">성별</p>
                  <p className="text-sm text-gray-900">{getGenderText(selectedUser.gender)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">이메일</p>
                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">전화번호</p>
                  <p className="text-sm text-gray-900">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">가입 경로</p>
                  <p className="text-sm text-gray-900">{selectedUser.joinPath}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">가입일</p>
                  <p className="text-sm text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">첫 인상</p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {selectedUser.firstImpression}
                </p>
              </div>

              {/* 역할 변경 */}
              {selectedUser.id !== 'admin_default' && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">회원 역할</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        changeUserRole(selectedUser.id, 'member')
                        setSelectedUser({ ...selectedUser, role: 'member' })
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedUser.role === 'member'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      일반회원
                    </button>
                    <button
                      onClick={() => {
                        changeUserRole(selectedUser.id, 'crew')
                        setSelectedUser({ ...selectedUser, role: 'crew' })
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedUser.role === 'crew'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      크루
                    </button>
                    <button
                      onClick={() => {
                        changeUserRole(selectedUser.id, 'admin')
                        setSelectedUser({ ...selectedUser, role: 'admin' })
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedUser.role === 'admin'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      관리자
                    </button>
                  </div>
                </div>
              )}

              {/* 크루 상태 */}
              {selectedUser.role === 'crew' && (
                <div>
                  <p className="text-sm font-medium text-gray-500">크루 상태</p>
                  <p className="text-sm text-gray-900">
                    {selectedUser.crewStatus === 'approved' ? '승인됨' : 
                     selectedUser.crewStatus === 'pending' ? '대기중' : '거절됨'}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => {
                  setIsViewingDetail(false)
                  setSelectedUser(null)
                }}
                variant="outline"
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}