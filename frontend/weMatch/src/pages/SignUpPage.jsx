// SignUpPage.jsx

import './SignUpPage.css'
import { useState } from 'react'
import axiosInstance from '../lib/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'

import logoImg from '../assets/003.png'
import googleLogo from '../assets/icons/google.png'
import githubLogo from '../assets/icons/github.png'

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
    position: '',
    skills: [],
  })

  const [skillInput, setSkillInput] = useState({ name: '', level: '' })
  const { setToken, setUser } = useUserStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSkillChange = (e) => {
    setSkillInput({ ...skillInput, [e.target.name]: e.target.value })
  }

  // skill 입력 추가
  const addSkill = () => {
    if (skillInput.name && skillInput.level) {
      setForm({ ...form, skills: [...form.skills, skillInput] })
      setSkillInput({ name: '', level: '' })
    } else {
      alert('기술 이름과 level을 모두 입력해주세요.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('email', form.email)
      formData.append('password', form.password)
      formData.append('nickname', form.nickname)
      formData.append('position', form.position)
      formData.append('provider', 'local')
      formData.append('image', form.image)  // ✅ 이미지 포함
      formData.append('skills', JSON.stringify(form.skills)) // ✅ 배열은 stringify 필요  
      
      // 1. 회원가입 /auth/signup으로 이메일+비밀번호+닉네임 전송
      const res = await axiosInstance.post('/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      
      // 2. 자동 로그인 처리
      const { token } = res.data
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

  // OAuth 로직 추가
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/github'
  }
  
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google'
  }

  return (
    <div className="signup-container">
      <div className="signup-header">
        <img src={logoImg} alt="logo" />
        <h2>회원가입</h2>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* ✅ 좌우 나눔 영역 */}
        <div className="signup-2col">
          {/* 좌측: 이미지 업로드 */}
          <div className="profile-upload-box">
            <label htmlFor="imageUpload" className="profile-upload-label">
              {form.image ? (
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="프로필 미리보기"
                  className="profile-preview-img"
                />
              ) : (
                '이미지 업로드'
              )}
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
              />
            </label>
          </div>

          {/* 우측: 이메일/닉네임/비밀번호 */}
          <div className="right-fields">
            <input
              className="signup-input"
              type="email"
              name="email"
              placeholder="이메일"
              value={form.email}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={form.nickname}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 포지션 선택 */}
        <select
          className="signup-input"
          name="position"
          value={form.position}
          onChange={handleChange}
          required
        >
          <option value="">포지션을 선택하세요</option>
          <option value="웹 프론트엔드">웹 프론트엔드</option>
          <option value="웹 백엔드">웹 백엔드</option>
          <option value="풀스택">풀스택</option>
          <option value="기획자/PM">기획자/PM</option>
          <option value="디자이너">디자이너</option>
          <option value="DevOps/인프라">DevOps/인프라</option>
          <option value="QA">QA</option>
          <option value="데이터 엔지니어">데이터 엔지니어</option>
          <option value="데이터 분석가">데이터 분석가</option>
          <option value="마케터">마케터</option>
          <option value="작가/콘텐츠 에디터">작가/콘텐츠 에디터</option>
        </select>

        {/* 기술 입력 영역 */}
        <div className="skill-input-group">
          <div className="skill-input-left">
            <input
              type="text"
              name="name"
              placeholder="기술명 (예: React)"
              className="signup-input"
              value={skillInput.name}
              onChange={handleSkillChange}
            />
            <select
              name="level"
              className="signup-input"
              value={skillInput.level}
              onChange={handleSkillChange}
            >
              <option value="">숙련도</option>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>
          </div>
          <button type="button" className="skill-add-button" onClick={addSkill}>
            + 추가
          </button>
        </div>

        {/* 스킬 리스트 */}
        <ul className="skill-list">
          {form.skills.map((skill, idx) => (
            <li key={idx}>
              {skill.name} ({skill.level})
            </li>
          ))}
        </ul>

        {/* 제출 버튼 */}
        <button type="submit" className="signup-button">회원가입</button>
      </form>

      <div className="signup-footer">
        <span>이미 계정이 있으신가요?</span>
        <a onClick={() => navigate('/login')}>로그인</a>
      </div>

      <div className="divider"><span>OR</span></div>

      <button className="oauth-button" onClick={handleGoogleLogin}>
        <img src={googleLogo} alt="Google" /> 구글 계정으로 가입
      </button>
      <button className="oauth-button" onClick={handleGithubLogin}>
        <img src={githubLogo} alt="GitHub" /> GitHub 계정으로 가입
      </button>
    </div>
  )  
}