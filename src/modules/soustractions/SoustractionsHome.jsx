import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProfile } from '../../core/ProfileContext.jsx'
import BackButton from '../../components/BackButton.jsx'
import { SOUSTRACTION_LESSONS } from './soustractionsData.js'

export default function SoustractionsHome() {
  const { profile } = useProfile()
  const { lessonStars, seenDiscovery } = profile.progress.soustractions

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <BackButton to="/" label="Accueil" />

        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold text-yellow-700 mb-2">➖ Les Soustractions</h1>
          <p className="text-xl text-yellow-600">Choisis une leçon !</p>
        </motion.div>

        <div className="card-kid">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOUSTRACTION_LESSONS.map((l, i) => (
              <LessonCard
                key={l.id}
                lesson={l}
                stars={lessonStars[l.id] || 0}
                discovered={!!seenDiscovery[l.id]}
                index={i}
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
      className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-3xl">{lesson.emoji}</span>
        <h3 className="text-lg font-bold text-orange-800 flex-1">{lesson.title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
      <div className="flex justify-start gap-0.5 mb-3">
        {[1, 2, 3].map((s) => (
          <span key={s} className={`text-xl ${s <= stars ? '' : 'opacity-20'}`}>⭐</span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Link
          to={`/soustractions/decouverte/${lesson.id}`}
          className={`text-sm py-2 px-3 rounded-lg font-bold text-center ${
            discovered ? 'bg-blue-100 text-blue-700' : 'bg-blue-500 text-white animate-pulse'
          }`}
        >
          {discovered ? '🔍 Revoir' : '🔍 Découvrir'}
        </Link>
        <div className="grid grid-cols-3 gap-2">
          <Link to={`/soustractions/entrainement/${lesson.id}/1`} className="text-lg py-2 rounded-lg bg-green-200 hover:bg-green-300 text-center" title="Facile">🌱</Link>
          <Link to={`/soustractions/entrainement/${lesson.id}/2`} className="text-lg py-2 rounded-lg bg-yellow-200 hover:bg-yellow-300 text-center" title="Moyen">💪</Link>
          <Link to={`/soustractions/entrainement/${lesson.id}/3`} className="text-lg py-2 rounded-lg bg-red-200 hover:bg-red-300 text-center" title="Expert">🔥</Link>
        </div>
      </div>
    </motion.div>
  )
}
