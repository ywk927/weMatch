// routes/auth.js

// Express 라우터 생성
const express = require('express')
const router = express.Router()

// 인증 관련 컨트롤러와 미들웨어, Passport 불러오기
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const passport = require('passport')


// 기존 이메일/비밀번호 기반 인증 라우트

// 회원가입 라우트
router.post('/signup', authController.signup)

// 로그인 라우트
router.post('/login', authController.login)

// 내 정보 조회 (인증 필요)
router.get('/me', authMiddleware, authController.getMe)


// 소셜 로그인 (Google)

// [1] 구글 로그인 시작
// Google 로그인 페이지로 리디렉션
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)


// [2] 구글 로그인 콜백
// 구글 로그인 후 리디렉션되는 콜백 처리
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    // 인증 성공 시, passport strategy에서 설정한 token을 응답으로 전달
    const token = req.user.token
    res.json({ token })  // 프론트엔드 없으므로 JSON 형태로 응답
  }
)


// 소셜 로그인 (GitHub)

// GitHub 로그인 시작
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

// GitHub 로그인 콜백
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    // 인증 성공 시 token 반환
    res.json(req.user)  // { token: "..." } 형태
  }
)


// 라우터 모듈로 내보내기
module.exports = router
