// src/components/common/MiniProjectCard.jsx

import './MiniProjectCard.css'

const MiniProjectCard = ({ project }) => {
  const { title, description, skills, recruitCount } = project

  return (
    <div className="mini-project-card">
      <h5 className="project-title">{title}</h5>
      <p className="project-description">
        {description.length > 50 ? description.slice(0, 50) + '...' : description}
      </p>
      <div className="project-skills">
        {skills?.slice(0, 3).map((skill, idx) => (
          <span key={idx} className="skill-badge">#{skill}</span>
        ))}
      </div>
      <p className="project-recruit">모집 인원: {recruitCount}명</p>
    </div>
  )
}

export default MiniProjectCard
