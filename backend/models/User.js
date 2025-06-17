const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function () {
      // 소셜 로그인의 경우 비밀번호 없이 가입됨
      return this.provider === 'local'
    },
    default: ''
  },
  nickname: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  level: {
    type: String,
    default: ''
  },
  provider: {
    type: String,
    enum: ['local', 'google', 'github'],
    default: 'local'
  }
})

module.exports = mongoose.model('User', userSchema)
