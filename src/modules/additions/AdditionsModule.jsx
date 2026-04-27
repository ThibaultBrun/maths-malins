import { Routes, Route } from 'react-router-dom'
import AdditionsHome from './AdditionsHome.jsx'
import AdditionsTraining from './AdditionsTraining.jsx'
import AdditionsDiscovery from './AdditionsDiscovery.jsx'

export default function AdditionsModule() {
  return (
    <Routes>
      <Route path="/" element={<AdditionsHome />} />
      <Route path="decouverte/:lessonId" element={<AdditionsDiscovery />} />
      <Route path="entrainement/:lessonId" element={<AdditionsTraining />} />
      <Route path="entrainement/:lessonId/:level" element={<AdditionsTraining />} />
    </Routes>
  )
}
