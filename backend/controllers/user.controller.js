// controllers/user.controller.js

// 사용자 모델 불러오기
const User = require('../models/User')


// 특정 유저의 프로필 조회
exports.getUserById = async (req, res) => {
  try {
    // URL 파라미터로 받은 사용자 ID로 사용자 조회 (닉네임, 기술스택, 레벨만 선택)
    const user = await User.findById(req.params.id).select('nickname skills level')

    // 사용자가 존재하지 않을 경우 404 반환
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })

    // 사용자 정보 응답
    res.json({
      nickname: user.nickname,
      skills: user.skills,
      level: user.level
    })
  } catch (err) {
    // 에러 발생 시 서버 오류 반환
    console.error('getUserById error:', err)
    res.status(500).json({ message: '서버 오류' })
  }
}


// 로그인된 사용자의 프로필 수정
exports.updateMyProfile = async (req, res) => {
  // 요청 본문에서 수정할 필드 추출
  const { nickname, skills, level } = req.body

  try {
    // JWT에서 추출한 userId로 사용자 조회
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })

    // 각각의 필드가 전달된 경우에만 값 수정
    if (nickname !== undefined) user.nickname = nickname
    if (skills !== undefined) user.skills = skills
    if (level !== undefined) user.level = level

    // 변경사항 저장
    await user.save()

    // 성공 응답 반환
    res.status(200).json({ message: '프로필이 수정되었습니다' })
  } catch (err) {
    // 에러 발생 시 서버 오류 반환
    console.error('updateMyProfile error:', err)
    res.status(500).json({ message: '서버 오류' })
  }
}
