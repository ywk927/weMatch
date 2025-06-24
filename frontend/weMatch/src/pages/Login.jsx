import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      // 1. 로그인 요청
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password })
      console.log(res)
      const token = res.data.token

      // 2. 토큰 저장
      localStorage.setItem('token', token)

      // 3. 유저 정보 요청
        const userRes = await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        console.log(userRes)
      // 4. 유저 정보 저장
      localStorage.setItem('user', JSON.stringify(userRes.data))

      // 5. 프로필 페이지로 이동
      navigate('/profile')
    } catch (err) {
      console.error('로그인 실패:', err)
      alert('로그인 실패. 이메일 또는 비밀번호를 확인하세요.')
    }
  }

  return (
    <div className="container">
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  )
}

export default Login
