import { Link } from 'react-router-dom'

export default function BackButton({ to, label = 'Retour' }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 rounded-full shadow-md text-purple-700 font-bold hover:bg-white transition-colors"
    >
      ← {label}
    </Link>
  )
}
