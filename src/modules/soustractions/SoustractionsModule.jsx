import { Routes, Route } from 'react-router-dom'
import SoustractionsHome from './SoustractionsHome.jsx'
import SoustractionsTraining from './SoustractionsTraining.jsx'
import SoustractionsDiscovery from './SoustractionsDiscovery.jsx'

export default function SoustractionsModule() {
  return (
    <Routes>
      <Route path="/" element={<SoustractionsHome />} />
      <Route path="decouverte/:lessonId" element={<SoustractionsDiscovery />} />
      <Route path="entrainement/:lessonId" element={<SoustractionsTraining />} />
      <Route path="entrainement/:lessonId/:level" element={<SoustractionsTraining />} />
    </Routes>
  )
}
