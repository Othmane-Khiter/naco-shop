import { Link } from 'react-router-dom'

function ProductCard({ product, universe, isFavorite, onToggleFavorite }) {
  return (
    <article className="card">
      {/* Le bouton est à côté du lien (et non dedans) : un bouton dans un lien est du HTML invalide */}
      <button
        type="button"
        className={isFavorite ? 'favorite-btn is-active' : 'favorite-btn'}
        onClick={onToggleFavorite}
        aria-pressed={isFavorite}
        aria-label={`${isFavorite ? 'Retirer des' : 'Ajouter aux'} favoris : ${product.name}`}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2 0 3.7 1.1 5.4 3 1.7-1.9 3.4-3 5.4-3 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z" />
        </svg>
      </button>

      <Link to={`/produit/${product.id}`} className="card-link">
        <div className="thumb">
          <span aria-hidden="true">{product.emoji}</span>
          {product.stock <= 5 && <span className="tag">Stock limité</span>}
        </div>

        <span className="name">{product.name}</span>

        <span className="universe">
          <i className="dot" style={{ background: universe.color }} />
          {universe.name}
        </span>

        <span className="price">{product.price.toFixed(2)} €</span>
      </Link>
    </article>
  )
}

export default ProductCard