// controllers/application.controller.js

// Application 모델 불러오기 (프로젝트 참여 신청 정보)
const Application = require('../models/Application')

// Project 모델 불러오기 (프로젝트 정보)
const Project = require('../models/Project')


// 프로젝트 참여 신청
// POST /api/projects/:id/apply
exports.applyProject = async (req, res) => {
  const { id: projectId } = req.params
  const { message } = req.body
  const userId = req.userId

  try {
    // 이미 신청한 경우 중복 방지
    const existing = await Application.findOne({ project: projectId, user: userId })
    if (existing) {
      return res.status(400).json({ message: '이미 신청한 프로젝트입니다' })
    }

    // 새로운 신청 생성
    const newApp = await Application.create({
      project: projectId,
      user: userId,
      status: 'pending',
      message
    })

    res.status(201).json(newApp)
  } catch (err) {
    res.status(500).json({ message: '서버 오류', error: err.message })
  }
}


// 프로젝트 작성자가 신청 목록 조회
// GET /api/projects/:id/applications
// 수정 *로그인, 작성자 여부 관계 없이* 모두 조회 가능 - jin 06/28
exports.getApplicationsByProject = async (req, res) => {
  // const userId = req.userId -> 주석 처리함_jin
  const projectId = req.params.id

  // 프로젝트 존재 여부 및 권한 확인
  const project = await Project.findById(projectId)
  if (!project) return res.status(404).json({ message: '프로젝트 없음' })
  // 아래 부분도 주석 처리_jin
  // if (project.creator.toString() !== userId) return res.status(403).json({ message: '권한 없음' })

  // 신청 목록 조회 및 사용자 정보 포함
  const applications = await Application.find({ project: projectId })
    .populate('user', 'nickname email skills position image description')
    .sort({ createdAt: -1 })

  res.json(applications)
}


// 특정 신청 수락
// POST /api/projects/:id/applications/:userId/accept
exports.acceptApplication = async (req, res) => {
  const projectId = req.params.id
  const targetUserId = req.params.userId
  const userId = req.userId

  // 프로젝트 존재 및 권한 확인
  const project = await Project.findById(projectId)
  if (!project) return res.status(404).json({ message: '프로젝트 없음' })
  if (project.creator.toString() !== userId) return res.status(403).json({ message: '권한 없음' })

  // 신청 기록 확인
  const application = await Application.findOne({ project: projectId, user: targetUserId })
  if (!application) return res.status(404).json({ message: '신청 기록 없음' })

  // 상태를 수락으로 변경
  application.status = 'accepted'
  await application.save()

  res.json({ message: '수락 완료' })
}


// 특정 신청 거절
// POST /api/projects/:id/applications/:userId/reject
exports.rejectApplication = async (req, res) => {
  const projectId = req.params.id
  const targetUserId = req.params.userId
  const userId = req.userId

  // 프로젝트 존재 및 권한 확인
  const project = await Project.findById(projectId)
  if (!project) return res.status(404).json({ message: '프로젝트 없음' })
  if (project.creator.toString() !== userId) return res.status(403).json({ message: '권한 없음' })

  // 신청 기록 확인
  const application = await Application.findOne({ project: projectId, user: targetUserId })
  if (!application) return res.status(404).json({ message: '신청 기록 없음' })

  // 상태를 거절로 변경
  application.status = 'rejected'
  await application.save()

  res.json({ message: '거절 완료' })
}


// 내가 신청한 프로젝트 목록 조회
// GET /api/users/me/applications
exports.getMyApplications = async (req, res) => {
  const userId = req.userId

  // 나의 신청 목록 조회
  const apps = await Application.find({ user: userId })
    .populate('project', 'title')
    .sort({ createdAt: -1 })

  // 응답 형식 가공
  const results = apps.map(app => ({
    projectId: app.project._id,
    title: app.project.title,
    status: app.status
  }))

  res.json(results)
}


// 내가 참여 확정된 프로젝트 목록 조회
// GET /api/users/me/participations
exports.getMyParticipations = async (req, res) => {
  const userId = req.userId

  // 수락된 상태의 신청 목록만 조회
  const apps = await Application.find({ user: userId, status: 'accepted' })
    .populate('project', 'title')

  // 응답 형식 가공
  const results = apps.map(app => ({
    projectId: app.project._id,
    title: app.project.title
  }))

  res.json(results)
}
