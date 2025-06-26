// routes/auth.js

// Express 라우터 생성
const express = require('express')
const router = express.Router()

// 인증 컨트롤러, 인증 미들웨어, Passport 불러오기
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const passport = require('passport')

// express-validator 불러오기
const { body, validationResult } = require('express-validator')

// 회원가입
// POST /api/auth/signup
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('이메일 형식이 올바르지 않습니다.'),
    body('password').isLength({ min: 6 }).withMessage('비밀번호는 6자 이상이어야 합니다.'),
    body('nickname').notEmpty().withMessage('닉네임을 입력해 주세요.'),
    body('skills').isArray().withMessage('skills는 배열이어야 합니다.'),
    body('skills.*.name').notEmpty().withMessage('각 skill의 name이 필요합니다.'),
    body('skills.*.level').isIn(['초급', '중급', '고급']).withMessage('level은 초급/중급/고급 중 하나여야 합니다.'),
    body('position').isIn([
      '웹 프론트엔드', '웹 백엔드', '모바일', '풀스택', '디자이너', '기획자/PM', 'QA', 'DevOps/인프라',
      '데이터 엔지니어', '데이터 분석가', '마케터', '작가/콘텐츠 에디터'
    ]).withMessage('position 값이 올바르지 않습니다.')
    // 필요하다면 image, description 등도 추가 가능
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    next()
  },
  authController.signup
)

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
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  authController.socialCallback
)

// 깃허브 로그인 시작
// GET /api/auth/github
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

// 깃허브 로그인 콜백 처리
// GET /api/auth/github/callback
router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  authController.socialCallback
)

module.exports = router
