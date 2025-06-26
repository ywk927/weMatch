// src/pages/Home/HomeTab.jsx

import ProjectCard from '../../components/common/ProjectCard'
import './TabCommon.css'

const HomeTab = ({ projectList }) => {
  return (
    <div className="tab-container">
      {/* 상단 공통 헤더 */}
      <div className="center-header">
        <div className="center-header-emoji">🧩</div>
        <h2 className="center-header-title">weMatch!에 오신걸 환영합니다.</h2>
        <p className="center-header-desc">
          개발자끼리, 빠르게 매칭!<br />
          사이드 프로젝트 하고 싶은데 팀원이 없다고요?<br />
          weMatch가 함께할 사람을 찾아드릴게요.<br />
          지금 바로 Match하세요 🤝
        </p>
      </div>

      {/* 프로젝트 리스트 */}
      <div className="list-section">
        {projectList.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default HomeTab
