// src/routes/Router.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import HomePage from '../pages/HomePage'
// import ChatPage from '../pages/ChatPage'
// import ProjectPage from '../pages/ProjectPage'
// import ProjectDetail from '../pages/ProjectDetail'
// import ProjectEdit from '../pages/ProjectEdit'
import Profile from '../pages/Profile'
// import ProfileEdit from '../pages/ProfileEdit'
// import NotFound from '../pages/NotFound'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>홈입니다. 여기는 기본 경로예요.</div>} />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/project/:projectId/edit" element={<ProjectEdit />} /> */}
        <Route path="/profile/:userId" element={<Profile />} />
        {/* <Route path="/profile/:userId/edit" element={<ProfileEdit />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
