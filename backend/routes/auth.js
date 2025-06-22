// routes/auth.js

// Express 라우터 생성
const express = require('express')
const router = express.Router()

// 인증 컨트롤러, 인증 미들웨어, Passport 불러오기
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const passport = require('passport')

// 회원가입
// POST /api/auth/signup
router.post('/signup', authController.signup)

// 로그인
// POST /api/auth/login
router.post('/login', authController.login)

// 내 정보 조회 (토큰 필요)
// GET /api/auth/me
router.get('/me', authMiddleware, authController.getMe)

// 구글 로그인 시작 (OAuth 요청)
// GET /api/auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// 구글 로그인 콜백 처리
// GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = req.user.token
    res.json({ token })
  }
)

// 깃허브 로그인 시작
// GET /api/auth/github
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

// 깃허브 로그인 콜백 처리
// GET /api/auth/github/callback
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    res.json(req.user)
  }
)

module.exports = router
