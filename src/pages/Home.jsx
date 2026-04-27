import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProfile } from '../core/ProfileContext.jsx'
import { MODULES } from '../core/modules.js'
import AvatarPicker from '../components/AvatarPicker.jsx'

export default function Home() {
  const { profile } = useProfile()

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-purple-700 mb-2">
            Maths Malins 🎉
          </h1>
          <p className="text-xl text-purple-500">
            Apprends les maths en t'amusant !
          </p>
        </motion.header>

        <AvatarPicker />

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {profile.name ? `Salut ${profile.name} ! ` : ''}Choisis ton aventure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MODULES.map((mod, i) => (
              <ModuleCard key={mod.id} module={mod} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-100 px-6 py-3 rounded-full shadow-md">
            <span className="text-3xl">⭐</span>
            <span className="text-2xl font-bold text-yellow-700">
              {profile.stars} étoiles gagnées
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ModuleCard({ module, index }) {
  const content = (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={module.available ? { scale: 1.03, rotate: 1 } : {}}
      whileTap={module.available ? { scale: 0.97 } : {}}
      className={`bg-gradient-to-br ${module.color} rounded-3xl p-6 shadow-xl text-white ${
        module.available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="text-6xl mb-3">{module.emoji}</div>
      <h3 className="text-3xl font-bold mb-2">{module.title}</h3>
      <p className="text-lg opacity-90">{module.description}</p>
      {!module.available && (
        <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
          🔒 Bientôt
        </div>
      )}
    </motion.div>
  )

  return module.available ? <Link to={module.path}>{content}</Link> : <div>{content}</div>
}
