// src/pages/Profile.jsx

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import ProfileTabs from '../components/ProfileTabs'
import dummyUser from '../data/dummyUser.json'
// import ProfileBasic from '../components/ProfileBasic'
// import ProfilePosts from '../components/ProfilePosts'
// import ProfileProjects from '../components/ProfileProjects'
// import NetworkList from '../components/NetworkList'

const Profile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [currentTab, setCurrentTab] = useState('기본정보')

// 더미 유저 데이터
  useEffect(() => {
    setUser({...dummyUser, id: userId})
  }, [userId])
//   useEffect(() => {
//     // 실제 API fetch로 교체
//     fetch(`/api/users/${userId}`)
//       .then((res) => res.json())
//       .then((data) => setUser(data))
//   }, [userId])

  if (!user) return <div>Loading...</div>

  return (
    <div className="profile-container">
      <ProfileHeader user={user} />
      <ProfileTabs currentTab={currentTab} onChange={setCurrentTab} />
      {/* {currentTab === '기본정보' && <ProfileBasic user={user} />}
      {currentTab === '포스팅' && <ProfilePosts posts={user.posts} />}
      {currentTab === '프로젝트' && <ProfileProjects projects={user.projects} />}
      <NetworkList following={user.following} followers={user.followers} /> */}
    </div>
  )
}

export default Profile
