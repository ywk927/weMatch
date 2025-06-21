const ProjectDetail = () => {

  // 더미데이터
  const project = {
    title: '사이드 프로젝트 모집합니다!',
    category: '웹 프론트엔드',
    createdAt: '2025-06-21',
    status: '모집 중',
    stacks: ['React', 'Node.js', 'MongoDB'],
    description: '함께 성장할 프론트엔드 개발자를 찾습니다! 빠르게 MVP를 만들고자 하는 열정 가득한 팀입니다.',
    members: [
      { id: 1, name: '유진', role: '웹 서버' },
      { id: 2, name: '영우', role: '웹 프론트엔드' },
    ],
    positions: [
      { position: '프로덕트 매니저', current: 1, total: 2 },
      { position: '웹 서버', current: 1, total: 1 },
      { position: '웹 프론트엔드', current: 1, total: 1 },
      { position: 'UI/UX디자인', current: 0, total: 1 },
    ]
  }

  return (
    <div>
      <h1>ProjectDetail</h1>
      {/* 프로젝트 헤더 */}
      <div className="project-header">
        <h1>프로젝트 타이틀</h1>
        <p className="project-meta">
          {project.category} / {project.createdAt}
        </p>
        <span className="project-status">{project.status}</span>
      </div>

      <hr className="divider"/>

      {/* 모집현황 */}
      <div className="recruit-section">
        <h4>모집 현황</h4>
        <ul>
          {project.positions.map((pos) => (
            <li key={pos.position} className="recruit-item">
              {pos.position}: {pos.current} / {pos.total}
            </li>
          ))}
        </ul>
      </div>

      {/* 소개 */}
      <div className="description-section">
        <h4>소개</h4>
        <p className="description-text">
          {project.description}
        </p>
      </div>

      {/* 기술/언어 */}
      <div className="stack-section">
        <h4>기술/언어</h4>
        <div className="stack-list">
          {project.stacks.map((stack) => (
            <span key={stack} className="stack-badge">
              #{stack}
            </span>
          ))}
        </div>
      </div>

      {/* 멤버 */}
      <div className="member-section">
        <h4>멤버</h4>
        <ul>
          {project.members.map((member) => (
            <li key={member.id} className="member-item">
              {member.name} - {member.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProjectDetail