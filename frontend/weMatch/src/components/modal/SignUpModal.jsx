// SignUpModal.jsx

import './ModalForm.css'
import { useState, useEffect } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'

import logoImg from '../../assets/003.png'
import googleLogo from '../../assets/icons/google.png'
import githubLogo from '../../assets/icons/github.png'

export default function SignUpModal() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
    position: '',
    provider: 'local',
    skills: [{ name: '', level: '' }]  // ✅ 기본값 1개
  })
  const { setToken, setUser } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('회원가입 폼 데이터:', form)
    try {
      // 1. 회원가입 /auth/signup으로 이메일+비밀번호+닉네임 전송
      const res = await axiosInstance.post('/auth/signup', form)
      const { token } = res.data

      // 2. 자동 로그인 처리
      setToken(token)
      const meRes = await axiosInstance.get('/auth/me')
      setUser(meRes.data)

      alert('✅ 회원가입 + 자동 로그인 성공!')
      navigate(-1)

    } catch (err) {
      alert('❌ 회원가입 실패.')
      console.error(err)
    }
  }

  // 모달 닫기 기능 추가
  const handleClose = () => {
    navigate(-1)
  }

  // +ESC 기능 추가
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') navigate(-1)
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
  <div className="modal-overlay" onClick={handleClose}>
    <div
      className="modal-container"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 닫기 버튼 */}
      <button className="modal-close" onClick={handleClose}>✕</button>

      <div className="modal-header">
        <img src={logoImg} alt="logo" />
        <h2>회원가입</h2>
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
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
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
         <select
            className="modal-input"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
          >
            <option value="">포지션을 선택하세요</option>
            <option value="웹 프론트엔드">웹 프론트엔드</option>
            <option value="웹 백엔드">웹 백엔드</option>
            <option value="모바일">모바일</option>
            <option value="풀스택">풀스택</option>
            <option value="디자이너">디자이너</option>
            <option value="기획자/PM">기획자/PM</option>
            <option value="QA">QA</option>
            <option value="DevOps/인프라">DevOps/인프라</option>
            <option value="데이터 엔지니어">데이터 엔지니어</option>
            <option value="데이터 분석가">데이터 분석가</option>
            <option value="마케터">마케터</option>
            <option value="작가/콘텐츠 에디터">작가/콘텐츠 에디터</option>
          </select>
         <div className="skill-section">
          <input
            className="modal-input"
            type="text"
            placeholder="기술 스택 (예: JavaScript)"
            value={form.skills[0].name}
            onChange={(e) => {
              const newSkills = [...form.skills]
              newSkills[0].name = e.target.value
              setForm({ ...form, skills: newSkills })
            }}
            required
          />
          <select
            className="modal-input"
            value={form.skills[0].level}
            onChange={(e) => {
              const newSkills = [...form.skills]
              newSkills[0].level = e.target.value
              setForm({ ...form, skills: newSkills })
            }}
            required
          >
            <option value="">숙련도 선택</option>
            <option value="초급">초급</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
          </select>
        </div>
        <button type="submit" className="modal-button">회원가입</button>
      </form>

      <div className="modal-footer">
        <span>이미 계정이 있으신가요?</span>
        <a
          onClick={() =>
            navigate('/login', {
              state: {
                background: location.state?.background || location,
              },
              replace: true,
            })
          }
        >
          로그인
        </a>
      </div>

      <div className="divider"><span>OR</span></div>

      <button className="oauth-button" onClick={handleGoogleLogin}>
        <img src={googleLogo} alt="Google" /> 구글 계정으로 가입
      </button>
      <button className="oauth-button" onClick={handleGithubLogin}>
        <img src={githubLogo} alt="GitHub" /> GitHub 계정으로 가입
      </button>
    </div>
  </div>
  )
}