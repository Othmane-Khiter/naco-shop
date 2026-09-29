import { Link } from 'react-router-dom'

function Header({ cartCount = 0 }) {
  return (
    <header className="header">
      <Link to="/" className="logo">NACO Shop</Link>

      <div className="header-actions">
        <button type="button" aria-label="Rechercher" className="icon-button">
          🔍
        </button>

        <Link to="/panier" aria-label="Ouvrir le panier" className="icon-button">
          🛒
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
      </div>
    </header>
  )
}

export default Header