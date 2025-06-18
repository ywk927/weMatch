// routes/users.js

// Express 라우터 객체 생성
const express = require('express')
const router = express.Router()

// 사용자 컨트롤러와 인증 미들웨어 불러오기
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/authMiddleware')


// 사용자 관련 라우트 정의

// 특정 유저의 프로필 조회 (공개)
// GET /api/users/:id
// URL 파라미터로 전달된 ID에 해당하는 사용자 정보 조회
router.get('/:id', userController.getUserById)


// 내 프로필 수정 (인증 필요)
// PUT /api/users/me
// JWT 인증된 사용자만 접근 가능
router.put('/me', authMiddleware, userController.updateMyProfile)


// 라우터 모듈로 내보내기
module.exports = router
