import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import PortfolioItem from './pages/PortfolioItem'
import { useGlobalClickSound } from './hooks/useGlobalClickSound'
import './App.css'

function App() {
  useGlobalClickSound()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:id" element={<PortfolioItem />} />
    </Routes>
  )
}

export default App
