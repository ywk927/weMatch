// routes/auth.js
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const passport = require('passport')

// 기존 라우터
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/me', authMiddleware, authController.getMe)


// ✅ [1] 구글 로그인 시작
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)


// ✅ [2] 구글 로그인 콜백 처리
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    // 인증 성공 시 토큰 전달
    const token = req.user.token
    res.json({ token })  // 프론트 없으니까 JSON 응답으로 처리
  }
)

// GitHub 로그인 라우트
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

// GitHub 콜백 라우트
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    res.json(req.user)  // { token: "..." }
  }
)

module.exports = router
