// controllers/auth.controller.js

// User 모델 불러오기 (사용자 정보 관리)
const User = require('../models/User')

// 비밀번호 해싱 및 검증을 위한 라이브러리
const bcrypt = require('bcrypt')

// JWT 토큰 생성 및 검증을 위한 라이브러리
const jwt = require('jsonwebtoken')



// 회원가입 핸들러
exports.signup = async (req, res) => {
  // 요청 본문에서 회원가입 정보 추출
  const { email, password, nickname, skills, level } = req.body

  try {
    // 이미 존재하는 이메일인지 확인
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(409).json({ message: '이미 존재하는 이메일입니다' })

    // 비밀번호 해시 처리
    const hashedPassword = await bcrypt.hash(password, 10)

    // 새 사용자 객체 생성
    const newUser = new User({
      email,
      password: hashedPassword,
      nickname,
      skills: skills || [],  // 선택적으로 skills 저장
      level: level || ''     // 선택적으로 level 저장
    })

    // DB에 사용자 저장
    await newUser.save()

    // JWT 토큰 발급
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'  // 토큰 만료 기간: 7일
    })

    // 201 Created 응답과 함께 토큰 반환
    res.status(201).json({ token })
  } catch (err) {
    // 서버 오류 처리
    console.log(err)
    res.status(500).json({ message: '서버 오류' })
  }
}


// 로그인 핸들러
exports.login = async (req, res) => {
  // 요청 본문에서 로그인 정보 추출
  const { email, password } = req.body

  try {
    // 이메일로 사용자 조회
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: '존재하지 않는 사용자입니다' })

    // 비밀번호 일치 여부 확인
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' })

    // JWT 토큰 발급
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    // 토큰 반환
    res.json({ token })
  } catch (err) {
    // 서버 오류 처리
    console.log(err)
    res.status(500).json({ message: '서버 오류' })
  }
}


// 로그인된 사용자 정보 조회 핸들러
exports.getMe = async (req, res) => {
  try {
    // 토큰에서 추출된 userId로 사용자 조회 (비밀번호 제외)
    const user = await User.findById(req.userId).select('_id email nickname skills level')
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })

    // 사용자 정보 반환
    res.json({
      id: user._id,
      email: user.email,
      nickname: user.nickname,
      skills: user.skills,
      level: user.level
    })
  } catch (err) {
    // 서버 오류 처리
    console.log(err)
    res.status(500).json({ message: '서버 오류' })
  }
}
