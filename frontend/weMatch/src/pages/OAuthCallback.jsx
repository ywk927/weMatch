import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'
import axiosInstance from '../lib/axiosInstance'

export default function OAuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setToken, setUser } = useUserStore()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setToken(token)
      axiosInstance.get('/auth/me')
        .then((res) => {
          setUser(res.data)
          alert('✅ 소셜 로그인 성공')
          navigate('/')
        })
        .catch((err) => {
          alert('❌ 사용자 정보 불러오기 실패')
          console.error(err)
          navigate('/login')
        })
    } else {
      alert('❌ 토큰 없음')
      navigate('/login')
    }
  }, [navigate, searchParams, setToken, setUser])

  return <p className="text-center mt-10">소셜 로그인 처리 중...</p>
}