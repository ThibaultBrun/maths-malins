import { Navigate, useParams } from 'react-router-dom'
import Quiz from '../../components/Quiz.jsx'
import { getHintFor, getMultiplicationsForTables } from './tricks.js'

const ALLOWED_TABLES = new Set([2, 3, 4, 5, 6, 7, 8, 9, 10])

export default function MixedTablesTraining() {
  const { tables: tablesParam, level: levelParam } = useParams()
  const tables = parseTables(tablesParam)

  if (tables.length === 0) return <Navigate to="/multiplications/tables" replace />

  return (
    <Quiz
      key={`${tables.join('-')}-${levelParam || 2}`}
      moduleId="multiplications"
      lessonId={`tables-${tables.join('-')}`}
      allQuestions={getMultiplicationsForTables(tables)}
      getHint={(q) => getHintFor(q.a, q.b)}
      moduleHomePath="/multiplications/tables"
      trainingPathPrefix={`/multiplications/tables/${tables.join('-')}`}
      opSymbol="×"
      theme={{ from: 'from-orange-400', to: 'to-pink-500' }}
    />
  )
}

function parseTables(value = '') {
  const unique = new Set()
  value.split('-').forEach((item) => {
    const table = Number.parseInt(item, 10)
    if (ALLOWED_TABLES.has(table)) unique.add(table)
  })
  return [...unique].sort((a, b) => a - b)
}
