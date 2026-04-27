import { Routes, Route } from 'react-router-dom'
import DivisionsHome from './DivisionsHome.jsx'
import DivisionsTraining from './DivisionsTraining.jsx'
import DivisionsDiscovery from './DivisionsDiscovery.jsx'

export default function DivisionsModule() {
  return (
    <Routes>
      <Route path="/" element={<DivisionsHome />} />
      <Route path="decouverte/:lessonId" element={<DivisionsDiscovery />} />
      <Route path="entrainement/:lessonId" element={<DivisionsTraining />} />
      <Route path="entrainement/:lessonId/:level" element={<DivisionsTraining />} />
    </Routes>
  )
}
