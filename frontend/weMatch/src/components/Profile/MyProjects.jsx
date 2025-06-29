// MyProjects.jsx
// -> '내가 생성한 프로젝트'
// creator.id = user.id

import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import MiniProjectCard from '../common/MiniProjectCard'

const MyProjects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const meRes = await axiosInstance.get('/auth/me')
        const myId = meRes.data.id
        
        const res = await axiosInstance.get('/projects/my') // 로그인한 유저가 만든 프로젝트
        const filtered = res.data
          .filter(Boolean)
          .filter((project) => project.creator?._id === myId)
        
        setProjects(filtered)
      } catch (err) {
        console.error('❌ 내가 만든 프로젝트 불러오기 실패:', err)
      }
    }
    fetch()
  }, [])

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>🛠 내가 만든 프로젝트</h3>
      {projects.length === 0 ? (
        <p>아직 만든 프로젝트가 없습니다.</p>
      ) : (
        projects.map((project) => (
          <div key={project._id} style={{ marginBottom: '20px' }}>
            <MiniProjectCard project={project} />
          </div>
        ))
      )}
    </div>
  )
}

export default MyProjects