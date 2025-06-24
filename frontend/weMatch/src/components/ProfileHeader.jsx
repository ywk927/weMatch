const ProfileHeader = ({ user }) => {
  return (
    <div className="profile-header">
      <div className="profile-background"></div>
      <img className="profile-image" src={user.profileImageUrl} alt="프로필" />
      <h2>{user.nickname}</h2>
      <span>{user.role} ({user.level})</span>
      <div className="profile-stats">
        <span>총 방문자: {user.visits}</span>
        <span>팔로잉: {user.following.length}</span>
        <span>팔로워: {user.followers.length}</span>
      </div>
      <div className="profile-buttons">
        <button>모임 초대</button>
        <button>커피챗</button>
        <button>팔로우</button>
      </div>
    </div>
  )
}

export default ProfileHeader