import { useEffect, useState } from 'react'
import MyInfoCard from '../components/Profile/MyInfoCard'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('user-store')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const userData = parsed?.state?.user
        if (userData) {
          setUser(userData)
        }
      } catch (e) {
        console.error('user-store 파싱 오류:', e)
      }
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
