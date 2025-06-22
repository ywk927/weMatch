// routes/projects.js

// Express 라우터 생성
const express = require('express')
const router = express.Router()

// 프로젝트 컨트롤러와 인증 미들웨어 불러오기
const projectController = require('../controllers/project.controller')
const authMiddleware = require('../middlewares/authMiddleware')

// 프로젝트 생성 (인증 필요)
// POST /api/projects
router.post('/', authMiddleware, projectController.createProject)

// 전체 프로젝트 목록 조회
// GET /api/projects
router.get('/', projectController.getAllProjects)

// 내가 생성한 프로젝트 목록 조회 (인증 필요)
// GET /api/projects/my
router.get('/my', authMiddleware, projectController.getMyProjects)

// 특정 프로젝트 상세 조회
// GET /api/projects/:id
router.get('/:id', projectController.getProjectById)

// 프로젝트 수정 (인증 필요, 본인만 가능)
// PUT /api/projects/:id
router.put('/:id', authMiddleware, projectController.updateProject)

// 프로젝트 삭제 (인증 필요, 본인만 가능)
// DELETE /api/projects/:id
router.delete('/:id', authMiddleware, projectController.deleteProject)

module.exports = router
