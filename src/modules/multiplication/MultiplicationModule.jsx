import { Routes, Route } from 'react-router-dom'
import MultHome from './MultHome.jsx'
import Discovery from './Discovery.jsx'
import Training from './Training.jsx'
import Challenge from './Challenge.jsx'
import TableSelection from './TableSelection.jsx'
import MixedTablesTraining from './MixedTablesTraining.jsx'

export default function MultiplicationModule() {
  return (
    <Routes>
      <Route path="/" element={<MultHome />} />
      <Route path="decouverte/:table" element={<Discovery />} />
      <Route path="entrainement/:table" element={<Training />} />
      <Route path="entrainement/:table/:level" element={<Training />} />
      <Route path="tables" element={<TableSelection />} />
      <Route path="tables/:tables/:level" element={<MixedTablesTraining />} />
      <Route path="defi" element={<Challenge />} />
    </Routes>
  )
}
