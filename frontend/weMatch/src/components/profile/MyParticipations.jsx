// src/components/profile/MyParticipations.jsx
// -> '내가 참여중인 프로젝트'
// accepted only

import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import MiniProjectCard from '../common/MiniProjectCard'

const MyParticipations = () => {
  const [participations, setParticipations] = useState([])

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const meRes = await axiosInstance.get('/auth/me')
        const myId = meRes.data.id

        const res = await axiosInstance.get('/users/me/participations') // [{ projectId }]
        const detailed = await Promise.all(
          res.data.map(async (p) => {
            try {
              const res = await axiosInstance.get(`/projects/${p.projectId}`)
              const project = res.data.project
              return project
            } catch (err) {
              console.error(`❌ 프로젝트 ${p.projectId} 정보 불러오기 실패`, err)
              return null
            }
          })
        )

        // ✅ 내가 만든 프로젝트 제외
        const filtered = detailed
          .filter(Boolean)
          .filter(({ project, status }) =>
            project && project.creator._id !== myId && status === 'accepted'
          )

        setParticipations(filtered)
      } catch (err) {
        console.error('❌ 참여한 프로젝트 조회 실패:', err)
      }
    }

    fetchParticipations()
  }, [])

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>👥 참여 중인 프로젝트</h3>
      {participations.length === 0 ? (
        <p>참여한 프로젝트가 없습니다.</p>
      ) : (
        participations.map((project) => (
          <div key={project._id} style={{ marginBottom: '20px' }}>
            <MiniProjectCard project={project} />
          </div>
        ))
      )}
    </div>
  )
}

export default MyParticipations
