import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BackButton from '../../components/BackButton.jsx'
import DifficultyLinks from '../../components/DifficultyLinks.jsx'

const TABLES = [2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function TableSelection() {
  const [selected, setSelected] = useState([2, 3, 4, 5])
  const selectedPath = useMemo(() => selected.join('-'), [selected])

  function toggle(table) {
    setSelected((current) => {
      if (current.includes(table)) return current.filter((item) => item !== table)
      return [...current, table].sort((a, b) => a - b)
    })
  }

  function selectAll() {
    setSelected(TABLES)
  }

  function clear() {
    setSelected([])
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <BackButton to="/multiplications" label="Tables" />

        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 mb-2">Tables à travailler</h1>
          <p className="text-lg text-orange-500">Choisis une ou plusieurs tables, puis lance 10 opérations.</p>
        </motion.div>

        <div className="card-kid mb-5">
          <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
            <h2 className="text-2xl font-bold text-gray-700">Tes tables</h2>
            <div className="flex gap-2">
              <button onClick={selectAll} className="px-3 py-2 rounded-lg bg-orange-100 text-orange-800 font-bold text-sm">
                Toutes
              </button>
              <button onClick={clear} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-bold text-sm">
                Effacer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-5">
            {TABLES.map((table) => {
              const active = selected.includes(table)
              return (
                <button
                  key={table}
                  onClick={() => toggle(table)}
                  className={`aspect-square rounded-2xl border-4 font-bold text-3xl transition-all ${
                    active
                      ? 'bg-orange-500 border-orange-600 text-white shadow-lg scale-105'
                      : 'bg-orange-50 border-orange-100 text-orange-700 hover:border-orange-300'
                  }`}
                >
                  ×{table}
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl bg-orange-50 border-2 border-orange-100 p-4">
            <div className="font-bold text-orange-800 mb-3">
              {selected.length === 0
                ? 'Sélectionne au moins une table'
                : `${selected.length} table${selected.length > 1 ? 's' : ''} sélectionnée${selected.length > 1 ? 's' : ''}`}
            </div>
            {selected.length > 0 ? (
              <DifficultyLinks getPath={(level) => `/multiplications/tables/${selectedPath}/${level}`} />
            ) : (
              <div className="grid grid-cols-3 gap-2 opacity-40 pointer-events-none">
                <span className="rounded-lg bg-green-200 px-2 py-3 text-center font-bold">Facile</span>
                <span className="rounded-lg bg-yellow-200 px-2 py-3 text-center font-bold">Moyen</span>
                <span className="rounded-lg bg-red-200 px-2 py-3 text-center font-bold">Difficile</span>
              </div>
            )}
          </div>
        </div>

        <Link to="/multiplications/defi" className="block text-center text-red-600 font-bold">
          Mode défi chrono
        </Link>
      </div>
    </div>
  )
}
