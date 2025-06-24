// axiosInstance.js
// 공통 설정이 적용된 axios 인스턴스 생성
// API 요청 시, Authorization: Bearer <token> 헤더 자동 추가

import axios from 'axios'

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '/api', // 기본 경로 설정
})

// 요청 마다 JWT 자동 삽입
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // 토큰을 Authorization 헤더에 주입
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
