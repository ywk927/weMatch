// src/components/common/RequireAuth.jsx

import { useUserStore } from '../../stores/useUserStore'
import { useLocation } from 'react-router-dom'
import LogInModal from '../modal/LogInModal'

const RequireAuth = ({ children }) => {
  const { user } = useUserStore()
  const location = useLocation()

  // 로그인 상태 아니면 모달 띄움
  if (!user) {
    return (
      <>
        <LogInModal />
        {/* 선택: 로그인하지 않은 상태에서 보호 페이지 내용 가릴 경우 ↓ */}
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>로그인이 필요한 페이지입니다.</p>
        </div>
      </>
    )
  }

  // 로그인 상태면 원래 페이지 보여줌
  return children
}

export default RequireAuth
