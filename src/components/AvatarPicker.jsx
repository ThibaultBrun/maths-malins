import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../core/ProfileContext.jsx'

const AVATARS = ['🦊', '🐼', '🦁', '🐯', '🐰', '🐨', '🐸', '🦄', '🐵', '🐶', '🐱', '🦉']

export default function AvatarPicker() {
  const { profile, setName, setAvatar } = useProfile()
  const [open, setOpen] = useState(false)

  return (
    <div className="card-kid">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(!open)}
          className="text-6xl bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full w-20 h-20 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
        >
          {profile.avatar}
        </button>
        <div className="flex-1">
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Comment tu t'appelles ?"
            className="w-full text-2xl font-bold text-purple-700 bg-transparent border-b-2 border-purple-200 focus:border-purple-500 outline-none px-2 py-1"
            maxLength={20}
          />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-6 gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setAvatar(a)
                    setOpen(false)
                  }}
                  className={`text-4xl p-2 rounded-2xl hover:bg-purple-100 transition-colors ${
                    profile.avatar === a ? 'bg-purple-200' : ''
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
