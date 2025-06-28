import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../lib/axiosInstance'
import './ProjectDetail.css'
import MiniUserCard from '../components/common/MiniUserCard'
import LongUserCard from '../components/common/LongUserCard'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [applications, setApplications] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/projects/${id}`)
        const projectData = res.data.project

        setProject(projectData)
  
        const meRes = await axiosInstance.get('/auth/me')
        setCurrentUser(meRes.data)
  
        const appRes = await axiosInstance.get(`/projects/${id}/applications`)
        setApplications(appRes.data)
      } catch (err) {
        console.error(err)
      }
    }
  
    fetchData()
  }, [id])  

  if (!project) return <div>Loading...</div>

  const accepted = applications.filter((a) => a.status === 'accepted')
  const pending = applications.filter((a) => a.status === 'pending')
  const isCreator = currentUser?.id === project.creator._id
  const isFull = accepted.length >= project.recruitCount

  const handleApply = async () => {
    if (!currentUser) return navigate('/login', { state: { modal: true } })
    try {
      await axiosInstance.post(`/projects/${id}/apply`, { message: '' })
      alert('신청 완료')
    } catch (err) {
      alert('이미 신청했거나 오류 발생')
    }
  }

  return (
    <div className="project-detail-container">
      {/* 상단 헤더 */}
      <section className="project-detail-header-wrapper">
        <div className="project-detail-header">
          <span className="project-detail-tag">프로젝트</span>
          <h1 className="project-detail-title">{project.title}</h1>
          <div className="project-detail-creator-badge">{project.creator.nickname}</div>
          <div className="project-detail-recruit-status">{isFull ? '모집 완료' : '모집 중'}</div>
        </div>
      </section>
  
      {/* 본문 영역 */}
      <div className="project-detail-content-wrapper">
        {/* 좌측 콘텐츠 */}
        <div className="project-detail-content-left">
          {/* 모집 현황 */}
          <section className="project-detail-section">
            <div className="project-detail-section-header">
              <h3>모집 현황 ({accepted.length} / {project.recruitCount})</h3>
              {!isCreator && !isFull && (
                <button className="project-detail-apply-btn" onClick={handleApply}>지원하기</button>
              )}
              {isCreator && (
                <button
                  className="project-detail-apply-btn"
                  onClick={() => navigate(`/project/${id}/edit`)}
                >
                  수정하기
                </button>
              )}
            </div>
            <div className="project-detail-card-list">
              {accepted.map((a) => (
                <MiniUserCard key={a.user._id} user={a.user} />
              ))}
            </div>
          </section>
  
          {/* 프로젝트 안내 */}
          <section className="project-detail-section">
            <h3>프로젝트 안내</h3>
            <div className="project-detail-description">
              {project.description}
            </div>
          </section>
  
          {/* 필요 스택 */}
          <section className="project-detail-section">
            <h3>필요 스택</h3>
            <div className="project-detail-tag-list">
              {project.skills.map((skill, i) => (
                <span key={i} className="project-detail-skill-tag">#{skill}</span>
              ))}
            </div>
          </section>
  
          {/* 지원자 현황 */}
          <section className="project-detail-section">
            <h3>지원자 현황</h3>
            <div className="project-detail-card-list">
              {pending.map((a) => (
                <MiniUserCard key={a.user._id} user={a.user} />
              ))}
            </div>
          </section>
        </div>
  
        {/* 우측: 작성자 카드 */}
        <div className="project-detail-content-right">
          <LongUserCard user={project.creator} />
        </div>
      </div>
    </div>
  )  
}

export default ProjectDetail
