import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import EditInput from './EditInput'
import EditSelect from './EditSelect'
import EditSkillsInput from './EditSkillsInput'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore.js'
import './EditForm.css'

const EditForm = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUserStore()

  const [form, setForm] = useState({
    nickname: '',
    level: '',
    skills: [{ name: '' }]
  })

  useEffect(() => {
    const initializeForm = (u) => {
      setForm({
        nickname: u.nickname || '',
        level: u.skills?.[0]?.level || '',  // ✅ skill에서 level 추출
        skills: (u.skills || []).map(skill => ({ name: skill.name }))
      })
    }

    if (user) {
      initializeForm(user)
    } else {
      axiosInstance.get('/auth/me')
        .then(res => {
          setUser(res.data)
          initializeForm(res.data)
        })
        .catch(err => {
          console.error('유저 정보 로딩 실패:', err)
        })
    }
  }, [user, setUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (newSkills) => {
    setForm(prev => ({ ...prev, skills: newSkills }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        nickname: form.nickname,
        level: form.level,
        skills: form.skills.map(s => ({
          name: s.name,
          level: form.level // ✅ 모든 기술에 동일한 숙련도 적용
        }))
      }

      const res = await axiosInstance.put('/users/me', payload)
      alert('프로필이 수정되었습니다!')
      setUser(res.data)
      navigate('/profile')
    } catch (err) {
      console.error('프로필 수정 실패:', err)
      alert('수정 실패')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='edit-form'>
      <EditInput label="닉네임" name="nickname" value={form.nickname} onChange={handleChange} />
      <EditSelect label="숙련도" name="level" value={form.level} onChange={handleChange} />
      <EditSkillsInput label="기술 스택" value={form.skills} onChange={handleSkillsChange} />
      <button type="submit">저장</button>
    </form>
  )
}

export default EditForm
