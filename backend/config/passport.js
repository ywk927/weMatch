// config/passport.js

// passport, OAuth 전략들, 사용자 모델, JWT 라이브러리 불러오기
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const User = require('../models/User')
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
          skills: [],
          level: '',
          provider: 'google'  // 소셜 로그인 제공자 정보 저장
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
          provider: 'github'  // 제공자 정보 저장
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
