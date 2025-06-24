// Router.jsx
import OAuthCallback from "../pages/OAuthCallback";

<Route path="/oauth/callback" element={<OAuthCallback />} />
// src/routes/Router.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyProfile from '../pages/MyProfile'
import ProfilePage from '../pages/ProfilePage'
import ProfileEdit from '../pages/ProfileEdit'
import Login from '../pages/Login'


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile/" element={<MyProfile />} />
        <Route path="/profile/users/:id" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router
