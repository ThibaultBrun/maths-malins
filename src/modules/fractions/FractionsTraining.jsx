import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../../components/BackButton.jsx'
import Mascot from '../../components/Mascot.jsx'
import { useProfile } from '../../core/ProfileContext.jsx'
import { buildSession, computeStars } from '../../core/quizEngine.js'
import { DIFFICULTIES } from '../../components/DifficultyLinks.jsx'
import { playSound } from '../../core/sounds.js'
import FractionVisual from './FractionVisual.jsx'
import { fractionLabel, generateQuestions, getHintFor, getLesson, makeFraction } from './fractionsData.js'

const LEVEL_INFO = {
  1: { ...DIFFICULTIES[1], choices: 2 },
  2: { ...DIFFICULTIES[2], choices: 4 },
  3: { ...DIFFICULTIES[3], choices: 0 },
}
const CHOICE_DENOMINATORS = [2, 3, 4, 5, 6]

export default function FractionsTraining() {
  const { lessonId, level: levelParam } = useParams()
  const lesson = getLesson(lessonId)
  const parsedLevel = Number.parseInt(levelParam, 10)
  const level = LEVEL_INFO[parsedLevel] ? parsedLevel : 2

  if (!lesson) return <Navigate to="/fractions" replace />

  return <FractionQuiz key={`${lesson.id}-${level}`} lesson={lesson} level={level} />
}

function FractionQuiz({ lesson, level }) {
  const info = LEVEL_INFO[level]
  const { profile, recordAnswer, addStars, setLessonStars } = useProfile()
  const masteryMap = profile.progress.fractions?.mastery || {}
  const allQuestions = useMemo(() => generateQuestions(lesson), [lesson])
  const [session, setSession] = useState(() => buildSession(allQuestions, masteryMap))
  const [index, setIndex] = useState(0)
  const [choices, setChoices] = useState(() => buildChoices(session[0], info.choices))
  const [picked, setPicked] = useState(null)
  const [typedNum, setTypedNum] = useState('')
  const [typedDen, setTypedDen] = useState('')
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  const current = session[index]
  const isTypingMode = info.choices === 0
  const type = index % 2 === 0 ? 'circle' : 'bar'

  function next() {
    if (index + 1 >= session.length) {
      setDone(true)
      return
    }
    const nextIndex = index + 1
    setIndex(nextIndex)
    setChoices(buildChoices(session[nextIndex], info.choices))
    setPicked(null)
    setTypedNum('')
    setTypedDen('')
  }

  function commitAnswer(answer) {
    if (picked !== null) return
    const isCorrect = answer === current.label
    setPicked(answer)
    recordAnswer('fractions', current.key, isCorrect)
    if (isCorrect) {
      setCorrectCount((count) => count + 1)
      addStars(1)
      playSound('correct')
    } else {
      playSound('wrong')
    }
    setTimeout(next, isCorrect ? 1100 : 2400)
  }

  useEffect(() => {
    if (!done) return
    const ratio = correctCount / session.length
    const stars = computeStars(ratio)
    if (stars > 0) setLessonStars('fractions', lesson.id, Math.min(3, stars + (level === 3 ? 1 : 0)))
    playSound(stars >= 2 ? 'win' : 'done')
  }, [done, correctCount, session.length, lesson.id, level, setLessonStars])

  if (done) {
    const ratio = correctCount / session.length
    const stars = computeStars(ratio)
    return (
      <ResultScreen
        ratio={ratio}
        correct={correctCount}
        total={session.length}
        lesson={lesson}
        level={level}
        onReplay={() => {
          const fresh = buildSession(allQuestions, masteryMap)
          setSession(fresh)
          setIndex(0)
          setChoices(buildChoices(fresh[0], info.choices))
          setPicked(null)
          setTypedNum('')
          setTypedDen('')
          setCorrectCount(0)
          setDone(false)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <BackButton to="/fractions" label="Fractions" />

        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${info.className}`}>
            {info.icon} {info.label} · {info.sub}
          </span>
          <span className="text-lg font-bold text-purple-700">Q {index + 1}/{session.length}</span>
          <div className="bg-yellow-100 px-3 py-1 rounded-full font-bold text-yellow-700">⭐ {correctCount}</div>
        </div>

        <div className="h-2 bg-rose-100 rounded-full mb-6 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-rose-400 to-orange-500" animate={{ width: `${((index + (picked !== null ? 1 : 0)) / session.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current.key} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="card-kid mb-4 text-center">
            <div className="text-lg font-bold text-rose-700 mb-4">Quelle fraction est coloriée ?</div>
            <FractionVisual numerator={current.numerator} denominator={current.denominator} type={type} />
            <div className="mt-5">
              {isTypingMode ? (
                <TypingFraction
                  numerator={typedNum}
                  denominator={typedDen}
                  picked={picked}
                  expected={current.label}
                  onNumerator={setTypedNum}
                  onDenominator={setTypedDen}
                  onSubmit={() => typedNum && typedDen && commitAnswer(`${Number(typedNum)}/${Number(typedDen)}`)}
                />
              ) : (
                <Choices choices={choices} picked={picked} expected={current.label} onPick={commitAnswer} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <Mascot
          mood={picked === null ? 'idle' : picked === current.label ? 'happy' : 'sad'}
          message={picked === null ? 'Compte les parts coloriées !' : picked === current.label ? 'Bravo, tu lis les fractions !' : `${getHintFor(current).text}`}
        />
      </div>
    </div>
  )
}

function Choices({ choices, picked, expected, onPick }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {choices.map((choice) => {
        const isAnswer = choice.label === expected
        const isPicked = picked === choice.label
        let style = 'bg-gradient-to-br from-sky-400 to-purple-500 text-white'
        if (picked !== null) {
          if (isAnswer) style = 'bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-105'
          else if (isPicked) style = 'bg-gradient-to-br from-red-400 to-pink-500 text-white'
          else style = 'bg-gray-200 text-gray-500'
        }
        return (
          <motion.button key={choice.label} whileTap={picked === null ? { scale: 0.95 } : {}} onClick={() => onPick(choice.label)} disabled={picked !== null} className={`btn-kid ${style}`}>
            <span className="block text-4xl">{choice.label}</span>
            <span className="block text-sm opacity-90">{fractionLabel(choice.numerator, choice.denominator)}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

function TypingFraction({ numerator, denominator, picked, expected, onNumerator, onDenominator, onSubmit }) {
  const disabled = picked !== null
  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-4">
        <NumberInput value={numerator} onChange={onNumerator} disabled={disabled} label="haut" />
        <span className="text-5xl font-bold text-purple-700">/</span>
        <NumberInput value={denominator} onChange={onDenominator} disabled={disabled} label="bas" />
      </div>
      {picked !== null && picked !== expected && <div className="text-green-700 font-bold mb-2">La bonne réponse était {expected}</div>}
      <button onClick={onSubmit} disabled={disabled || !numerator || !denominator} className="btn-kid bg-gradient-to-r from-rose-500 to-orange-500 text-white disabled:opacity-40">
        Valider
      </button>
    </div>
  )
}

function NumberInput({ value, onChange, disabled, label }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-gray-500 mb-1">{label}</span>
      <input
        value={value}
        disabled={disabled}
        inputMode="numeric"
        maxLength={1}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, '').slice(0, 1))}
        className="w-20 h-20 rounded-2xl border-4 border-rose-300 bg-rose-50 text-center text-5xl font-bold text-rose-700"
      />
    </label>
  )
}

function ResultScreen({ ratio, correct, total, lesson, level, onReplay }) {
  const stars = computeStars(ratio)
  const nextLevel = level + 1
  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-kid max-w-md w-full text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-4">{ratio >= 0.8 ? '🎉 Super partage !' : '💪 Continue !'}</h2>
        <div className="text-6xl mb-4">
          {[1, 2, 3].map((s) => <span key={s} className={s <= stars ? '' : 'opacity-20'}>⭐</span>)}
        </div>
        <p className="text-2xl text-gray-700 mb-6">{correct} / {total} bonnes réponses</p>
        <div className="flex flex-col gap-3">
          <button onClick={onReplay} className="btn-kid bg-gradient-to-r from-green-500 to-emerald-500 text-white">🔄 Recommencer</button>
          {nextLevel <= 3 && ratio >= 0.8 && (
            <Link to={`/fractions/entrainement/${lesson.id}/${nextLevel}`} className="btn-kid bg-gradient-to-r from-orange-400 to-red-500 text-white">
              ⬆️ Passer au {DIFFICULTIES[nextLevel].icon} {DIFFICULTIES[nextLevel].label}
            </Link>
          )}
          <Link to="/fractions" className="btn-kid bg-gradient-to-r from-purple-500 to-pink-500 text-white">🍕 Autres fractions</Link>
        </div>
      </motion.div>
    </div>
  )
}

function buildChoices(question, count) {
  if (count === 0) return []
  const choices = new Map([[question.label, question]])
  let safety = 0
  while (choices.size < count && safety < 80) {
    const denominator = CHOICE_DENOMINATORS[Math.floor(Math.random() * CHOICE_DENOMINATORS.length)]
    const numerator = 1 + Math.floor(Math.random() * denominator)
    const candidate = makeFraction(numerator, denominator)
    choices.set(candidate.label, candidate)
    safety++
  }
  return [...choices.values()].sort(() => Math.random() - 0.5)
}
