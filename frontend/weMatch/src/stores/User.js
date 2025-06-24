import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get('/api/auth/me') // 토큰 포함 필요 시 추가
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
  }, [])

  return { user }
}
