// src/components/Profile/MyInfoCard.jsx
const MyInfoCard = ({ user }) => {
  if (!user) return <p>로딩 중...</p>

  const { email, nickname, level, skills = [] } = user

  return (
    <div style={cardStyle}>
      <h2>{nickname}</h2>
      <p><strong>이메일:</strong> {email}</p>
      <p><strong>숙련도:</strong> {level}</p>
      <div style={{ marginTop: '10px' }}>
        <strong>기술 스택:</strong>
        <div style={{ display: 'flex', gap: '8px', marginTop: '5px', flexWrap: 'wrap' }}>
          {skills.map((skill, idx) => (
            <span key={idx} style={badgeStyle}>{skill}</span>
          ))}
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
  maxWidth: '500px',
}

const badgeStyle = {
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '20px',
  fontSize: '0.85rem'
}

export default MyInfoCard
