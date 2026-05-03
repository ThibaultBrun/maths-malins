import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../../components/BackButton.jsx'
import { useProfile } from '../../core/ProfileContext.jsx'
import FractionVisual from './FractionVisual.jsx'
import { fractionLabel, getLesson } from './fractionsData.js'

export default function FractionsDiscovery() {
  const { lessonId } = useParams()
  const lesson = getLesson(lessonId)
  const { markDiscoverySeen } = useProfile()
  const [step, setStep] = useState(0)

  if (!lesson) return <Navigate to="/fractions" replace />

  const examples = buildExamples(lesson.denominators)
  const totalSteps = examples.length + 1

  useEffect(() => {
    if (step === totalSteps - 1) markDiscoverySeen('fractions', lesson.id)
  }, [step, totalSteps, lesson.id, markDiscoverySeen])

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <BackButton to="/fractions" label="Fractions" />

        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-rose-600">{lesson.emoji} {lesson.title}</h1>
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-rose-500' : 'w-2 bg-rose-200'}`} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            className="card-kid mb-6 text-center"
          >
            {step < examples.length ? <ExampleStep example={examples[step]} /> : <ReadyStep lesson={lesson} />}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 justify-between">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="btn-kid bg-gray-300 text-gray-700 disabled:opacity-30">
            ← Précédent
          </button>
          {step < totalSteps - 1 ? (
            <button onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))} className="btn-kid bg-gradient-to-r from-rose-500 to-orange-500 text-white">
              Suivant →
            </button>
          ) : (
            <Link to={`/fractions/entrainement/${lesson.id}/1`} className="btn-kid bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              🌱 S'entraîner
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function ExampleStep({ example }) {
  return (
    <>
      <div className="text-6xl mb-3">{example.emoji}</div>
      <h2 className="text-3xl font-bold text-purple-700 mb-2">{example.title}</h2>
      <p className="text-lg text-gray-700 mb-5">{example.text}</p>
      <FractionVisual numerator={example.numerator} denominator={example.denominator} type={example.type} />
      <div className="mt-5 inline-block bg-rose-100 rounded-2xl px-6 py-3">
        <div className="text-4xl font-bold text-rose-700">{example.numerator}/{example.denominator}</div>
        <div className="text-rose-600 font-bold">{fractionLabel(example.numerator, example.denominator)}</div>
      </div>
    </>
  )
}

function ReadyStep({ lesson }) {
  return (
    <>
      <div className="text-6xl mb-3">🎨</div>
      <h2 className="text-3xl font-bold text-purple-700 mb-3">À toi de jouer !</h2>
      <p className="text-lg text-gray-700">
        Compte toutes les parts, puis compte les parts coloriées. C'est comme lire une image secrète.
      </p>
      <p className="mt-4 font-bold text-rose-700">{lesson.description}</p>
    </>
  )
}

function buildExamples(denominators) {
  return denominators.slice(0, 3).map((denominator, index) => {
    const numerator = Math.min(index + 1, denominator)
    return {
      numerator,
      denominator,
      type: index % 2 === 0 ? 'circle' : 'bar',
      emoji: index % 2 === 0 ? '🍕' : '🍫',
      title: `${numerator} part${numerator > 1 ? 's' : ''} coloriée${numerator > 1 ? 's' : ''}`,
      text: `L'objet est partagé en ${denominator} parts égales. On en colorie ${numerator}.`,
    }
  })
}
