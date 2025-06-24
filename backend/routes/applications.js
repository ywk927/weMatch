const express = require('express')
const router = express.Router()

// 인증 미들웨어 및 컨트롤러 불러오기
const authMiddleware = require('../middlewares/authMiddleware')
const applicationController = require('../controllers/application.controller')

// 프로젝트 참여 신청
// POST /api/projects/:id/apply
router.post('/projects/:id/apply', authMiddleware, applicationController.applyProject)

// 프로젝트 작성자가 신청자 목록 조회
// GET /api/projects/:id/applications
router.get('/projects/:id/applications', authMiddleware, applicationController.getApplicationsByProject)

// 특정 신청 수락
// POST /api/projects/:id/applications/:userId/accept
router.post('/projects/:id/applications/:userId/accept', authMiddleware, applicationController.acceptApplication)

// 특정 신청 거절
// POST /api/projects/:id/applications/:userId/reject
router.post('/projects/:id/applications/:userId/reject', authMiddleware, applicationController.rejectApplication)

// 내가 신청한 프로젝트 목록 조회
// GET /api/users/me/applications
router.get('/users/me/applications', authMiddleware, applicationController.getMyApplications)

// 내가 참여 확정된 프로젝트 목록 조회
// GET /api/users/me/participations
router.get('/users/me/participations', authMiddleware, applicationController.getMyParticipations)

module.exports = router
