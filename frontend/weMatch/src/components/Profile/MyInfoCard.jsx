// src/components/Profile/MyInfoCard.jsx
import './MyInfoCard.css'
import defaultImg from '../../assets/icons/user.png'

const MyInfoCard = ({ user, isPublic = false }) => {
  if (!user) return <p>로딩 중...</p>

  const { email, nickname, position, description, skills = [], image } = user
  const imageUrl = image ? `http://localhost:3000${image}` : defaultImg

  return (
    <div className="my-info-card">
      {/* 좌측: 프로필 이미지 + 닉네임, 이메일 */}
      <div className="info-left">
        <img src={imageUrl} alt="프로필 이미지" className="info-profile-img" />
        <div className="info-left-text">
          <h2 className="info-nickname">{nickname}</h2>
          {!isPublic && <p className="info-email">📧 {email}</p>}
        </div>
      </div>

      {/* 우측: 포지션, 소개, 기술스택 */}
      <div className="info-right">
        <div className="info-item">
          <strong>🧑‍💻 포지션:</strong>
          <div className="info-description">
            {position || '미입력'}
          </div>
        </div>

        <div className="info-item">
          <strong>📝 소개:</strong>
          <div className="info-description">
            {description || '소개글이 없습니다.'}
          </div>
        </div>

        <div className="info-item">
          <strong>🛠 기술 스택:</strong>
          <div className="info-skill-badges">
            {skills.length > 0 ? (
              skills.map((skill, idx) => (
                <span key={skill._id || idx} className="info-skill-tag">
                  #{skill.name} ({skill.level})
                </span>
              ))
            ) : (
              <p>등록된 기술 스택이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyInfoCard
