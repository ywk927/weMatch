import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import EditInput from './EditInput'
import EditSelect from './EditSelect'
import EditSkillsInput from './EditSkillsInput'
import { useNavigate } from 'react-router-dom'
import { useUserStore }  from '../../stores/useUserStore.js'
import './EditForm.css'

const EditForm = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUserStore()

  const [form, setForm] = useState({
    nickname: '',
    level: '',
    skills: ''
  })

  useEffect(() => {
    if (user) {
      setForm({
        nickname: user.nickname || '',
        level: user.level || '',
        skills: (user.skills || []).join(', ')
      })
    } else {
      // fallback으로 서버에서 user 다시 받아오기
      axiosInstance.get('/auth/me')
        .then(res => {
          const { nickname, level, skills } = res.data
          setForm({
            nickname,
            level,
            skills: skills.join(', ')
          })
          setUser(res.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [user, setUser])


  // 입력창의 변화 업데이트

  const handleChange = (e) => {
    const { name, value } = e.target    // name은 key 값에 해당함 (ex. nickname)
    setForm(prev => ({ ...prev, [name]: value }))   // 바뀐 값을 바꿔라
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  // 앱 초기화 방지
    try {
      const res = await axiosInstance.put('/users/me', {
        nickname: form.nickname,
        level: form.level,
        skills: form.skills.split(',').map(s => s.trim()) //문자열을 배열로 바꾸기
      })

      alert('프로필이 수정되었습니다!')
      setUser(res.data)
      navigate('/profile')
    } catch (err) {
      console.error(err)
      alert('수정 실패')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='edit-form'>
      <EditInput label="닉네임" name="nickname" value={form.nickname} onChange={handleChange} />
      <EditSelect label="숙련도" name="level" value={form.level} onChange={handleChange} />
      <EditSkillsInput label="기술 스택" name="skills" value={form.skills} onChange={handleChange} />
      <button type="submit">저장</button>
    </form>
  )
}

export default EditForm