// src/components/common/LongProjectCard.jsx

import './LongProjectCard.css'
import { useNavigate } from 'react-router-dom'

const LongProjectCard = ({ project }) => {
  const { _id, title, description, skills, recruitCount, acceptedCount, creator } = project
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/project/${_id}`)
  }

  return (
    <div className="long-project-card" onClick={handleClick}>
      {/* 좌측: 제목, 닉네임, 설명 */}
      <div className="long-left">
        <div className="long-header">
          <span className="long-title">{title}</span>
          <span className="long-nickname">{creator?.nickname || '익명'}</span>
        </div>
        <div className="long-description">{description}</div>
      </div>

      {/* 우측: 스택, 인원 */}
      <div className="long-right">
        <div className="long-stack-label">🌱 필수 스택</div>
        <div className="long-skills">
          {skills?.slice(0, 6).map((skill, idx) => (
            <span key={idx} className="long-skill-badge">#{skill}</span>
          ))}
        </div>
        <div className="long-recruit">
          <span>{recruitCount}</span>🙋‍♂️
        </div>
      </div>
    </div>
  )
}

export default LongProjectCard
