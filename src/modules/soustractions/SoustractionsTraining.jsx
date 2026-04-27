import { useParams, Navigate } from 'react-router-dom'
import Quiz from '../../components/Quiz.jsx'
import { getLesson, getHintFor } from './soustractionsData.js'

export default function SoustractionsTraining() {
  const { lessonId } = useParams()
  const lesson = getLesson(lessonId)
  if (!lesson) return <Navigate to="/soustractions" replace />

  const allQuestions = lesson.generate()

  return (
    <Quiz
      moduleId="soustractions"
      lessonId={lesson.id}
      allQuestions={allQuestions}
      getHint={getHintFor}
      moduleHomePath="/soustractions"
      trainingPathPrefix={`/soustractions/entrainement/${lesson.id}`}
      opSymbol="−"
      distractorRange={Math.max(3, Math.floor(allQuestions[0].result / 10) || 3)}
      theme={{ from: 'from-yellow-400', to: 'to-orange-500' }}
    />
  )
}
