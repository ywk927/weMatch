// src/components/common/MiniUserCard.jsx

import './MiniUserCard.css'
import { useNavigate } from 'react-router-dom'
import userDefault from '../../assets/icons/user.png'

const MiniUserCard = ({ user }) => {
  const navigate = useNavigate()

  if (!user) return null
  
  const { _id, nickname, skills, position, image } = user
  const imageUrl = image ? `http://localhost:3000${image}` : userDefault
  const handleClick = () => {
    navigate(`/profile/${_id}`)
  }

  return (
    <div className="mini-user-card card-spacing" onClick={handleClick}>
      {/* 상단: 프로필 + 텍스트 */}
      <div className="mini-user-top">
        <img className="mini-user-img" src={imageUrl} alt="프로필" />
        <div className="mini-user-info">
          <div className="mini-user-nickname">{nickname || '익명'}</div>
          {position && (
            <div className="mini-user-position">
              <span className="check-icon">✔️</span> {position}
            </div>
          )}
        </div>
      </div>

      {/* 하단: 스킬 목록 */}
      <div className="mini-user-skills">
        {skills?.map((skill, idx) => (
          <span key={idx} className="mini-skill-tag">
            #{skill.name}({skill.level})
          </span>
        ))}
      </div>
    </div>
  )
}

export default MiniUserCard