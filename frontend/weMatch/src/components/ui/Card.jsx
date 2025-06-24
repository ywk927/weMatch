export function Card({ children }) {
  return <div className="border rounded-lg p-6 bg-white shadow">{children}</div>
}

export function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>
}

export function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>
}

export function CardDescription({ children }) {
  return <p className="text-gray-500 text-sm">{children}</p>
}

export function CardContent({ children }) {
  return <div>{children}</div>
}
