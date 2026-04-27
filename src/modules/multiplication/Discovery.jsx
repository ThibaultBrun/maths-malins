import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '../../core/ProfileContext.jsx'
import BackButton from '../../components/BackButton.jsx'
import { TRICKS, getMultiplicationsForTable } from './tricks.js'
import DotGrid from './visualisations/DotGrid.jsx'
import TrickVisual from './visualisations/TrickVisual.jsx'

export default function Discovery() {
  const { table: tableParam } = useParams()
  const table = parseInt(tableParam, 10)
  const navigate = useNavigate()
  const { markDiscoverySeen } = useProfile()
  const [step, setStep] = useState(0)

  const tricks = TRICKS[table] || []
  const mults = getMultiplicationsForTable(table)

  // Étapes : 0 = intro grille, 1..N = astuces, N+1 = table complète
  const totalSteps = 2 + tricks.length

  useEffect(() => {
    if (step === totalSteps - 1) {
      markDiscoverySeen('multiplications', String(table))
    }
  }, [step, totalSteps, table, markDiscoverySeen])

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <BackButton to="/multiplications" label="Tables" />

        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-blue-600">
            🔍 Découvre la table de {table}
          </h1>
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? 'w-8 bg-blue-500' : 'w-2 bg-blue-200'
                }`}
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
            {step === 0 && <IntroStep table={table} />}
            {step > 0 && step <= tricks.length && (
              <TrickStep table={table} trick={tricks[step - 1]} />
            )}
            {step === totalSteps - 1 && <TableStep table={table} mults={mults} />}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 justify-between">
          <button
            onClick={prev}
            disabled={step === 0}
            className="btn-kid bg-gray-300 text-gray-700 disabled:opacity-30"
          >
            ← Précédent
          </button>
          {step < totalSteps - 1 ? (
            <button
              onClick={next}
              className="btn-kid bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              Suivant →
            </button>
          ) : (
            <Link
              to={`/multiplications/entrainement/${table}`}
              className="btn-kid bg-gradient-to-r from-green-500 to-emerald-500 text-white"
            >
              💪 S'entraîner !
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function IntroStep({ table }) {
  const example = Math.min(table === 1 ? 3 : table, 5)
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-purple-700 mb-3">
        Que veut dire « {table} fois » ?
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        Multiplier {table} par {example}, c'est compter <strong>{example} paquets de {table}</strong> 🎁
      </p>
      <div className="flex justify-center mb-4">
        <DotGrid rows={example} cols={table} animate />
      </div>
      <div className="bg-yellow-100 rounded-2xl p-4 inline-block">
        <p className="text-2xl font-bold text-yellow-800">
          {table} × {example} = {table * example}
        </p>
      </div>
    </div>
  )
}

function TrickStep({ table, trick }) {
  return (
    <div className="text-center">
      <div className="inline-block bg-yellow-100 px-4 py-1 rounded-full text-yellow-700 font-bold text-sm mb-3">
        💡 ASTUCE
      </div>
      <h2 className="text-3xl font-bold text-purple-700 mb-3">{trick.title}</h2>
      <p className="text-lg text-gray-700 mb-4 max-w-xl mx-auto">{trick.text}</p>
      <TrickVisual table={table} trick={trick} />
    </div>
  )
}

function TableStep({ table, mults }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">
        📋 La table complète
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
        {mults.map((m, i) => (
          <motion.div
            key={m.key}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.06 }}
            className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-3 flex items-center justify-between shadow-sm"
          >
            <span className="text-xl font-bold text-purple-700">
              {m.a} × {m.b}
            </span>
            <span className="text-2xl font-bold text-pink-600">= {m.result}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
