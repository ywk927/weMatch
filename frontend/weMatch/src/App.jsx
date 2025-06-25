// src/App.jsx

import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Router from './routes/Router'
import TopNav from './components/nav/TopNav'
import LogInModal from './components/modal/LogInModal'
import SignUpModal from './components/modal/SignUpModal'

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

// 모달 렌더링을 위해 location 추출 → background 있으면 그걸 기반으로 렌더링
function AppLayout() {
  const location = useLocation() // 뒷배경
  const state = location.state

  return (
    <>
      <TopNav />
      <div className="app-wrapper">
      <Router location={state?.background || location} />
      </div>

      {/* 👇 모달 라우트는 항상 추가 렌더링 */}
      {state?.background && (
        <Routes>
          <Route path="/login" element={<LogInModal />} />
          <Route path="/signup" element={<SignUpModal />} />
        </Routes>
      )}
    </>
  )
}

export default App