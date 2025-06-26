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

  // 기술 스택: 각 기술마다 이름과 숙련도(초급, 중급, 고급)를 저장
  skills: [
    {
      name: { type: String, required: true },
      level: { type: String, enum: ['초급', '중급', '고급'], required: true }
    }
  ],

  // 포지션: 웹 프론트엔드, 웹 백엔드, 모바일, 매니저, 디자이너 중 하나 선택
  position: {
    type: String,
    enum: [
      '웹 프론트엔드',
      '웹 백엔드',
      '모바일',
      '풀스택',
      '디자이너',
      '기획자/PM',
      'QA',
      'DevOps/인프라',
      '데이터 엔지니어',
      '데이터 분석가',
      '마케터',
      '작가/콘텐츠 에디터'
    ],
    required: true
  },

  // 가입 방식(local, google, github 중 하나)
  provider: {
    type: String,
    enum: ['local', 'google', 'github'], // 지정된 값만 허용
    default: 'local' // 기본값은 일반 회원가입(local)
  },

  // 프로필 이미지 URL
  image: {
    type: String,
    default: ''
  },

  // 자기소개
  description: {
    type: String,
    default: ''
  },
})

// User 모델로 내보내기
module.exports = mongoose.model('User', userSchema)
