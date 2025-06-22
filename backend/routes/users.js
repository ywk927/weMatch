// routes/users.js

// Express 라우터 객체 생성
const express = require('express')
const router = express.Router()

// 사용자 컨트롤러와 인증 미들웨어 불러오기
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/authMiddleware')

// 특정 사용자 프로필 조회 (공개)
// GET /api/users/:id
router.get('/:id', userController.getUserById)

// 내 프로필 수정 (인증 필요)
// PUT /api/users/me
router.put('/me', authMiddleware, userController.updateMyProfile)

module.exports = router

