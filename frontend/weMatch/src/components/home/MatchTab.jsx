// src/pages/Home/MatchTab.jsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../lib/axiosInstance'
import UserCard from '../../components/common/UserCard'
import './TabCommon.css'

const MatchTab = () => {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('/users')
        setUserList(res.data)
      } catch (err) {
        console.error('유저 목록 로드 실패:', err)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="tab-container">
      {/* 상단 공통 헤더 */}
      <div className="center-header">
        <div className="center-header-emoji">🤝</div>
        <h2 className="center-header-title">weMatch에 오신 걸 환영합니다.</h2>
        <p className="center-header-desc">
          나와 잘 맞는 팀원이 필요하다면,<br/>
          지금 바로 다양한 개발자들을 둘러보세요.<br/>
          기술 스택, 관심사, 경험치를 바탕으로<br/>
          당신과 잘 맞는 사람과 커넥트하고 함께 프로젝트를 시작해보세요.
        </p>
      </div>

      {/* 안내 박스 */}
      <div className="info-box">
        <div className="info-box-title">Match 전에 잠깐!</div>
        <div className="info-box-sub">지금 내 프로필, 매치 준비 완료일까? 🧐</div>
        <p className="info-box-desc">
          매치 성공의 시작은 내 프로필입니다.<br/>
          기술 스택, 소개, 경험을 깔끔히 정리해두면<br/>
          당신을 찾는 팀이 먼저 다가올 거예요.
        </p>
        <button className="info-box-button" onClick={() => navigate('/profile')}>
          내 프로필 점검
        </button>
      </div>

      {/* 유저 리스트 */}
      <div className="list-section scrollable-user-list">
        {userList.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default MatchTab
