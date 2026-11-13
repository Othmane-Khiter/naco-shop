import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CartProvider from './context/CartProvider'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'

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

  // Ids des produits mis en favori (ex. [2, 5]).
  // Ici, dans App, ils restent en mémoire quand on passe du catalogue à une fiche produit
  const [favorites, setFavorites] = useState([])

  // Ajoute l'id s'il n'y est pas, le retire sinon
  function toggleFavorite(productId) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    )
  }

  return (
    // Tout ce qui est à l'intérieur de <CartProvider> peut lire le panier avec useCart()
    <CartProvider>
      <BrowserRouter>
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <Routes>
          <Route
            path="/"
            element={<CatalogPage favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/produit/:id"
            element={<ProductPage favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
