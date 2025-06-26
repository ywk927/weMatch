// src/pages/Home/MakeTab.jsx

import { useNavigate } from 'react-router-dom'
import ProjectCard from '../../components/common/ProjectCard'
import './TabCommon.css'

const MakeTab = ({ projectList }) => {
  const navigate = useNavigate()

  return (
    <div className="tab-container">
      {/* 상단 공통 헤더 */}
      <div className="center-header">
        <div className="center-header-emoji">🛠</div>
        <h2 className="center-header-title">weMake! 프로젝트를 시작해보세요.</h2>
        <p className="center-header-desc">
          마음에 드는 팀이 없다면, 내가 직접 만들어봐요!<br/>
          혼자 시작해도, 금방 함께할 사람을 만나게 될 거예요.<br/>
          weMatch에서 자연스럽게 커넥트 & 매치!<br/>
          용기 있는 첫 걸음이 멋진 결과로 이어질 수 있어요 :)
        </p>
      </div>

      {/* 안내 박스 */}
      <div className="info-box">
        <div className="info-box-title">지금 바로 시작해보세요!</div>
        <div className="info-box-sub">새로운 프로젝트 만들기</div>
        <p className="info-box-desc">
          아이디어가 떠올랐다면?<br/>바로 프로젝트를 만들고 팀원을 모집해보세요.
        </p>
        <button className="info-box-button" onClick={() => navigate('/project/create')}>
          Make
        </button>
      </div>

      {/* 프로젝트 리스트 (null 체크 추가) */}
      <div className="list-section">
        {Array.isArray(projectList) &&
          projectList.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
      </div>
    </div>
  )
}

export default MakeTab
