// GoogleButton.jsx

export default function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google'
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-semibold mt-4"
    >
      Google 계정으로 로그인
    </button>
  )
}