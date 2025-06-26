export function Badge({ children, className = '', variant = 'default' }) {
  const base =
    'inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold border'
  const variants = {
    default: 'bg-blue-100 text-blue-800 border-blue-200',
    secondary: 'bg-gray-300 text-gray-700 border-gray-400',
    outline: 'bg-white text-gray-800 border-gray-300',
  }
  return (
    <span className={`${base} ${variants[variant] || ''} ${className}`}>
      {children}
    </span>
  )
}
