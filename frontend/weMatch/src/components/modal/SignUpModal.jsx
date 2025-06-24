// SignUpModal.jsx

import { useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'

export default function SignUpModal() {
  const [form, setForm] = useState({ email: '', password: '', nickname: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // /auth/signup으로 이메일+비밀번호+닉네임 전송
      await axiosInstance.post('/auth/signup', form)
      alert('✅ 회원가입 성공! 로그인 해 주세요.')
    } catch (err) {
      alert('❌ 회원가입 실패.')
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
    // 회원가입 폼
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="w-[400px] bg-white p-10 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-700">회원가입</h2>

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
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={form.nickname}
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
            회원가입
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-700">
          이미 계정이 있으신가요?{' '}
          <span className="text-purple-700 font-semibold cursor-pointer">로그인</span>
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