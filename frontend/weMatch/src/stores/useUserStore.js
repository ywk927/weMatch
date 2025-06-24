// useUserStore.js
// 로그인 정보 저장(token -> 인증 토큰, user -> 사용자 정보)

// zustand로 전역 관리
import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  // 토큰이 있다면 로그인 유지, 없다면 로그아웃 상태
  token: localStorage.getItem('token') || null, // 새로고침 시, 유지
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token })
  },
  // 로그아웃 시, 토큰 삭제 + 정보 초기화(token, user)
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },
}))