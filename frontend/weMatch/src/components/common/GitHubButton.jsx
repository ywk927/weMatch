// GitHubButton.jsx

export default function GitHubLoginButton() {
  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/github'
  }

  return (
    <button
      onClick={handleGitHubLogin}
      className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md"
    >
      GitHub로 로그인
    </button>
  )
}
