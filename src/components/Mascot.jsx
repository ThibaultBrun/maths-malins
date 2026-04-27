import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../core/ProfileContext.jsx'

export default function Mascot({ mood = 'idle', message }) {
  const { profile } = useProfile()
  const animations = {
    idle: { y: [0, -4, 0], rotate: 0 },
    happy: { y: [0, -20, 0], rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] },
    sad: { y: 0, rotate: [-5, 5, -5], scale: 0.95 },
  }

  const bg = {
    idle: 'bg-blue-100',
    happy: 'bg-green-100',
    sad: 'bg-orange-100',
  }[mood]

  return (
    <div className={`flex items-center gap-3 ${bg} rounded-2xl p-3 shadow-sm`}>
      <motion.div
        className="text-5xl flex-shrink-0"
        animate={animations[mood]}
        transition={
          mood === 'idle'
            ? { duration: 2, repeat: Infinity }
            : { duration: 0.6 }
        }
      >
        {profile.avatar}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="text-lg font-bold text-gray-700"
        >
          {message}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
