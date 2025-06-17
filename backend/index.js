// index.js
require('dotenv').config();  // ⬅️ 맨 위에 dotenv 로딩

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const passport = require('passport')

require('./config/passport')  // 전략 설정 불러오기

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

app.get('/', (req, res) => {
  res.send('MongoDB + Express 서버!')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use(passport.initialize())