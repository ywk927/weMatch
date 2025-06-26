// controllers/user.controller.js

// User 모델 불러오기 (사용자 정보 조회 및 소셜 로그인 처리에 사용)
const User = require('../models/User')


// 특정 유저의 프로필 조회
exports.getUserById = async (req, res) => {
  try {
    // URL 파라미터로 받은 사용자 ID로 사용자 조회 (닉네임, 기술스택, 레벨만 선택)
    const user = await User.findById(req.params.id).select('nickname skills position image description')

    // 사용자가 존재하지 않을 경우 404 반환
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })

    // 사용자 정보 응답
    res.json({
      nickname: user.nickname,
      skills: user.skills,
      position: user.position,
      image: user.image,
      description: user.description
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
  const { nickname, skills, position, image, description } = req.body

  try {
    // JWT에서 추출한 userId로 사용자 조회
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })

    // 각각의 필드가 전달된 경우에만 값 수정
    if (nickname !== undefined) user.nickname = nickname
    if (skills !== undefined) user.skills = skills
    if (position !== undefined) user.position = position
    if (image !== undefined) user.image = image
    if (description !== undefined) user.description = description

    // 변경사항 저장
    await user.save()

    // 성공 응답 반환
    res.status(200).json(user)
  } catch (err) {
    // 에러 발생 시 서버 오류 반환
    console.error('updateMyProfile error:', err)
    res.status(500).json({ message: '서버 오류' })
  }
}

// 전체 유저 목록 조회
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('nickname email skills position image description')
    res.json(users)
  } catch (err) {
    console.error('getAllUsers error:', err)
    res.status(500).json({ message: '서버 오류' })
  }
}
