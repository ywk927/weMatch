import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import MiniProjectCard from '../common/MiniProjectCard'

const MyParticipations = () => {
  const [participations, setParticipations] = useState([])

  useEffect(() => {
    axiosInstance.get('/users/me/participations')
      .then(async res => {
        const detailed = await Promise.all(
          res.data.map(async (p) => {
            try {
              const res = await axiosInstance.get(`/projects/${p.projectId}`)
              return res.data
            } catch (err) {
              console.error(`❌ 프로젝트 ${p.projectId} 정보 불러오기 실패`, err)
              return null
            }
          })
        )
        setParticipations(detailed.filter(Boolean))
      })
      .catch(err => console.error('❌ 참여한 프로젝트 조회 실패:', err))
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
