// MyProfile.jsx

import './MyProfile.css'
import { useEffect, useState } from 'react'
import MyInfoCard from '../components/profile/MyInfoCard'
import MyApplications from '../components/profile/MyApplications'
import MyParticipations from '../components/profile/MyParticipations'
import MyProjects from '../components/profile/MyProjects'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../lib/axiosInstance'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/auth/me')
        setUser(res.data)
      } catch (err) {
        alert('❌ 로그인 정보가 유효하지 않습니다.')
        console.error(err)
        navigate('/login')
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>내 프로필</h1>
        <button onClick={() => navigate('/profile/edit')}>수정하기</button>
      </div>

      <div className="profile-section">
        <MyInfoCard user={user} />
      </div>
      <div className="profile-section">
        <MyProjects />
      </div>
      <div className="profile-section">
        <MyApplications />
      </div>
      <div className="profile-section">
        <MyParticipations />
      </div>
    </div>
  )
}

export default Profile
