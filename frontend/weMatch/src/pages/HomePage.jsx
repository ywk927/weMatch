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

import MiniUserCard from '../components/common/MiniUserCard'
import MiniProjectCard from '../components/common/MiniProjectCard'

import userDefault from '../assets/icons/user.png'

const HomePage = () => {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

  const [userList, setUserList] = useState([])
  const [projectList, setProjectList] = useState([]) 
  const [activeTab, setActiveTab] = useState('home')

  // user -> api 수정 필요
  useEffect(() => {
    const fetchLists = async () => {
      // try {
      //   const [projectRes] = await Promise.all([
      //     axiosInstance.get('/users'),
      //     axiosInstance.get('/projects')
      //   ])
      //   setUserList(userRes.data)
      //   setProjectList(projectRes.data)
      // } catch (err) {
      //   console.error('유저 or 프로젝트 불러오기 실패')
      // }
      try {
        const projectRes = await axiosInstance.get('/projects')
        setProjectList(projectRes.data)
      } catch (err) {
        console.error('프로젝트 불러오기 실패')
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
              // MiniUserCard 사용 x
              // api 주소 상이 -> HomePage에서 따로 재구성
              <div
                className="my-user-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                  fontFamily: 'sans-serif',
                  gap: '1rem',
                }}
              >
                {/* 좌측 -> profile.img */}
                <img
                  src={userDefault}
                  alt="프로필 이미지"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  {/* 우측 -> nickname + level + skill */}
                  {/* nickname */}
                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      marginBottom: '0.25rem',
                      color: '#333',
                    }}
                  >
                    {user.nickname || '익명'}
                  </div>

                  {/* level */}
                  {user.level && (
                    <div
                      style={{
                        fontSize: '0.75rem',
                        backgroundColor: '#eee',
                        padding: '2px 6px',
                        borderRadius: '5px',
                        color: '#555',
                        display: 'inline-block',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {user.level}
                    </div>
                    )}

                    {/* skills */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {user.skills.map((skill, idx) => (
                        <span
                          key={skill._id || idx}
                          style={{
                            fontSize: '0.7rem',
                            backgroundColor: '#89C4E1',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          #{skill.name}
                        </span>
                      ))}
                    </div>

                </div>
              </div>
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

          {/* 로그인한 경우에만 추천 프로젝트 표시 */}
          {user && (
            <div className="left-bottom">
              <h4>추천 프로젝트</h4>
              {projectList.slice(0, 3).map((project) => (
                <MiniProjectCard key={project._id} project={project} />
              ))}
              {/* ... 추천 로직 추가 필요 */}
            </div>
          )}
        </aside>

        {/* 중앙 컨테이너 */}
        <main className="center-container">
          <div className="scrollable-content">
            {/* BottomNav 클릭에 따라 컴포넌트 렌더링 */}
            {activeTab === 'home' && <HomeTab projectList={projectList}/>}
            {/* userList 전달 필요 */}
            {activeTab === 'match' && <MatchTab />}
            {activeTab === 'make' && <MakeTab projectLis={projectList}/>} 
          </div>
        </main>

        {/* 우측 컨테이너 */}
        <aside className="right-container">
          <div className="right-top">
            <h4>조회수 높은 프로젝트</h4>
            {projectList.slice(0, 4).map((project) => (
              <MiniProjectCard key={project._id} project={project} />
            ))}

            <h4>인기 사용자</h4>
            {/* {userList.slice(0, 4).map((user) => (
              <MiniUserCard key={user.id} user={user} />
            ))} */}
          </div>

          <footer className="right-bottom">
            {/* 추후 텍스트 삽입 예정 */}
          </footer>
        </aside>
      </div>
      
      {/* BottomNav */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  )
}

export default HomePage