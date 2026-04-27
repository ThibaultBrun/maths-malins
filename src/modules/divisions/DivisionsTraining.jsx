import { useParams, Navigate } from 'react-router-dom'
import Quiz from '../../components/Quiz.jsx'
import { getLesson, getHintFor } from './divisionsData.js'

export default function DivisionsTraining() {
  const { lessonId } = useParams()
  const lesson = getLesson(lessonId)
  if (!lesson) return <Navigate to="/divisions" replace />

  const allQuestions = lesson.generate()

  return (
    <Quiz
      moduleId="divisions"
      lessonId={lesson.id}
      allQuestions={allQuestions}
      getHint={getHintFor}
      moduleHomePath="/divisions"
      trainingPathPrefix={`/divisions/entrainement/${lesson.id}`}
      opSymbol="÷"
      distractorRange={3}
      theme={{ from: 'from-purple-400', to: 'to-indigo-500' }}
    />
  )
}
