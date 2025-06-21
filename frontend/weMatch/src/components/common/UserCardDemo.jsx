import React from 'react'
import UserCard from './UserCard'

const UserCardDemo = () => {
  const dummyUser = {
    userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    userName: '아뜨뜨',
    userProjectCount: 1,
    userLikeCount: 12,
    userPosition: '기획',
    userSubPosition: '웹 프론트엔드',
    userStack: '리액트',
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <UserCard
        userImage={dummyUser.userImage}
        userName={dummyUser.userName}
        userProjectCount={dummyUser.userProjectCount}
        userLikeCount={dummyUser.userLikeCount}
        userPosition={dummyUser.userPosition}
        userSubPosition={dummyUser.userSubPosition}
        userStack={dummyUser.userStack}
      />
    </div>
  )
}

export default UserCardDemo
