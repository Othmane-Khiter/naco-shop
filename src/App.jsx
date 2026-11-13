import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CatalogPage from './pages/CatalogPage'

// Thème de départ : le choix déjà enregistré, sinon la préférence du système
function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  // À chaque changement : on l'écrit sur <html data-theme="..."> (le CSS en dépend)
  // et on le mémorise pour la prochaine visite
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <BrowserRouter>
      <Header cartCount={0} theme={theme} onToggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<CatalogPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
