const ProfileTabs = ({ currentTab, onChange }) => {
  const tabs = ['기본정보', '포스팅', '프로젝트']
//   console.log(currentTab)
  return (
    <div className="profile-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={currentTab === tab ? 'active' : ''}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default ProfileTabs