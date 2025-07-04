// src/routes/Router.jsx

import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import MyProfile from '../pages/MyProfile'
import ProfilePage from '../pages/ProfilePage'
import ProfileEdit from '../pages/ProfileEdit'
import ProjectPage from '../pages/ProjectPage'
import ProjectDetail from '../pages/ProjectDetail'
import ProjectCreate from '../pages/ProjectCreate'
import ProjectEdit from '../pages/ProjectEdit'
import NotFound from '../pages/NotFound'
import OAuthCallback from "../pages/OAuthCallback"
import RequireAuth from '../components/common/RequireAuth'


const Router = ({ location }) => {
  return (
      <Routes location={location}>
        {/* 공개 라우트 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* 라우터 주소 수정함 - 6/28 */}
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="*" element={<NotFound />} />

        {/* 보호 라우트 */}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <RequireAuth>
              <ProfileEdit />
            </RequireAuth>
          }
        />
        <Route
          path="/project/create"
          element={
            <RequireAuth>
              <ProjectCreate />
            </RequireAuth>
          }
        />
        <Route
          path="/project/:id/edit"
          element={
            <RequireAuth>
              <ProjectEdit />
            </RequireAuth>
          }
        />
      </Routes>
  )
}

export default Router
