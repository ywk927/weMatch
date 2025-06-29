// useUserStore.js
// 로그인 정보 저장(token -> 인증 토큰, user -> 사용자 정보)

// zustand로 전역 관리 -> 로그인 상태(token) + 사용자 정보(user) 관리
// localStorage에 자동 저장(persist 사용)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  // persist 미들웨어 적용
  persist(
    (set) => ({
      user: null, // 사용자 정보
      token: null, // JWT 토큰
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      // 로그아웃 시, 모두 초기화
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'user-store', // localStorage 키
      partialize: (state) => ({ token: state.token, user: state.user }), // 저장할 항목 제한 가능
    }
  )
)
