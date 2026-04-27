import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../../components/BackButton.jsx'
import { useProfile } from '../../core/ProfileContext.jsx'
import { getLesson, TRICKS } from './additionsData.js'

export default function AdditionsDiscovery() {
  const { lessonId } = useParams()
  const lesson = getLesson(lessonId)
  const { markDiscoverySeen } = useProfile()
  const [step, setStep] = useState(0)

  if (!lesson) return <Navigate to="/additions" replace />
  const tricks = TRICKS[lessonId] || []
  const totalSteps = Math.max(1, tricks.length)

  useEffect(() => {
    if (step === totalSteps - 1) markDiscoverySeen('additions', lessonId)
  }, [step, totalSteps, lessonId, markDiscoverySeen])

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const trick = tricks[step]

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <BackButton to="/additions" label="Leçons" />

        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-green-600">
            {lesson.emoji} {lesson.title}
          </h1>
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={`step-${i}`}
                className={`h-2 rounded-full ${i === step ? 'w-8 bg-green-500' : 'w-2 bg-green-200'}`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            className="card-kid mb-6"
          >
            {trick ? (
              <div className="text-center">
                <div className="inline-block bg-yellow-100 px-4 py-1 rounded-full text-yellow-700 font-bold text-sm mb-3">
                  💡 ASTUCE
                </div>
                <h2 className="text-3xl font-bold text-purple-700 mb-3">{trick.title}</h2>
                <p className="text-lg text-gray-700">{trick.text}</p>
              </div>
            ) : (
              <p className="text-center text-lg text-gray-600">Pas d'astuce pour cette leçon — entraîne-toi directement !</p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 justify-between">
          <button onClick={prev} disabled={step === 0} className="btn-kid bg-gray-300 text-gray-700 disabled:opacity-30">
            ← Précédent
          </button>
          {step < totalSteps - 1 ? (
            <button onClick={next} className="btn-kid bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Suivant →
            </button>
          ) : (
            <Link to={`/additions/entrainement/${lessonId}/1`} className="btn-kid bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              💪 S'entraîner !
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
