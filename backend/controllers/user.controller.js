// controllers/user.controller.js

const User = require('../models/User')

// 특정 유저 프로필 조회
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('nickname skills level')
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })

    res.json({
      nickname: user.nickname,
      skills: user.skills,
      level: user.level
    })
  } catch (err) {
    console.error('getUserById error:', err)
    res.status(500).json({ message: '서버 오류' })
  }
}

// 내 프로필 수정
exports.updateMyProfile = async (req, res) => {
  const { nickname, skills, level } = req.body

  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })

    if (nickname !== undefined) user.nickname = nickname
    if (skills !== undefined) user.skills = skills
    if (level !== undefined) user.level = level

    await user.save()
    res.status(200).json({ message: '프로필이 수정되었습니다' })
  } catch (err) {
    console.error('updateMyProfile error:', err)
    res.status(500).json({ message: '서버 오류' })
  }
}
