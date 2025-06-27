import './BottomNav.css'

const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bottom-nav">
      <button
        className={activeTab === 'home' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => setActiveTab('home')}
      >
        🧩 Home
      </button>
      <button
        className={activeTab === 'match' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => setActiveTab('match')}
      >
        🤝 Match
      </button>
      <button
        className={activeTab === 'make' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => setActiveTab('make')}
      >
        🛠 Make
      </button>
    </div>
  )
}

export default BottomNav
