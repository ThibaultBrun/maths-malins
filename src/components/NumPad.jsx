import { useEffect } from 'react'
import { motion } from 'framer-motion'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok']

export default function NumPad({ onDigit, onDelete, onSubmit, canSubmit, disabled }) {
  // Support clavier physique en bonus
  useEffect(() => {
    function onKey(e) {
      if (disabled) return
      if (e.key >= '0' && e.key <= '9') {
        onDigit(e.key)
      } else if (e.key === 'Backspace') {
        onDelete()
      } else if (e.key === 'Enter') {
        if (canSubmit) onSubmit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDigit, onDelete, onSubmit, canSubmit, disabled])

  function renderKey(k) {
    if (k === 'del') {
      return (
        <motion.button
          key="del"
          whileTap={{ scale: 0.92 }}
          disabled={disabled}
          onClick={onDelete}
          className="py-4 rounded-2xl bg-orange-200 text-orange-700 font-bold text-2xl shadow-md disabled:opacity-50"
        >
          ⌫
        </motion.button>
      )
    }
    if (k === 'ok') {
      return (
        <motion.button
          key="ok"
          whileTap={{ scale: 0.92 }}
          disabled={disabled || !canSubmit}
          onClick={onSubmit}
          className={`py-4 rounded-2xl font-bold text-2xl shadow-md transition-colors ${
            canSubmit && !disabled
              ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          ✓ OK
        </motion.button>
      )
    }
    return (
      <motion.button
        key={k}
        whileTap={{ scale: 0.92 }}
        disabled={disabled}
        onClick={() => onDigit(k)}
        className="py-4 rounded-2xl bg-white text-purple-700 font-bold text-2xl shadow-md disabled:opacity-50 border-2 border-purple-100"
      >
        {k}
      </motion.button>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
      {KEYS.map(renderKey)}
    </div>
  )
}
