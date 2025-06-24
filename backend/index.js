// index.js


// 환경 변수 로드 (.env 파일에서)
// 환경 변수 로드 (.env 파일에서)
require('dotenv').config()

// 핵심 모듈 불러오기
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

// 라우터 불러오기
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const projectRouter = require('./routes/projects')
const applicationRouter = require('./routes/applications')

const cors = require('cors')
// Passport 전략 설정
require('./config/passport')

// Express 앱 생성
const app = express()

// 전역 미들웨어 등록
app.use(cors())
app.use(express.json()) // JSON 요청 본문 파싱
app.use(passport.initialize()) // Passport 초기화

// 라우터 등록
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/projects', projectRouter)
app.use('/api', applicationRouter)

// 기본 라우트
app.get('/', (req, res) => {
  res.send('MongoDB + Express 서버가 실행 중입니다.')
})

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err))

// 서버 실행
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
