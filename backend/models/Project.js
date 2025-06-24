// models/Project.js

// Mongoose 라이브러리 불러오기 (MongoDB 객체 모델링 도구)
const mongoose = require('mongoose')

// 프로젝트 스키마 정의
const projectSchema = new mongoose.Schema({
  // 프로젝트 제목
  title: {
    type: String,
    required: true
  },

  // 프로젝트 설명
  description: {
    type: String,
    required: true
  },

  // 요구 기술 스택 (문자열 배열)
  skills: [
    {
      type: String
    }
  ],

  // 모집 인원 수 (기본값: 1명)
  recruitCount: {
    type: Number,
    default: 1
  },

  // 프로젝트 생성자 (User 컬렉션 참조)
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  // 생성일(createdAt) 및 수정일(updatedAt) 자동 생성
  timestamps: true
})

// Project 모델 등록 및 내보내기
module.exports = mongoose.model('Project', projectSchema)
