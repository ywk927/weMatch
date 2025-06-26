// src/components/common/ProjectCard.jsx

import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  const { title, description, skills, recruitCount, author, updatedAt } = project

  return (
    <div className="project-card">
      {/* 상단 정보 */}
      <div className="project-card-header">
        <div className="project-card-title">{title}</div>
        <div className="project-card-meta">
          <span className="project-author">{author?.nickname || '익명'}</span>
          <span className="dot">·</span>
          <span className="project-date">{updatedAt || '방금 전'}</span>
        </div>
      </div>

      {/* 기술스택 + 모집 */}
      <div className="project-meta-area">
        <div className="project-skills">
          {skills?.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="skill-badge">#{skill}</span>
          ))}
        </div>
        <div className="project-recruit">모집: {recruitCount || 0}명</div>
      </div>

      {/* 설명 */}
      <div className="project-description">
        {description?.length > 100 ? description.slice(0, 100) + '...' : description}
      </div>

      {/* 하단 버튼 */}
      <div className="project-card-footer">
        <button className="project-detail-btn">더보기</button>
      </div>
    </div>
  )
}

export default ProjectCard
