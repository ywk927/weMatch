// OAuthCallback.jsx
// 소셜 로그인 이후, 리다이렉트 되는 페이지
// 토큰 저장 후, 정보 가져오는 역할

import { useEffect } from 'react'
// Navigate -> 리다이렉트, SearchParams -> ?token= 파라미터 읽기
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'
import axiosInstance from '../lib/axiosInstance'

export default function OAuthCallback() {
  const [searchParams] = useSearchParams() // 토큰 추출
  const navigate = useNavigate() // 페이지 리다이렉트
  const { setToken, setUser } = useUserStore() // 토큰, 정보 저장

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setToken(token)

      // '토큰 포함'하여 사용자 정보 요청
      axiosInstance.get('/api/auth/me')
        .then((res) => {
          setUser(res.data) // 유저 정보 저장
          alert('✅ 깃허브 로그인 성공')
          navigate('/')  // 홈 또는 원하는 페이지
        })
        .catch((err) => {
          alert('❌ 사용자 정보 불러오기 실패')
          console.error(err)
        })
    } else {
      alert('❌ 토큰 없음')
      navigate('/login')
    }
  }, [])

  return <p className="text-center mt-10">깃허브 로그인 처리 중...</p>
}
