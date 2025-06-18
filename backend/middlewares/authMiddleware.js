// middlewares/authMiddleware.js

// JWT 라이브러리 불러오기
const jwt = require('jsonwebtoken')


// 인증 미들웨어 함수 정의
const authMiddleware = (req, res, next) => {
  // 요청 헤더에서 Authorization 값 추출
  const authHeader = req.headers.authorization

  // Authorization 헤더가 없거나 Bearer 토큰 형식이 아닌 경우 인증 실패 처리
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '인증 토큰이 필요합니다' })
  }

  // 'Bearer <token>' 형식에서 토큰 부분만 추출
  const token = authHeader.split(' ')[1]

  try {
    // 토큰 검증 및 디코딩
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 디코딩된 토큰에서 userId를 요청 객체에 저장
    req.userId = decoded.userId

    // 다음 미들웨어 또는 라우터로 진행
    next()
  } catch (err) {
    // 토큰이 유효하지 않을 경우 인증 실패 처리
    return res.status(401).json({ message: '유효하지 않은 토큰입니다' })
  }
}

// 모듈로 내보내기
module.exports = authMiddleware
