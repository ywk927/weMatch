// controllers/auth.controller.js

const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// 회원가입
exports.signup = async (req, res) => {
  const { email, password, nickname, skills, level } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(409).json({ message: '이미 존재하는 이메일입니다' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: hashedPassword,
      nickname,
      skills: skills || [],
      level: level || ''
    })

    await newUser.save()

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.status(201).json({ token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '서버 오류' })
  }
}

// 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: '존재하지 않는 사용자입니다' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.json({ token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '서버 오류' })
  }
}

// 내 정보 조회
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('_id email nickname skills level')
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })

    res.json({
      id: user._id,
      email: user.email,
      nickname: user.nickname,
      skills: user.skills,
      level: user.level
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '서버 오류' })
  }
}
