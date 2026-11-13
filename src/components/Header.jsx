import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Header({ theme, onToggleTheme }) {
  // Le nombre d'articles vient directement du contexte, plus besoin de prop
  const { cartCount } = useCart()

  return (
    <header className="header">
      <Link to="/" className="logo">NACO Shop</Link>

      <div className="header-actions">
        <button
          type="button"
          className="icon-button"
          onClick={onToggleTheme}
          aria-pressed={theme === 'dark'}
          aria-label="Mode sombre"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Un lien (et non un bouton) car il peut changer de page : il ramène au catalogue
            et lui transmet, via `state`, la demande de placer le curseur dans la recherche */}
        <Link to="/" state={{ focusSearch: true }} className="header-link">
          <span className="header-icon" aria-hidden="true">🔍</span>
          <span className="header-label">Rechercher</span>
        </Link>

        <Link to="/panier" className="header-link">
          <span className="header-icon">
            <span aria-hidden="true">🛒</span>
            {cartCount > 0 && (
              <span className="badge">
                {cartCount}
                <span className="visually-hidden"> {cartCount > 1 ? 'articles' : 'article'}</span>
              </span>
            )}
          </span>
          <span className="header-label">Panier</span>
        </Link>
      </div>
    </header>
  )
}

export default Header