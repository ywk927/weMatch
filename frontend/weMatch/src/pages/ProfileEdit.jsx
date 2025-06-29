import './ProfileEdit.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../lib/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'

import userDefault from '../assets/icons/user.png'
import logoImg from '../assets/003.png'

export default function ProfileEditPage() {
  const { user, setUser } = useUserStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nickname: '',
    position: '',
    skills: [],
    image: null,
    description: '',
  })

  const [skillInput, setSkillInput] = useState({ name: '', level: '' })

  // 초기값 세팅
  useEffect(() => {
    if (user) {
      setForm({
        nickname: user.nickname || '',
        position: user.position || '',
        skills: user.skills || [],
        image: null,
        description: user.description || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSkillChange = (e) => {
    setSkillInput({ ...skillInput, [e.target.name]: e.target.value })
  }

  const addSkill = () => {
    if (skillInput.name && skillInput.level) {
      setForm({ ...form, skills: [...form.skills, skillInput] })
      setSkillInput({ name: '', level: '' })
    } else {
      alert('기술 이름과 숙련도를 입력해주세요.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('nickname', form.nickname)
      formData.append('position', form.position)
      formData.append('skills', JSON.stringify(form.skills))
      formData.append('description', form.description)
      if (form.image) formData.append('image', form.image)

      // console.log('💾 제출 데이터 확인')
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1])
      // }

      const res = await axiosInstance.put('/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setUser(res.data)
      alert('✅ 프로필 수정 완료!')
      navigate('/profile')
    } catch (err) {
      alert('❌ 수정 실패')
      console.error(err)
    }
  }

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-header">
        <img src={logoImg} alt="logo" />
        <h2>프로필 수정</h2>
      </div>

      <form className="profile-edit-form" onSubmit={handleSubmit}>
        {/* 이미지 업로드 */}
        <div className="profile-upload-wrapper">
          <div className="profile-upload-box">
            <label htmlFor="imageUpload" className="profile-upload-label">
              {form.image ? (
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="미리보기"
                  className="profile-preview-img"
                />
              ) : (
                <img
                  src={userDefault}
                  alt="기존 이미지"
                  className="profile-preview-img"
                />
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
        </div>

        <div className="right-fields">
          {/* 닉네임 */}
          <h3>✔️ 닉네임</h3>
          <input
            className="profile-edit-input"
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={form.nickname}
            onChange={handleChange}
          />

          {/* 포지션 */}
          <h3>✔️ 포지션</h3>
          <select
            className="profile-edit-input"
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

          {/* 기술 입력 */}
          <h3>✔️ 기술 / 언어</h3>
          <div className="skill-input-group">
            <div className="skill-input-left">
              <input
                type="text"
                name="name"
                placeholder="기술명 (예: React)"
                className="profile-edit-input"
                value={skillInput.name}
                onChange={handleSkillChange}
              />
              <select
                name="level"
                className="profile-edit-input"
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

          <ul className="skill-list">
          {form.skills.map((skill, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '6px',
              }}
            >
              {skill.name} ({skill.level})
              <button
                type="button"
                onClick={() => {
                  const updatedSkills = [...form.skills]
                  updatedSkills.splice(idx, 1)
                  setForm({ ...form, skills: updatedSkills })
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'red',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

          {/* 자기소개 */}
          <h3>✔️ 자기소개</h3>
          <textarea
            className="profile-edit-input"
            name="description"
            placeholder="자신을 소개해 주세요 :)"
            rows={4}
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className="profile-edit-button">
          수정 완료
        </button>
      </form>
    </div>
  )
}