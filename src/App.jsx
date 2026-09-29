import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CatalogPage from './pages/CatalogPage'

function App() {
  return (
    <BrowserRouter>
      <Header cartCount={0} />

      <Routes>
        <Route path="/" element={<CatalogPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
