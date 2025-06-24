// models/User.js

// Mongoose 라이브러리 불러오기 (MongoDB ODM)
const mongoose = require('mongoose')

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
  // 이메일: 필수이며 고유한 값
  email: {
    type: String,
    required: true,
    unique: true
  },

  // 비밀번호:
  // - 일반 로그인(local)인 경우 필수
  // - 소셜 로그인(google, github)인 경우 비워둘 수 있음
  password: {
    type: String,
    required: function () {
      // provider가 'local'일 때만 비밀번호 필수
      return this.provider === 'local'
    },
    default: ''
  },

  // 닉네임: 기본값은 빈 문자열
  nickname: {
    type: String,
    default: ''
  },

  // 기술 스택: 문자열 배열로 저장, 기본값은 빈 배열
  skills: {
    type: [String],
    default: []
  },

  // 사용자의 숙련도 또는 레벨 (예: 초급, 중급 등), 기본값은 빈 문자열
  level: {
    type: String,
    default: ''
  },

  // 가입 방식(local, google, github 중 하나)
  provider: {
    type: String,
    enum: ['local', 'google', 'github'], // 지정된 값만 허용
    default: 'local' // 기본값은 일반 회원가입(local)
  }
})

// User 모델로 내보내기
module.exports = mongoose.model('User', userSchema)
