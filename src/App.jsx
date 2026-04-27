import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MultiplicationModule from './modules/multiplication/MultiplicationModule.jsx'
import AdditionsModule from './modules/additions/AdditionsModule.jsx'
import SoustractionsModule from './modules/soustractions/SoustractionsModule.jsx'
import DivisionsModule from './modules/divisions/DivisionsModule.jsx'
import { ProfileProvider } from './core/ProfileContext.jsx'

export default function App() {
  return (
    <ProfileProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multiplications/*" element={<MultiplicationModule />} />
        <Route path="/additions/*" element={<AdditionsModule />} />
        <Route path="/soustractions/*" element={<SoustractionsModule />} />
        <Route path="/divisions/*" element={<DivisionsModule />} />
      </Routes>
    </ProfileProvider>
  )
}
