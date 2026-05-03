// Composant de quiz générique réutilisable par tous les modules.
// Le module fournit :
//  - allQuestions : toutes les questions possibles pour la leçon en cours
//  - getHint(question) : indice ciblé en cas d'erreur
//  - moduleId, lessonId, moduleHomePath, theme, opSymbol
//  - distractorRange (optionnel)
import { useParams, Link } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../core/ProfileContext.jsx'
import BackButton from './BackButton.jsx'
import Mascot from './Mascot.jsx'
import NumPad from './NumPad.jsx'
import { DIFFICULTIES } from './DifficultyLinks.jsx'
import { playSound } from '../core/sounds.js'
import { buildSession, buildChoices, computeStars } from '../core/quizEngine.js'

const LEVEL_INFO = {
  1: { ...DIFFICULTIES[1], choices: 2, badge: 'bg-green-200 text-green-900' },
  2: { ...DIFFICULTIES[2], choices: 4, badge: 'bg-yellow-200 text-yellow-900' },
  3: { ...DIFFICULTIES[3], sub: 'tape la réponse', choices: 0, badge: 'bg-red-200 text-red-900' },
}

export default function Quiz({
  moduleId,
  lessonId,
  allQuestions,
  getHint,
  moduleHomePath,
  trainingPathPrefix,
  opSymbol,
  distractorRange = 4,
  theme = { from: 'from-orange-500', to: 'to-pink-500' },
}) {
  const { level: levelParam } = useParams()
  const parsedLevel = Number.parseInt(levelParam, 10)
  const level = LEVEL_INFO[parsedLevel] ? parsedLevel : 2
  const info = LEVEL_INFO[level]
  const { profile, recordAnswer, addStars, setLessonStars } = useProfile()

  const masteryMap = profile.progress[moduleId]?.mastery || {}
  const allMemo = useMemo(() => allQuestions, [allQuestions])

  const [session, setSession] = useState(() => buildSession(allMemo, masteryMap))
  const [index, setIndex] = useState(0)
  const [choices, setChoices] = useState(() => buildChoices(session[0], info.choices, distractorRange))
  const [picked, setPicked] = useState(null)
  const [typed, setTyped] = useState('')
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [done, setDone] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const current = session[index]
  const isTypingMode = info.choices === 0

  function next() {
    if (index + 1 >= session.length) {
      setDone(true)
      return
    }
    const nextIdx = index + 1
    setIndex(nextIdx)
    setChoices(buildChoices(session[nextIdx], info.choices, distractorRange))
    setPicked(null)
    setTyped('')
    setShowHint(false)
  }

  function commitAnswer(value) {
    if (picked !== null) return
    const isCorrect = value === current.result
    setPicked(value)
    recordAnswer(moduleId, current.key, isCorrect)
    if (isCorrect) {
      setCorrectCount((c) => c + 1)
      setStreak((s) => s + 1)
      addStars(1)
      playSound('correct')
    } else {
      setStreak(0)
      playSound('wrong')
      setShowHint(true)
    }
    setTimeout(next, isCorrect ? 1100 : 2400)
  }

  useEffect(() => {
    if (!done) return
    const ratio = correctCount / session.length
    const stars = computeStars(ratio)
    const finalStars = Math.min(3, stars + (level === 3 ? 1 : 0))
    if (stars > 0) setLessonStars(moduleId, lessonId, finalStars)
    playSound(stars >= 2 ? 'win' : 'done')
  }, [done])

  if (done) {
    const ratio = correctCount / session.length
    return (
      <ResultScreen
        ratio={ratio}
        correct={correctCount}
        total={session.length}
        level={level}
        moduleHomePath={moduleHomePath}
        nextLevelPath={level < 3 ? `${trainingPathPrefix}/${level + 1}` : null}
        nextLevel={level < 3 ? level + 1 : null}
        onReplay={() => {
          const fresh = buildSession(allMemo, masteryMap)
          setSession(fresh)
          setIndex(0)
          setChoices(buildChoices(fresh[0], info.choices, distractorRange))
          setPicked(null)
          setTyped('')
          setCorrectCount(0)
          setStreak(0)
          setDone(false)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <BackButton to={moduleHomePath} label="Leçons" />

        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${info.badge}`}>
              {info.icon} {info.label} · {info.sub}
            </span>
            <span className="text-lg font-bold text-purple-700">
              Q {index + 1}/{session.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {streak >= 3 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                🔥 {streak}
              </motion.div>
            )}
            <div className="bg-yellow-100 px-3 py-1 rounded-full font-bold text-yellow-700">
              ⭐ {correctCount}
            </div>
          </div>
        </div>

        <div className="h-2 bg-purple-100 rounded-full mb-6 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${theme.from} ${theme.to}`}
            animate={{ width: `${((index + (picked !== null ? 1 : 0)) / session.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="card-kid mb-4"
          >
            <div className="text-center">
              <div className="text-6xl sm:text-7xl font-bold text-purple-700 mb-6">
                {current.a} {opSymbol} {current.b}
              </div>

              {isTypingMode ? (
                <TypingAnswer
                  typed={typed}
                  picked={picked}
                  expected={current.result}
                  onDigit={(d) => picked === null && setTyped((t) => (t.length >= 4 ? t : t + d))}
                  onDelete={() => picked === null && setTyped((t) => t.slice(0, -1))}
                  onSubmit={() => typed !== '' && picked === null && commitAnswer(Number.parseInt(typed, 10))}
                />
              ) : (
                <ChoicesGrid choices={choices} picked={picked} expected={current.result} onPick={commitAnswer} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <Mascot
          mood={picked === null ? 'idle' : picked === current.result ? 'happy' : 'sad'}
          message={mascotMessage(picked, current, opSymbol, isTypingMode)}
        />

        <AnimatePresence>
          {showHint && (() => {
            const hint = getHint(current)
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-300"
              >
                <div className="font-bold text-yellow-800 mb-1">💡 {hint.title}</div>
                <div className="text-sm text-yellow-900">{hint.text}</div>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        <div className="mt-4 flex justify-center gap-2">
          {[1, 2, 3].map((lv) => (
            <Link
              key={lv}
              to={`${trainingPathPrefix}/${lv}`}
              className={`text-sm px-3 py-1.5 rounded-full font-bold transition-opacity ${
                LEVEL_INFO[lv].badge
              } ${lv === level ? '' : 'opacity-50 hover:opacity-100'}`}
            >
              {LEVEL_INFO[lv].icon} {LEVEL_INFO[lv].label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function mascotMessage(picked, current, opSymbol, isTypingMode) {
  if (picked === null) return isTypingMode ? 'Tape ta réponse !' : 'Tu peux le faire !'
  if (picked === current.result) {
    const cheers = ['Bravo !', 'Génial !', 'Trop fort !', 'Excellent !', 'Champion !', 'Wahou !', 'Continue !']
    return cheers[Math.floor(Math.random() * cheers.length)]
  }
  return `Oups ! ${current.a} ${opSymbol} ${current.b} = ${current.result}`
}

function ChoicesGrid({ choices, picked, expected, onPick }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {choices.map((c) => {
        const isPicked = picked === c
        const isAnswer = c === expected
        let style = 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
        if (picked !== null) {
          if (isAnswer) style = 'bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-105'
          else if (isPicked) style = 'bg-gradient-to-br from-red-400 to-pink-500 text-white'
          else style = 'bg-gray-200 text-gray-500'
        }
        return (
          <motion.button
            key={c}
            whileHover={picked === null ? { scale: 1.05 } : {}}
            whileTap={picked === null ? { scale: 0.95 } : {}}
            onClick={() => onPick(c)}
            disabled={picked !== null}
            className={`btn-kid text-3xl sm:text-4xl ${style} transition-all`}
          >
            {c}
          </motion.button>
        )
      })}
    </div>
  )
}

function TypingAnswer({ typed, picked, expected, onDigit, onDelete, onSubmit }) {
  let displayStyle = 'border-purple-300 bg-purple-50 text-purple-700'
  if (picked !== null) {
    displayStyle =
      picked === expected
        ? 'border-green-400 bg-green-50 text-green-700'
        : 'border-red-400 bg-red-50 text-red-700'
  }
  const display = picked !== null ? String(picked) : typed || '?'

  return (
    <div>
      <div
        className={`mx-auto mb-4 w-40 h-20 rounded-2xl border-4 ${displayStyle} flex items-center justify-center text-5xl font-bold transition-colors`}
      >
        {display}
      </div>
      {picked !== null && picked !== expected && (
        <div className="text-green-700 font-bold mb-2">La bonne réponse était {expected}</div>
      )}
      <NumPad onDigit={onDigit} onDelete={onDelete} onSubmit={onSubmit} canSubmit={typed.length > 0 && picked === null} disabled={picked !== null} />
    </div>
  )
}

function ResultScreen({ ratio, correct, total, level, moduleHomePath, nextLevelPath, nextLevel, onReplay }) {
  const stars = computeStars(ratio)
  const NEXT_LEVEL_ICONS = { 2: DIFFICULTIES[2].icon, 3: DIFFICULTIES[3].icon }
  const NEXT_LEVEL_LABELS = { 2: DIFFICULTIES[2].label, 3: DIFFICULTIES[3].label }

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card-kid max-w-md w-full text-center"
      >
        <h2 className="text-4xl font-bold text-purple-700 mb-4">
          {ratio === 1 ? '🎉 Parfait !' : ratio >= 0.8 ? '🌟 Super !' : ratio >= 0.5 ? '👍 Bien joué' : '💪 Continue !'}
        </h2>
        <div className="text-6xl mb-4">
          {[1, 2, 3].map((s) => (
            <motion.span
              key={s}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: s * 0.3, type: 'spring' }}
              className={s <= stars ? '' : 'opacity-20'}
            >
              ⭐
            </motion.span>
          ))}
        </div>
        <p className="text-2xl text-gray-700 mb-6">
          {correct} / {total} bonnes réponses
        </p>
        <div className="flex flex-col gap-3">
          <button onClick={onReplay} className="btn-kid bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            🔄 Recommencer
          </button>
          {nextLevelPath && ratio >= 0.8 && (
            <Link to={nextLevelPath} className="btn-kid bg-gradient-to-r from-orange-400 to-red-500 text-white">
              ⬆️ Passer au {NEXT_LEVEL_ICONS[nextLevel]} {NEXT_LEVEL_LABELS[nextLevel]}
            </Link>
          )}
          <Link to={moduleHomePath} className="btn-kid bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            📚 Autres leçons
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
