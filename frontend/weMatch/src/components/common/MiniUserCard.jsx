// src/components/common/MiniUserCard.jsx

import './MiniUserCard.css'

const MiniUserCard = ({ user }) => {
  const { nickname, skills, level } = user

  return (
    <div className="mini-user-card">
      <div className="user-header">
        <div className="user-nickname">@{nickname || '익명'}</div>
        {level && <span className="user-level">{level}</span>}
      </div>
      <div className="user-skills">
        {skills?.slice(0, 2).map((skill, idx) => (
          <span key={idx} className="skill-tag">#{skill}</span>
        ))}
      </div>
    </div>
  )
}

export default MiniUserCard
