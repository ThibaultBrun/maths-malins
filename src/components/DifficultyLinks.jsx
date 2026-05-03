import { Link } from 'react-router-dom'

export const DIFFICULTIES = {
  1: {
    icon: '🌱',
    label: 'Facile',
    sub: '2 choix',
    className: 'bg-green-200 text-green-900 hover:bg-green-300',
  },
  2: {
    icon: '💪',
    label: 'Moyen',
    sub: '4 choix',
    className: 'bg-yellow-200 text-yellow-900 hover:bg-yellow-300',
  },
  3: {
    icon: '🔥',
    label: 'Difficile',
    sub: 'à écrire',
    className: 'bg-red-200 text-red-900 hover:bg-red-300',
  },
}

export default function DifficultyLinks({ getPath, compact = false }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3].map((level) => {
        const difficulty = DIFFICULTIES[level]
        return (
          <Link
            key={level}
            to={getPath(level)}
            title={`${difficulty.label} : ${difficulty.sub}`}
            className={`rounded-lg font-bold text-center transition-colors ${difficulty.className} ${
              compact ? 'px-1 py-2 text-xs sm:text-sm' : 'px-2 py-3 text-sm'
            }`}
          >
            <span className="block text-lg leading-none mb-1">{difficulty.icon}</span>
            <span className="block leading-tight">{difficulty.label}</span>
            {!compact && <span className="block text-xs font-semibold opacity-75">{difficulty.sub}</span>}
          </Link>
        )
      })}
    </div>
  )
}
