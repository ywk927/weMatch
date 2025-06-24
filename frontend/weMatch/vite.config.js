// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 프록시 설정 추가 -> api로 시작되는 모든 요청은
    // Vite dev 대신 localhost:3000으로 프록시 됨을 의미
    // ex) /api/auth/signup -> http://localhost:3000/api/auth/signup
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 백엔드 서버 주소
        changeOrigin: true, // 헤더의 origin 값 -> 백엔드 주소로 변경(CORS 회피)
      },
    },
  },
})