import { useParams, Navigate } from 'react-router-dom'
import Quiz from '../../components/Quiz.jsx'
import { getLesson, getHintFor } from './additionsData.js'

export default function AdditionsTraining() {
  const { lessonId, level: levelParam } = useParams()
  const lesson = getLesson(lessonId)
  if (!lesson) return <Navigate to="/additions" replace />

  const allQuestions = lesson.generate()

  return (
    <Quiz
      key={`${lesson.id}-${levelParam || 2}`}
      moduleId="additions"
      lessonId={lesson.id}
      allQuestions={allQuestions}
      getHint={getHintFor}
      moduleHomePath="/additions"
      trainingPathPrefix={`/additions/entrainement/${lesson.id}`}
      opSymbol="+"
      distractorRange={Math.max(3, Math.floor(allQuestions[0].result / 10))}
      theme={{ from: 'from-green-400', to: 'to-emerald-500' }}
    />
  )
}
