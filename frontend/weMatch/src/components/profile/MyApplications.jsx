// src/components/profile/MyApplications.jsx
// -> '내가 신청한 프로젝트'
// pending + rejected

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
        // 필터링 위해 meRes, myId 추가
        const meRes = await axiosInstance.get('/auth/me') // ✅ 현재 로그인 유저
        const myId = meRes.data.id

        const res = await axiosInstance.get('/users/me/applications') // [{ projectId, title, status }]
        const detailed = await Promise.all(
          res.data.map(async (app) => {
            try {
              const projectRes = await axiosInstance.get(`/projects/${app.projectId}`)
              const project = projectRes.data.project

              return { project, status: app.status }
            } catch (err) {
              console.error(`❌ 프로젝트 ${app.projectId} 정보 불러오기 실패`, err)
              return null
            }
          })
        )

        // 필터링 로직(pending + rejected 만)
        const filtered = detailed
          .filter(Boolean)
          .filter(({ project, status }) =>
            project && project.creator._id !== myId && status !== 'accepted'
        )

        setApplications(filtered)
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
        applications.map(({ project, status }, idx) => (
            <div
              key={`${project._id}-${status}-${idx}`}
              style={{
                position: 'relative',
                marginBottom: '40px'
              }}
            >
              <MiniProjectCard project={project} />
              <div
                style={{
                  ...statusStyle[status],
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {statusText[status]}
              </div>
            </div>
          ))
      )}
    </div>
  )
}

export default MyApplications
