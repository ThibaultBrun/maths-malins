import { useParams } from 'react-router-dom'
import Quiz from '../../components/Quiz.jsx'
import { getMultiplicationsForTable, getHintFor } from './tricks.js'

export default function Training() {
  const { table: tableParam, level: levelParam } = useParams()
  const table = Number.parseInt(tableParam, 10)
  const allQuestions = getMultiplicationsForTable(table)

  return (
    <Quiz
      key={`${table}-${levelParam || 2}`}
      moduleId="multiplications"
      lessonId={String(table)}
      allQuestions={allQuestions}
      getHint={(q) => getHintFor(q.a, q.b)}
      moduleHomePath="/multiplications"
      trainingPathPrefix={`/multiplications/entrainement/${table}`}
      opSymbol="×"
      theme={{ from: 'from-orange-400', to: 'to-pink-500' }}
    />
  )
}
