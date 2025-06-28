// src/components/common/UserCard.jsx

import './UserCard.css'
import userDefault from '../../assets/icons/user.png'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ user }) => {
  const navigate = useNavigate()
  if (!user) return null

  const { _id, nickname, position, description, email, skills, image } = user
  const imageUrl = image ? `http://localhost:3000${image}` : userDefault

  return (
    <div className="user-card" onClick={() => navigate(`/profile/${_id}`)}>
      {/* 좌측: 프로필 이미지 */}
      <div className="user-card-left">
        <img src={imageUrl} alt="프로필" className="user-profile-img" />
      </div>

      {/* 우측: 전체 내용 */}
      <div className="user-card-right">
        {/* 닉네임 + 포지션 */}
        <div className="user-card-top">
          <div className="user-nickname">{nickname || '익명'}</div>
          {position && <div className="user-position">✔ {position}</div>}
        </div>

        {/* 설명 */}
        <div className="user-description">
          {description || <i style={{ color: '#aaa' }}>소개가 없습니다.</i>}
        </div>

        {/* 스킬 */}
        <div className="user-skills">
          {skills?.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="skill-tag">
              #{skill.name}({skill.level})
            </span>
          ))}
        </div>

        {/* 이메일 */}
        <div className="user-email">@{email}</div>
      </div>
    </div>
  )
}

export default UserCard
