import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

function ProductCard({ product, universe, isFavorite, onToggleFavorite }) {
  return (
    <article className="card">
      {/* Le bouton est à côté du lien (et non dedans) : un bouton dans un lien est du HTML invalide */}
      <button
        type="button"
        className="favorite-btn"
        onClick={onToggleFavorite}
        aria-pressed={isFavorite}
        aria-label={`${isFavorite ? 'Retirer des' : 'Ajouter aux'} favoris : ${product.name}`}
      >
        <HeartIcon />
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