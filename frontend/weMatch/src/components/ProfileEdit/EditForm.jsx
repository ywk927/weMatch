import { useEffect, useState } from 'react'
import axios from 'axios'
import EditInput from './EditInput'
import EditSelect from './EditSelect'
import EditSkillsInput from './EditSkillsInput'
import { useNavigate } from 'react-router-dom'
import './EditForm.css'

const EditForm = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nickname: '',
    level: '',
    skills: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('http://localhost:3000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const { nickname, level, skills } = res.data  // 구조 분해 할당
      // 받아온 데이터를 form으로 보내주기
      setForm({
        nickname,
        level,
        skills: skills.join(', ')   // 배열을 문자열로 바꾸기
      })
    })
  }, [])

  // 입력창의 변화 업데이트

  const handleChange = (e) => {
    const { name, value } = e.target    // name은 key 값에 해당함 (ex. nickname)
    setForm(prev => ({ ...prev, [name]: value }))   // 바뀐 값을 바꿔라
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  // 앱 초기화 방지
    const token = localStorage.getItem('token')
    try {
      const res = await axios.put('http://localhost:3000/api/users/me', {
        nickname: form.nickname,
        level: form.level,
        skills: form.skills.split(',').map(s => s.trim()) //문자열을 배열로 바꾸기
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert('프로필이 수정되었습니다!')
      localStorage.setItem('user', JSON.stringify(res.data))
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