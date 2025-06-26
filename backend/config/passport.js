// config/passport.js

// Passport 미들웨어 (OAuth 인증 처리용)
const passport = require('passport')

// Google OAuth 2.0 전략
const GoogleStrategy = require('passport-google-oauth20').Strategy

// GitHub OAuth 2.0 전략
const GitHubStrategy = require('passport-github2').Strategy

// User 모델 불러오기 (소셜 로그인 사용자 저장에 사용)
const User = require('../models/User')

// JWT 토큰 생성 및 검증용 라이브러리
const jwt = require('jsonwebtoken')


// 구글 OAuth 전략 설정
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,         // 구글 클라이언트 ID
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // 구글 클라이언트 시크릿
    callbackURL: process.env.GOOGLE_CALLBACK_URL    // 인증 완료 후 리디렉션될 콜백 URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 구글 프로필에서 이메일과 닉네임 추출
      const email = profile.emails[0].value
      const nickname = profile.displayName

      // 해당 이메일을 가진 유저가 DB에 존재하는지 확인
      let user = await User.findOne({ email })

      // 존재하지 않으면 새로 생성
      if (!user) {
        user = await User.create({
          email,
          nickname,
          password: '',       // 소셜 로그인 유저는 비밀번호를 저장하지 않음
          skills: [], // [{ name: '', level: '' }] 구조의 빈 배열
          position: '', // 최초 생성 시 포지션은 비워둠
          provider: 'google',  // 소셜 로그인 제공자 정보 저장
          image: '', // 프로필 이미지
          description: '' // 자기소개
        })
      }

      // JWT 토큰 발급 (유저 ID를 payload로 사용)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d' // 토큰 유효기간: 7일
      })

      // 인증 성공 시 done 콜백에 토큰 전달
      return done(null, { token })
    } catch (err) {
      // 에러 발생 시 done 콜백에 에러 전달
      return done(err, null)
    }
  }
))

// 깃허브 OAuth 전략 설정
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,         // 깃허브 클라이언트 ID
    clientSecret: process.env.GITHUB_CLIENT_SECRET, // 깃허브 클라이언트 시크릿
    callbackURL: process.env.GITHUB_CALLBACK_URL,   // 인증 완료 후 콜백 URL
    scope: ['user:email']                           // 이메일 접근 권한 요청
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 깃허브 프로필에서 이메일과 닉네임 추출
      const email = profile.emails[0].value
      const nickname = profile.username

      // 해당 이메일을 가진 유저가 DB에 존재하는지 확인
      let user = await User.findOne({ email })

      // 존재하지 않으면 새로 생성
      if (!user) {
        user = await User.create({
          email,
          nickname,
          password: '',       // 비밀번호 없음
          skills: [], // [{ name: '', level: '' }] 구조의 빈 배열
          position: '', // 최초 생성 시 포지션은 비워둠
          provider: 'github',  // 제공자 정보 저장
          image: '', // 프로필 이미지
          description: '' // 자기소개
        })
      }

      // JWT 토큰 발급
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })

      // 인증 성공 시 done 콜백에 토큰 전달
      return done(null, { token })
    } catch (err) {
      // 에러 발생 시 done 콜백에 에러 전달
      return done(err, null)
    }
  }
))
