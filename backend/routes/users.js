// routes/users.js

const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/authMiddleware')

// GET /api/users/:id - 특정 유저 프로필 조회
router.get('/:id', userController.getUserById)

// PUT /api/users/me - 내 프로필 수정 (인증 필요)
router.put('/me', authMiddleware, userController.updateMyProfile)

module.exports = router
