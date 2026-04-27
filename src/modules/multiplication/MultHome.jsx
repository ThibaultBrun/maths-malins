import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProfile } from '../../core/ProfileContext.jsx'
import BackButton from '../../components/BackButton.jsx'

const TABLES = [2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function MultHome() {
  const { profile } = useProfile()
  const { lessonStars, seenDiscovery } = profile.progress.multiplications

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <BackButton to="/" label="Accueil" />

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-orange-600 mb-2">
            ✖️ Les Multiplications
          </h1>
          <p className="text-xl text-orange-500">Choisis une table à apprendre !</p>
        </motion.div>

        <div className="card-kid mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">📚 Les tables</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {TABLES.map((t, i) => (
              <TableCard
                key={t}
                table={t}
                stars={lessonStars[t] || 0}
                discovered={!!seenDiscovery[t]}
                index={i}
              />
            ))}
          </div>
        </div>

        <div className="card-kid">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">🎯 Tu te sens prêt ?</h2>
          <Link
            to="/multiplications/defi"
            className="block w-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-4 rounded-2xl font-bold text-2xl shadow-lg hover:scale-[1.02] transition-transform"
          >
            🏆 Mode Défi (chrono)
          </Link>
          <p className="text-center text-gray-500 mt-2 text-sm">
            Toutes les tables, le plus vite possible !
          </p>
        </div>
      </div>
    </div>
  )
}

function TableCard({ table, stars, discovered, index }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-3 text-center"
    >
      <div className="text-3xl font-bold text-orange-600 mb-2">×{table}</div>
      <div className="flex justify-center gap-0.5 mb-2 h-5">
        {[1, 2, 3].map((s) => (
          <span key={s} className={`text-lg ${s <= stars ? '' : 'opacity-20'}`}>
            ⭐
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <Link
          to={`/multiplications/decouverte/${table}`}
          className={`text-xs py-1.5 px-2 rounded-lg font-bold transition-colors ${
            discovered ? 'bg-blue-100 text-blue-700' : 'bg-blue-500 text-white animate-pulse'
          }`}
        >
          {discovered ? '🔍 Revoir' : '🔍 Découvrir'}
        </Link>
        <div className="grid grid-cols-3 gap-1">
          <Link
            to={`/multiplications/entrainement/${table}/1`}
            title="Niveau facile : 2 choix"
            className="text-lg py-1.5 rounded-lg bg-green-200 hover:bg-green-300"
          >
            🌱
          </Link>
          <Link
            to={`/multiplications/entrainement/${table}/2`}
            title="Niveau moyen : 4 choix"
            className="text-lg py-1.5 rounded-lg bg-yellow-200 hover:bg-yellow-300"
          >
            💪
          </Link>
          <Link
            to={`/multiplications/entrainement/${table}/3`}
            title="Niveau expert : tape la réponse"
            className="text-lg py-1.5 rounded-lg bg-red-200 hover:bg-red-300"
          >
            🔥
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
