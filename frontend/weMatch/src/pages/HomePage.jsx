// src/pages/HomePage.jsx

import './HomePage.css'
import { useUserStore } from '../stores/useUserStore'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../lib/axiosInstance'

import HomeTab from '../components/home/HomeTab'
import MatchTab from '../components/home/MatchTab'
import MakeTab from '../components/home/MakeTab'
import BottomNav from '../components/nav/BottomNav'

import LongProjectCard from '../components/common/LongProjectCard'
import MiniUserCard from '../components/common/MiniUserCard'
import MiniProjectCard from '../components/common/MiniProjectCard'
import LongUserCard from '../components/common/LongUserCard'

import userDefault from '../assets/icons/user.png'

const HomePage = () => {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

  const [userList, setUserList] = useState([])
  const [projectList, setProjectList] = useState([]) 
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const [userRes, projectRes] = await Promise.all([
          axiosInstance.get('/users'),
          axiosInstance.get('/projects')
        ])
        setUserList(userRes.data)
        setProjectList(projectRes.data)
      } catch (err) {
        console.error('유저 or 프로젝트 불러오기 실패')
      }
    }
    fetchLists()
  }, [])

  return (
    <div>
      <div className="homepage-container">
        {/* 좌측 컨테이너 */}
        <aside className="left-container">
          <div className="left-top">
            {user ? (
              <LongUserCard user={user} isCurrentUser />
            ) : (
              <div
                className="login-prompt"
                onClick={() => navigate('/login', { state: { background: location } })}
                style={{ 
                  cursor: 'pointer',
                  alignItems: 'center',
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <img
                  src={userDefault}
                  alt="유저 기본 이미지"
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                <p>로그인 해주세요.</p>
              </div>
            )}
          </div>

          {user && (
            <div className="left-bottom">
              <h4>추천 프로젝트</h4>
              {projectList.slice(0, 3).map((project) => (
                <MiniProjectCard key={project._id} project={project} className="card-spacing" />
              ))}
            </div>
          )}
        </aside>

        {/* 중앙 컨테이너 */}
        <main className="center-container">
          <div className="scrollable-content">
            {activeTab === 'home' && <HomeTab projectList={projectList} />}
            {activeTab === 'match' && <MatchTab />}
            {activeTab === 'make' && <MakeTab projectLis={projectList} />} 
          </div>
        </main>

        {/* 우측 컨테이너 */}
        <aside className="right-container">
          <div className="right-top">
            <h4>인기 사용자</h4>
            {userList.slice(0, 4).map((user) => (
              <MiniUserCard key={user._id} user={user} className="card-spacing" />
            ))}

            <h4>조회수 높은 프로젝트</h4>
            {projectList.slice(0, 4).map((project) => (
              <MiniProjectCard key={project._id} project={project} className="card-spacing" />
            ))}
          </div>

          <footer className="right-bottom" />
        </aside>
      </div>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default HomePage
