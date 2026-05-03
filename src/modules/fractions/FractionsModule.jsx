import { Routes, Route } from 'react-router-dom'
import FractionsHome from './FractionsHome.jsx'
import FractionsDiscovery from './FractionsDiscovery.jsx'
import FractionsTraining from './FractionsTraining.jsx'

export default function FractionsModule() {
  return (
    <Routes>
      <Route path="/" element={<FractionsHome />} />
      <Route path="decouverte/:lessonId" element={<FractionsDiscovery />} />
      <Route path="entrainement/:lessonId" element={<FractionsTraining />} />
      <Route path="entrainement/:lessonId/:level" element={<FractionsTraining />} />
    </Routes>
  )
}
