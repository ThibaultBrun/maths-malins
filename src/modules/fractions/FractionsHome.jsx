import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProfile } from '../../core/ProfileContext.jsx'
import BackButton from '../../components/BackButton.jsx'
import DifficultyLinks from '../../components/DifficultyLinks.jsx'
import { FRACTION_LESSONS } from './fractionsData.js'

export default function FractionsHome() {
  const { profile } = useProfile()
  const { lessonStars, seenDiscovery } = profile.progress.fractions

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <BackButton to="/" label="Accueil" />

        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold text-rose-600 mb-2">🍕 Les Fractions</h1>
          <p className="text-xl text-rose-500">Colorie, partage et retrouve les parts !</p>
        </motion.div>

        <div className="card-kid mb-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <MiniFraction label="1/2" parts={2} colored={1} />
            <MiniFraction label="1/3" parts={3} colored={1} />
            <MiniFraction label="3/4" parts={4} colored={3} />
          </div>
        </div>

        <div className="card-kid">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FRACTION_LESSONS.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                stars={lessonStars[lesson.id] || 0}
                discovered={!!seenDiscovery[lesson.id]}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LessonCard({ lesson, stars, discovered, index }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.06 }}
      className="bg-gradient-to-br from-rose-100 to-orange-100 rounded-2xl p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-3xl">{lesson.emoji}</span>
        <h3 className="text-lg font-bold text-rose-800 flex-1">{lesson.title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
      <div className="flex justify-start gap-0.5 mb-3">
        {[1, 2, 3].map((s) => (
          <span key={s} className={`text-xl ${s <= stars ? '' : 'opacity-20'}`}>⭐</span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Link
          to={`/fractions/decouverte/${lesson.id}`}
          className={`text-sm py-2 px-3 rounded-lg font-bold text-center ${
            discovered ? 'bg-blue-100 text-blue-700' : 'bg-blue-500 text-white animate-pulse'
          }`}
        >
          {discovered ? '🔍 Revoir' : '🔍 Découvrir'}
        </Link>
        <DifficultyLinks compact getPath={(level) => `/fractions/entrainement/${lesson.id}/${level}`} />
      </div>
    </motion.div>
  )
}

function MiniFraction({ label, parts, colored }) {
  return (
    <div className="rounded-2xl bg-rose-50 p-3">
      <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: `repeat(${parts}, minmax(0, 1fr))` }}>
        {Array.from({ length: parts }).map((_, index) => (
          <span key={index} className={`h-10 rounded-lg ${index < colored ? 'bg-rose-400' : 'bg-white'}`} />
        ))}
      </div>
      <div className="font-bold text-rose-700">{label}</div>
    </div>
  )
}
