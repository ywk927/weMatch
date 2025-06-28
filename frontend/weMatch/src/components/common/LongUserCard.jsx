import './LongUserCard.css'
import { useNavigate } from 'react-router-dom'
import defaultImg from '../../assets/icons/user.png'

const LongUserCard = ({ user, isCurrentUser = false }) => {
  if (!user) return null
  console.log('LongUserCard user:', user)

  const navigate = useNavigate()
  const { _id, nickname, position, email, description, skills, image } = user
  const imageUrl = image ? `http://localhost:3000/${image}` : defaultImg

  const handleClick = () => {
    if (isCurrentUser) {
      navigate('/profile')
    } else if (_id) {
      navigate(`/profile/${_id}`)
    } else {
      console.warn('유저 ID 없음: navigate 생략됨')
    }
  }

  return (
    <div className="long-user-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {/* 상단: 프로필 + 정보 */}
      <div className="long-user-top">
        <img className="long-user-img" src={imageUrl} alt="프로필" />
        <div className="long-user-info">
          <div className="long-user-nickname">{nickname || '익명'}</div>
          {position && (
            <div className="long-user-position">
              <span className="check-icon">✔️</span> {position}
            </div>
          )}
          {email && (
            <div className="long-user-email">@{email}</div>
          )}
        </div>
      </div>

      {/* 설명 */}
      {description && (
        <div className="long-user-description">
          {description}
        </div>
      )}

      {/* 기술 스택 */}
      <div className="long-user-skills">
        {skills?.map((skill, idx) => (
          <span key={idx} className="long-skill-tag">
            #{skill.name}({skill.level})
          </span>
        ))}
      </div>
    </div>
  )
}

export default LongUserCard
