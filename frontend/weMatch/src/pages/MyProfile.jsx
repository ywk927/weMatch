import { useEffect, useState } from 'react'
import MyInfoCard from '../components/Profile/MyInfoCard'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))  // 문자열 → 객체로
    }
  }, [])

  return (
    <div className="container">
      <h1>내 프로필</h1>
      <button onClick={() => navigate('/profile/edit')}>수정하기</button>
      <MyInfoCard user={user} />
    </div>
  )
}

export default Profile
