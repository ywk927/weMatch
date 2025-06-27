import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import MiniProjectCard from '../common/MiniProjectCard'

const statusText = {
  pending: '⏳ 대기 중',
  accepted: '✅ 수락됨',
  rejected: '❌ 거절됨',
}

const statusStyle = {
  pending: { backgroundColor: '#fff3cd', color: '#856404' },
  accepted: { backgroundColor: '#d4edda', color: '#155724' },
  rejected: { backgroundColor: '#f8d7da', color: '#721c24' },
}

const MyApplications = () => {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosInstance.get('/users/me/applications') // [{ projectId, title, status }]
        const detailed = await Promise.all(
          res.data.map(async (app) => {
            try {
              const projectRes = await axiosInstance.get(`/projects/${app.projectId}`)
              return { project: projectRes.data, status: app.status }
            } catch (err) {
              console.error(`❌ 프로젝트 ${app.projectId} 정보 불러오기 실패`, err)
              return null
            }
          })
        )
        setApplications(detailed.filter(Boolean))
      } catch (err) {
        console.error('❌ 신청한 프로젝트 목록 조회 실패:', err)
      }
    }

    fetchApplications()
  }, [])

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>📩 신청한 프로젝트</h3>
      {applications.length === 0 ? (
        <p>신청한 프로젝트가 없습니다.</p>
      ) : (
        applications.map(({ project, status }) => (
          <div key={project._id} style={{ marginBottom: '20px' }}>
            <MiniProjectCard project={project} />
            <div style={{
              ...statusStyle[status],
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginTop: '8px'
            }}>
              {statusText[status]}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MyApplications
