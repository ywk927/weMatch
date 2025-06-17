// config/passport.js
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const User = require('../models/User')
const jwt = require('jsonwebtoken')

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value
      const nickname = profile.displayName

      let user = await User.findOne({ email })

      if (!user) {
        user = await User.create({
          email,
          nickname,
          password: '',       // 소셜 로그인 유저는 비밀번호 없음
          skills: [],
          level: '',
          provider: 'google'
        })
      }

      // JWT 발급
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })

      // done 함수에 token 전달
      return done(null, { token })
    } catch (err) {
      return done(err, null)
    }
  }
))

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value
      const nickname = profile.username

      let user = await User.findOne({ email })

      if (!user) {
        user = await User.create({
          email,
          nickname,
          password: '',
          provider: 'github'
        })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })

      return done(null, { token })
    } catch (err) {
      return done(err, null)
    }
  }
))
