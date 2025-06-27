// controllers/project.controller.js

// Project 모델 불러오기 (프로젝트 생성, 조회, 수정 등에 사용)
const Project = require('../models/Project')
const Application = require('../models/Application')



// 프로젝트 생성
// POST /api/projects
exports.createProject = async (req, res) => {
  const { title, description, skills, recruitCount } = req.body

  // 프로젝트 생성자(userId)는 인증 미들웨어에서 추출됨
  const project = await Project.create({
    title,
    description,
    skills,
    recruitCount,
    creator: req.userId
  })

  res.status(201).json(project)
}


// 전체 프로젝트 목록 조회
// GET /api/projects
exports.getAllProjects = async (req, res) => {
  // 작성자 정보(nickname) 포함하여 조회
  const projects = await Project.find().populate('creator', 'nickname')
  res.json(projects)
}


// 특정 프로젝트 상세 조회
// GET /api/projects/:id
exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('creator', 'nickname')
  if (!project) return res.status(404).json({ message: 'Not found' })
  // 지원자 수와 합격자 수 계산
  const applicantCount = await Application.countDocuments({ project: project._id })
  const acceptedCount = await Application.countDocuments({ project: project._id, status: 'accepted' })
  res.json({
    ...project.toObject(),
    applicantCount,
    acceptedCount
  })
}


// 프로젝트 수정
// PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id)
  if (!project) return res.status(404).json({ message: 'Not found' })

  // 본인 프로젝트가 아니면 수정 불가
  if (project.creator.toString() !== req.userId) {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  const { title, description } = req.body

  // 전달된 값이 있는 경우에만 업데이트
  project.title = title || project.title
  project.description = description || project.description

  await project.save()
  res.json(project)
}


// 프로젝트 삭제
// DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id)
  if (!project) return res.status(404).json({ message: 'Not found' })

  // 본인 프로젝트가 아니면 삭제 불가
  if (project.creator.toString() !== req.userId) {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  await project.deleteOne()
  res.status(204).end()
}


// 내가 생성한 프로젝트 목록 조회
// GET /api/projects/my
exports.getMyProjects = async (req, res) => {
  const projects = await Project.find({ creator: req.userId })
    .populate('creator', 'nickname email')

  res.json(projects)
}
