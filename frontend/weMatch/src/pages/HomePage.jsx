import React from 'react'
import useUser from '../stores/User'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'

export default function HomePage() {
  const { user } = useUser()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>환영합니다!</CardTitle>
          <CardDescription>
            이 앱은 base44 플랫폼을 참고하여 만들어졌습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <p>
              안녕하세요, <span className="font-semibold">{user.nickname}</span>님! 앱을 둘러보세요.
            </p>
          ) : (
            <p>시작하려면 로그인해주세요.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}