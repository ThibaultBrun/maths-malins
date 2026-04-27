import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../../components/BackButton.jsx'
import { useProfile } from '../../core/ProfileContext.jsx'
import { playSound } from '../../core/sounds.js'

const DURATION = 60
const HIGHSCORE_KEY = 'mathkids.challenge.highscore'

function genQuestion() {
  const a = 2 + Math.floor(Math.random() * 9)
  const b = 2 + Math.floor(Math.random() * 9)
  const result = a * b
  const choices = new Set([result])
  while (choices.size < 4) {
    const offset = Math.floor(Math.random() * 9) - 4
    const c = result + (offset === 0 ? a : offset)
    if (c > 0 && c !== result) choices.add(c)
  }
  return { a, b, result, choices: [...choices].sort(() => Math.random() - 0.5) }
}

export default function Challenge() {
  const { addStars } = useProfile()
  const [phase, setPhase] = useState('ready') // ready | playing | over
  const [time, setTime] = useState(DURATION)
  const [q, setQ] = useState(genQuestion)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState(null) // 'good' | 'bad'
  const [highscore, setHighscore] = useState(() => parseInt(localStorage.getItem(HIGHSCORE_KEY) || '0', 10))
  const tickRef = useRef(null)

  useEffect(() => {
    if (phase !== 'playing') return
    tickRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(tickRef.current)
          setPhase('over')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(tickRef.current)
  }, [phase])

  useEffect(() => {
    if (phase === 'over') {
      if (score > highscore) {
        localStorage.setItem(HIGHSCORE_KEY, String(score))
        setHighscore(score)
      }
      addStars(Math.floor(score / 2))
      playSound('win')
    }
  }, [phase])

  function start() {
    setPhase('playing')
    setTime(DURATION)
    setScore(0)
    setStreak(0)
    setQ(genQuestion())
  }

  function answer(value) {
    if (feedback) return
    if (value === q.result) {
      setScore((s) => s + 1 + Math.floor(streak / 3))
      setStreak((s) => s + 1)
      setFeedback('good')
      playSound('correct')
    } else {
      setStreak(0)
      setFeedback('bad')
      playSound('wrong')
    }
    setTimeout(() => {
      setFeedback(null)
      setQ(genQuestion())
    }, 350)
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <BackButton to="/multiplications" label="Tables" />

        <h1 className="text-4xl font-bold text-red-600 text-center mb-4">
          🏆 Mode Défi
        </h1>

        {phase === 'ready' && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-kid text-center">
            <div className="text-6xl mb-4">⏱️</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Prêt ?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Tu as <strong>60 secondes</strong> pour faire un maximum de bonnes réponses !
              <br />
              <span className="text-sm">Multiplications de 2 à 9.</span>
            </p>
            <p className="text-yellow-700 mb-6">
              🥇 Meilleur score : <strong>{highscore}</strong>
            </p>
            <button onClick={start} className="btn-kid bg-gradient-to-r from-red-500 to-pink-500 text-white text-2xl">
              🚀 C'est parti !
            </button>
          </motion.div>
        )}

        {phase === 'playing' && (
          <>
            <div className="flex justify-between items-center mb-3">
              <div className="bg-yellow-100 px-4 py-2 rounded-full font-bold text-2xl text-yellow-700">
                ⭐ {score}
              </div>
              {streak >= 3 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold"
                >
                  🔥 x{1 + Math.floor(streak / 3)}
                </motion.div>
              )}
              <div className={`px-4 py-2 rounded-full font-bold text-2xl ${time <= 10 ? 'bg-red-200 text-red-700 animate-pulse' : 'bg-blue-100 text-blue-700'}`}>
                ⏱️ {time}s
              </div>
            </div>

            <div className="h-3 bg-blue-100 rounded-full mb-6 overflow-hidden">
              <motion.div
                className={`h-full ${time <= 10 ? 'bg-red-500' : 'bg-blue-500'}`}
                animate={{ width: `${(time / DURATION) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${q.a}-${q.b}-${time}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className={`card-kid transition-colors ${
                  feedback === 'good' ? 'bg-green-100' : feedback === 'bad' ? 'bg-red-100' : ''
                }`}
              >
                <div className="text-7xl sm:text-8xl font-bold text-purple-700 text-center mb-6">
                  {q.a} × {q.b}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {q.choices.map((c) => (
                    <motion.button
                      key={c}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => answer(c)}
                      className="btn-kid text-3xl bg-gradient-to-br from-blue-400 to-purple-500 text-white"
                    >
                      {c}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {phase === 'over' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card-kid text-center"
          >
            <h2 className="text-4xl font-bold text-purple-700 mb-2">Temps écoulé !</h2>
            {score > highscore && score > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -5, 5, 0] }}
                className="text-3xl font-bold text-yellow-500 mb-2"
              >
                🏆 NOUVEAU RECORD !
              </motion.div>
            )}
            <div className="text-7xl my-4">🎉</div>
            <p className="text-3xl font-bold text-orange-600 mb-2">{score} points</p>
            <p className="text-gray-600 mb-6">Meilleur score : {highscore}</p>
            <div className="flex flex-col gap-3">
              <button onClick={start} className="btn-kid bg-gradient-to-r from-red-500 to-pink-500 text-white">
                🔄 Rejouer
              </button>
              <Link to="/multiplications" className="btn-kid bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                📚 Retour aux tables
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
