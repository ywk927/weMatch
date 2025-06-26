// LogInModal.jsx

import './ModalForm.css'
import { useState, useEffect } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import { useUserStore } from '../../stores/useUserStore'
import { useNavigate, useLocation } from 'react-router-dom'

import logoImg from '../../assets/003.png'
import googleLogo from '../../assets/icons/google.png'
import githubLogo from '../../assets/icons/github.png'

export default function LogInModal() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { setToken, setUser } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

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

      // 3. 이전 페이지로 돌아가기
      navigate(-1)

    } catch (err) {
      alert('로그인 실패')
      console.error(err)
    }
  }
  
  
  // 모달 닫기 버튼 추가
  const handleClose = () => {
    navigate(-1)
  }
  
  // +ESC 기능 추가
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        navigate(-1)
      }
    }
    
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [navigate])
  
  // OAuth 로직 추가
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/github'
  }
  
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google'
  }

return (
  <div
    className="modal-overlay"
    onClick={handleClose}
  >
    <div
      className="modal-container"
      onClick={(e) => e.stopPropagation()}
    >
        {/* 닫기 버튼 */}
        <button className="modal-close" onClick={handleClose}>✕</button>

        <div className="modal-header">
          <img src={logoImg} alt="logo" />
          <h2>로그인</h2>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            className="modal-input"
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="modal-input"
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit" className="modal-button">로그인</button>
        </form>

        <div className="modal-footer">
          <span>계정이 없으신가요?</span>
          <a
            onClick={() =>
              navigate('/signup', {
                state: {
                  background: location.state?.background || location,
                },
                replace: true,
              })
            }
          >
            회원가입
          </a>
        </div>

        <div className="divider"><span>OR</span></div>

        <button className="oauth-button" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="Google" /> 구글 계정으로 로그인
        </button>
        <button className="oauth-button" onClick={handleGithubLogin}>
          <img src={githubLogo} alt="GitHub" /> GitHub 계정으로 로그인
        </button>
    </div>
  </div>
  )
}