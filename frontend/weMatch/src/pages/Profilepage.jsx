import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MyInfoCard from '../components/profile/MyInfoCard'

const ProfilePage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error('프로필 불러오기 실패:', err))
  }, [id])

  if (!user) return <p>로딩 중...</p>

  return (
    <div className="container">
      <h1>{user.nickname}님의 프로필</h1>
      <MyInfoCard user={user} />
    </div>
  )
}

export default ProfilePage
