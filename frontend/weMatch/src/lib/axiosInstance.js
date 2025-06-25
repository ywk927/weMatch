
// axiosInstance.js
import axios from 'axios'

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// 요청마다 JWT 자동 삽입
axiosInstance.interceptors.request.use(
  (config) => {
    // ✅ Zustand persist 저장소에서 토큰 꺼내기
    const raw = localStorage.getItem('user-store')
    const parsed = raw ? JSON.parse(raw) : null
    const token = parsed?.state?.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
