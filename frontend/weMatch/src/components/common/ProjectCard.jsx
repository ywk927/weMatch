// src/components/common/ProjectCard.jsx

import { useNavigate } from 'react-router-dom'
import './ProjectCard.css'

const ProjectCard = ({ project, className = '' }) => {
  const navigate = useNavigate()
  const {
    _id,
    title,
    description,
    skills = [],
    recruitCount = 0,
    creator
  } = project

  const acceptedCount = project.acceptedCount || 0

  const handleClick = () => {
    navigate(`/project/${_id}`)
  }

  return (
    <div className={`project-card ${className}`} onClick={handleClick}>
      <div className="project-card-header">
        <div>
          <div className="project-card-title">{title}</div>
          <div className="project-card-meta">{creator?.nickname || '익명'}</div>
        </div>
        <div className="project-card-recruit-right">
          <div className="project-card-recruit-count">
            <span className="red">{recruitCount}</span> 🙋‍♂️
          </div>
        </div>
      </div>
    
      <div className="project-description-box">
        {description?.length > 300 ? description.slice(0, 300) + '...' : description}
      </div>
    
      <div className="project-stack-label">🌱 필수 스택</div>
      <div className="project-skills">
        {skills?.map((skill, idx) => (
          <span key={idx} className="skill-badge">#{skill}</span>
        ))}
      </div>
    </div>
  )
}

export default ProjectCard
