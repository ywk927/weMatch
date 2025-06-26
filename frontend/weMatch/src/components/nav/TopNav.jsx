// components/nav/TopNav.jsx
import './TopNav.css'
import { useUserStore } from '../../stores/useUserStore'
import { useNavigate, useLocation } from 'react-router-dom'

import logo2 from '../../assets/002.png'
import homeIcon from '../../assets/icons/home.png'
import projectIcon from '../../assets/icons/project.png'
import userIcon from '../../assets/icons/user.png'

const TopNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useUserStore()

  const handleLogout = () => {
    logout()
    alert('로그아웃 완료')
    navigate(-1)
  }

  const currentPath = location.pathname

  return (
    <nav className="top-nav">
      {/* 왼쪽: 로고 (클릭 시 홈 이동) */}
      <div className="nav-left">
        <img
          src={logo2}
          alt="Logo"
          className="nav-logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* 가운데: 홈 버튼 */}
      <div className="nav-center">
        <div
          className={`nav-icon-wrapper ${currentPath === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <img src={homeIcon} alt="Home" className="nav-icon" />
        </div>

        <div
          className={`nav-icon-wrapper ${currentPath.startsWith('/project') ? 'active' : ''}`}
          onClick={() => navigate('/project')}
        >
          <img src={projectIcon} alt="Project" className="nav-icon" />
        </div>
      </div>


      {/* 오른쪽: 로그인 분기 */}
      <div className="nav-right">
        {user ? (
          <>
            <img
              src={userIcon}
              alt="My Profile"
              className="nav-icon"
              onClick={() => navigate('/profile')}
            />
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login', { state: { background: location } })}>로그인</button>
            <button onClick={() => navigate('/signup', { state: { background: location } })}>회원가입</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default TopNav
