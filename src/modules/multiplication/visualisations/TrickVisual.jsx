import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DotGrid from './DotGrid.jsx'

// Visualisation contextuelle selon le type d'astuce.
export default function TrickVisual({ table, trick }) {
  switch (trick.type) {
    case 'minus10':
      return <Minus10Viz table={table} />
    case 'minus1':
      return <Minus1Viz table={table} />
    case 'half10':
      return <Half10Viz />
    case 'double':
    case 'triple':
    case 'doubledouble':
    case 'doubletriple':
      return <DoubleViz table={table} type={trick.type} />
    case 'plus5':
      return <Plus5Viz table={table} />
    case 'fingers':
      return <FingersViz />
    case 'sum9':
      return <Sum9Viz />
    case 'finishes05':
      return <Finishes05Viz />
    case 'add0':
      return <Add0Viz />
    default:
      return null
  }
}

// === 8×9 = 8×10 − 8×1 (le cas du fils !) ===
function Minus10Viz({ table }) {
  const [n, setN] = useState(9)
  const result = table * n
  const tenTimes = table * 10
  const diff = table * (10 - n)

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2 flex-wrap">
        {[6, 7, 8, 9].map((v) => (
          <button
            key={v}
            onClick={() => setN(v)}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              n === v
                ? 'bg-purple-500 text-white scale-110'
                : 'bg-purple-100 text-purple-700'
            }`}
          >
            {table}×{v}
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4">
        <p className="text-sm text-gray-600 mb-2 text-center">
          On commence avec <strong>{table}×10 = {tenTimes}</strong>...
        </p>
        <div className="flex justify-center mb-2">
          <DotGrid rows={table} cols={10} removeCols={10 - n} animate color="bg-blue-400" />
        </div>
        <p className="text-sm text-gray-600 text-center">
          ...puis on enlève <strong>{10 - n} colonne{10 - n > 1 ? 's' : ''} de {table}</strong> (les rouges) = <strong>{diff}</strong>
        </p>
        <div className="mt-3 text-center">
          <span className="inline-block bg-yellow-200 px-4 py-2 rounded-xl text-xl font-bold text-yellow-800">
            {tenTimes} − {diff} = {result}
          </span>
        </div>
      </div>
    </div>
  )
}

// === 9×n = 10×n − n ===
function Minus1Viz({ table }) {
  const [n, setN] = useState(7)
  const result = table * n
  const tenTimes = 10 * n

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2 flex-wrap">
        {[4, 5, 6, 7, 8].map((v) => (
          <button
            key={v}
            onClick={() => setN(v)}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              n === v
                ? 'bg-purple-500 text-white scale-110'
                : 'bg-purple-100 text-purple-700'
            }`}
          >
            9×{v}
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4">
        <p className="text-sm text-gray-600 mb-2 text-center">
          <strong>10×{n} = {tenTimes}</strong>, puis on enlève <strong>{n}</strong>
        </p>
        <div className="flex justify-center mb-2">
          <DotGrid rows={10} cols={n} removeCols={0} animate color="bg-blue-400" />
        </div>
        <div className="text-center text-2xl my-1">⬇️ on enlève une rangée</div>
        <div className="flex justify-center mb-2">
          <DotGrid rows={9} cols={n} animate color="bg-green-400" />
        </div>
        <div className="mt-3 text-center">
          <span className="inline-block bg-yellow-200 px-4 py-2 rounded-xl text-xl font-bold text-yellow-800">
            {tenTimes} − {n} = {result}
          </span>
        </div>
      </div>
    </div>
  )
}

function Half10Viz() {
  const [n, setN] = useState(8)
  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2 flex-wrap">
        {[4, 6, 8, 10].map((v) => (
          <button
            key={v}
            onClick={() => setN(v)}
            className={`px-4 py-2 rounded-xl font-bold ${
              n === v ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
            }`}
          >
            5×{v}
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 text-center">
        <p className="text-lg">10 × {n} = <strong>{10 * n}</strong></p>
        <p className="text-3xl my-2">➗ 2</p>
        <p className="text-2xl font-bold text-orange-600">5 × {n} = {5 * n}</p>
      </div>
    </div>
  )
}

function DoubleViz({ table, type }) {
  const [n, setN] = useState(6)
  let steps = []
  if (type === 'double') {
    steps = [n, n * 2]
  } else if (type === 'triple') {
    steps = [n, n * 2, n * 3]
  } else if (type === 'doubledouble') {
    steps = [n, n * 2, n * 4]
  } else if (type === 'doubletriple') {
    steps = [n, n * 2, n * 4, n * 8]
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2 flex-wrap">
        {[3, 5, 7, 9].map((v) => (
          <button
            key={v}
            onClick={() => setN(v)}
            className={`px-4 py-2 rounded-xl font-bold ${
              n === v ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
            }`}
          >
            {table}×{v}
          </button>
        ))}
      </div>
      <div className="bg-green-50 rounded-2xl p-4 flex items-center justify-center gap-2 flex-wrap">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.3 }}
              className="bg-green-200 px-4 py-2 rounded-xl text-xl font-bold text-green-800"
            >
              {s}
            </motion.div>
            {i < steps.length - 1 && <span className="text-2xl">→</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Plus5Viz({ table }) {
  const [n, setN] = useState(7)
  const five = 5 * n
  const extra = (table - 5) * n
  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2 flex-wrap">
        {[4, 6, 7, 8].map((v) => (
          <button
            key={v}
            onClick={() => setN(v)}
            className={`px-4 py-2 rounded-xl font-bold ${
              n === v ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
            }`}
          >
            {table}×{v}
          </button>
        ))}
      </div>
      <div className="bg-pink-50 rounded-2xl p-4 text-center">
        <p className="text-lg">5×{n} = <strong>{five}</strong></p>
        <p className="text-lg">+ {table - 5}×{n} = <strong>{extra}</strong></p>
        <p className="text-2xl font-bold text-pink-600 mt-2">= {five + extra}</p>
      </div>
    </div>
  )
}

function FingersViz() {
  const [n, setN] = useState(4)
  const fingers = Array.from({ length: 10 }, (_, i) => i + 1)
  const left = n - 1
  const right = 10 - n
  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-1 flex-wrap">
        {[2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
          <button
            key={v}
            onClick={() => setN(v)}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm ${
              n === v ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
            }`}
          >
            9×{v}
          </button>
        ))}
      </div>
      <div className="bg-blue-50 rounded-2xl p-4">
        <div className="flex justify-center gap-1 mb-3">
          {fingers.map((f) => {
            const folded = f === n
            return (
              <div
                key={f}
                className={`w-6 h-12 rounded-t-full transition-all ${
                  folded ? 'bg-red-300 h-3 mt-9' : f <= left + 1 && f < n ? 'bg-blue-400' : 'bg-green-400'
                }`}
              />
            )
          })}
        </div>
        <p className="text-center text-sm">
          🔵 {left} doigt{left > 1 ? 's' : ''} à gauche = {left} dizaines
        </p>
        <p className="text-center text-sm">
          🟢 {right} doigt{right > 1 ? 's' : ''} à droite = {right} unités
        </p>
        <p className="text-center text-2xl font-bold text-blue-600 mt-2">
          9 × {n} = {left * 10 + right}
        </p>
      </div>
    </div>
  )
}

function Sum9Viz() {
  return (
    <div className="bg-purple-50 rounded-2xl p-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
      {Array.from({ length: 9 }, (_, i) => {
        const n = i + 2
        const r = 9 * n
        const tens = Math.floor(r / 10)
        const units = r % 10
        return (
          <div key={n} className="bg-white rounded-xl p-2 text-center text-sm">
            <div className="font-bold">9×{n}={r}</div>
            <div className="text-purple-600 text-xs">
              {tens}+{units}=<strong>9</strong>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Finishes05Viz() {
  return (
    <div className="bg-yellow-50 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
      {Array.from({ length: 10 }, (_, i) => {
        const n = i + 1
        const r = 5 * n
        const last = r % 10
        return (
          <div key={n} className="bg-white rounded-xl p-2 text-center">
            <div className="text-sm">5×{n}</div>
            <div className="font-bold text-orange-600">
              ={String(r).slice(0, -1)}
              <span className="text-2xl text-red-500">{last}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Add0Viz() {
  const [n, setN] = useState(7)
  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2 flex-wrap">
        {[3, 5, 7, 9].map((v) => (
          <button
            key={v}
            onClick={() => setN(v)}
            className={`px-4 py-2 rounded-xl font-bold ${
              n === v ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
            }`}
          >
            10×{v}
          </button>
        ))}
      </div>
      <div className="bg-blue-50 rounded-2xl p-4 text-center text-3xl font-bold">
        <span className="text-blue-600">{n}</span>
        <motion.span
          key={n}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="inline-block text-red-500"
        >
          0
        </motion.span>
        <span className="text-gray-400 text-xl ml-3">= {n * 10}</span>
      </div>
    </div>
  )
}
