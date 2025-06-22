// models/Application.js

// Mongoose 라이브러리 불러오기 (MongoDB ODM)
const mongoose = require('mongoose')

// 프로젝트 참여 신청 스키마 정의
const applicationSchema = new mongoose.Schema({
  // 신청한 프로젝트 참조
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },

  // 신청한 사용자 참조
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // 신청 상태: 대기중, 수락됨, 거절됨 중 하나
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },

  // 신청 시 남긴 메시지 (자기소개 등)
  message: {
    type: String
  }
}, {
  // 생성일 및 수정일 자동 관리 (createdAt, updatedAt)
  timestamps: true
})

// Application 모델로 내보내기
module.exports = mongoose.model('Application', applicationSchema)
