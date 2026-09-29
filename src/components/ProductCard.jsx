import { Link } from 'react-router-dom'

function ProductCard({ product, universe }) {
  return (
    <article className="card">
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