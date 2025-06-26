// routes/users.js

// Express 라우터 객체 생성
const express = require('express')
const router = express.Router()

// 사용자 컨트롤러와 인증 미들웨어 불러오기
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/authMiddleware')

// multer 라이브러리 불러오기
const multer = require('multer')
const path = require('path')

// express-validator 불러오기
const { body, validationResult } = require('express-validator')

// 허용할 확장자 및 최대 용량
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const MAX_SIZE = 2 * 1024 * 1024 // 2MB

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  const mime = file.mimetype
  if (
    ALLOWED_EXTENSIONS.includes(ext) &&
    mime.startsWith('image/')
  ) {
    cb(null, true)
  } else {
    cb(new Error('이미지 파일만 업로드할 수 있습니다.'), false)
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE }
})

// 특정 사용자 프로필 조회 (공개)
// GET /api/users/:id
router.get('/:id', userController.getUserById)

// 내 프로필 수정 (인증 필요)
// PUT /api/users/me
router.put(
  '/me',
  authMiddleware,
  [
    body('email').optional().isEmail().withMessage('이메일 형식이 올바르지 않습니다.'),
    body('password').optional().isLength({ min: 6 }).withMessage('비밀번호는 6자 이상이어야 합니다.'),
    body('nickname').optional().notEmpty().withMessage('닉네임을 입력해 주세요.'),
    body('skills').optional().isArray().withMessage('skills는 배열이어야 합니다.'),
    body('skills.*.name').optional().notEmpty().withMessage('각 skill의 name이 필요합니다.'),
    body('skills.*.level').optional().isIn(['초급', '중급', '고급']).withMessage('level은 초급/중급/고급 중 하나여야 합니다.'),
    body('position').optional().isIn([
      '웹 프론트엔드', '웹 백엔드', '모바일', '풀스택', '디자이너', '기획자/PM', 'QA', 'DevOps/인프라',
      '데이터 엔지니어', '데이터 분석가', '마케터', '작가/콘텐츠 에디터'
    ]).withMessage('position 값이 올바르지 않습니다.'),
    body('image').optional().isString().withMessage('image는 문자열(URL)이어야 합니다.'),
    body('description').optional().isString().withMessage('description은 문자열이어야 합니다.')
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    next()
  },
  userController.updateMyProfile
)

// 전체 유저 목록 조회 (공개)
// GET /api/users/
router.get('/', userController.getAllUsers)

// 이미지 업로드 라우트
// POST /api/users/upload
router.post('/upload', (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 용량 초과 등 multer 에러
      return res.status(400).json({ message: '파일 용량은 2MB 이하만 가능합니다.' })
    } else if (err) {
      // 파일 타입 등 기타 에러
      return res.status(400).json({ message: err.message })
    }
    if (!req.file) {
      return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' })
    }
    // 업로드된 파일의 URL 반환 (예: /uploads/파일명)
    const fileUrl = `/uploads/${req.file.filename}`
    res.json({ url: fileUrl })
  })
})

module.exports = router

