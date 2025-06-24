// LogInModal.jsx

import { useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import { useUserStore } from '../../stores/useUserStore'

export default function LogInModal() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { setToken, setUser } = useUserStore()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // 1. 백엔드에 로그인 요청 -> 성공 시, 토큰 저장(zustand + localStorage)
      const res = await axiosInstance.post('/auth/login', form)
      const { token } = res.data
      setToken(token)

      // 2. 사용자 정보 요청 -> user로 저장
      const meRes = await axiosInstance.get('/auth/me')
      setUser(meRes.data)

      alert('로그인 성공!')
    } catch (err) {
      alert('로그인 실패')
      console.error(err)
    }
  }

  // OAuth 로직 추가
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/github'
  }
  
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google'
  }

  return (
    // 로그인폼
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="w-[400px] bg-white p-10 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#fff7e6] text-purple-800 placeholder-purple-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#fff7e6] text-purple-800 placeholder-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md font-semibold"
          >
            로그인
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-700">
          계정이 없으신가요?{' '}
          <span className="text-purple-700 font-semibold cursor-pointer">
            회원가입
          </span>
        </p>

        {/* 👉 Google 로그인 버튼 */}
        <button
          onClick={handleGoogleLogin}
          className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-semibold"
        >
          Google로 로그인
        </button>

        {/* 👉 GitHub 로그인 버튼 추가 */}
        <button
          onClick={handleGithubLogin}
          className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md font-semibold"
        >
          GitHub로 로그인
        </button>
      </div>
    </div>
  )
}
