import "./UserCard.css"

const UserCard = ({
  userImage,
  userName,
  userProjectCount,
  userLikeCount,
  userPosition,
  userSubPosition,
  userStack
}) => {
  return (
    <div className="card user-card">
      {/* 상단 헤더: 이미지 + 이름 등 */}
      <div className="user-card-top">
        <div className="card-img-container">
          <img src={userImage} className="user-card-img" alt="프로필 이미지" />
        </div>

        <div className="user-card-info">
          <div className="user-card-header">
            <h5 className="user-name">{userName}</h5>
          </div>

          <div className="user-card-stats">
            <span className="stat">📁 {userProjectCount}</span>
            <span className="stat">❤️ {userLikeCount}</span>
          </div>
        </div>
      </div>

      {/* 하단: 포지션 정보 */}
        <div className="user-card-roles">
          <p className="user-position">[포지션] {userPosition}</p>
          <p className="user-position">[서브포지션] {userSubPosition}</p>
          <p className="user-stack">[기술/언어] {userStack}</p>
        </div>
      </div>
  )
}

export default UserCard