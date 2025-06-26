// src/components/common/UserCard.jsx

import './UserCard.css'
import userDefault from '../../assets/icons/user.png'

const UserCard = ({ user }) => {
  const { nickname, skills, level, description } = user

  return (
    <div className="user-card">
      {/* 상단 */}
      <div className="user-card-header">
        <img src={userDefault} alt="프로필" className="user-profile-img" />
        <div className="user-header-content">
          <div className="user-header-top">
            <span className="user-name">{nickname || '익명'}</span>
            <button className="follow-btn">+ 팔로우</button>
          </div>
          <div className="user-position">{level || '포지션 미정'}</div>
          <div className="user-skills">
            {skills?.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="skill-tag">#{skill}</span>
            ))}
          </div>
        </div>
        <div className="user-card-time">25.06.26 (3시간 전 갱신)</div>
      </div>

      {/* 버튼 */}
      <div className="user-card-buttons">
        <button className="tag-btn">🙋‍♂️ 자기소개</button>
        <button className="tag-btn">👥 팀원모집</button>
      </div>

      {/* 설명 */}
      <div className="user-card-body">
        {description ? (
          <p>{description}</p>
        ) : (
          <p style={{ color: '#ccc', fontStyle: 'italic' }}>소개가 아직 없습니다.</p>
        )}
      </div>
    </div>
  )
}

export default UserCard
