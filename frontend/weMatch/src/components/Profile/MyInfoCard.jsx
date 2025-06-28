// src/components/Profile/MyInfoCard.jsx

const MyInfoCard = ({ user, isPublic = false }) => {
  if (!user) return <p>로딩 중...</p>

  const { email, nickname, position, description, skills = [], image } = user

  return (
    <div style={cardStyle}>
      <h2>{nickname}</h2>

      {image && (
        <div style={{ marginBottom: '10px' }}>
          <img
            src={`http://localhost:3000${image}`}
            alt="프로필 이미지"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {!isPublic && (
        <p><strong>📧 이메일:</strong> {email}</p>
      )}

      <p><strong>🧑‍💻 포지션:</strong> {position || '미입력'}</p>
      <p><strong>📝 소개:</strong> {description || '소개글이 없습니다.'}</p>

      <div style={{ marginTop: '10px' }}>
        <strong>🛠 기술 스택:</strong>
        <div style={{ display: 'flex', gap: '8px', marginTop: '5px', flexWrap: 'wrap' }}>
          {skills.length > 0 ? (
            skills.map((skill, idx) => (
              <span key={skill._id || idx} style={badgeStyle}>
                {skill.name} ({skill.level})
              </span>
            ))
          ) : (
            <p>등록된 기술 스택이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  )
}


const cardStyle = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  backgroundColor: '#fafafa',
  maxWidth: '600px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
}

const badgeStyle = {
  padding: '6px 12px',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '20px',
  fontSize: '0.85rem',
}

export default MyInfoCard
