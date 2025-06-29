// src/components/common/MiniProjectCard.jsx

import './MiniProjectCard.css'
import { useNavigate } from 'react-router-dom'

const MiniProjectCard = ({ project }) => {
  const { _id, title, skills, recruitCount } = project
  const acceptedCount = project.acceptedCount || 0
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/project/${_id}`)
  }

  return (
    <div className="mini-project-card card-spacing" onClick={handleClick}>
      <div className="mini-card-top">
        <div className="mini-card-left">
          <div className="mini-card-title">{title}</div>
          <div className="mini-card-nickname">{project.creator?.nickname || '익명'}</div>
        </div>
        <div className="mini-card-right">
          <div className="mini-card-recruit-label">모집 인원</div>
          <div className="mini-card-recruit-count">
            <span className="red">{recruitCount}</span> 🙋‍♂️
          </div>
        </div>
      </div>

      <div className="mini-card-bottom">
        <div className="mini-card-stack-label">🌱 필수 스택</div>
        <div className="mini-card-skills">
          {skills?.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="mini-card-skill-badge">#{skill}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MiniProjectCard
