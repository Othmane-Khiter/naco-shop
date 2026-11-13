import { Link, useParams } from 'react-router-dom'
import HeartIcon from '../components/HeartIcon'
import { products, universes } from '../data/products'

function ProductPage({ favorites, onToggleFavorite }) {
  // Le « :id » de l'adresse /produit/:id. Il arrive toujours sous forme de texte ("3"),
  // alors que les ids de products.js sont des nombres (3) : d'où le Number()
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  // Adresse tapée à la main avec un id qui n'existe pas (ex. /produit/99)
  if (!product) {
    return (
      <main className="product-page">
        <title>Objet introuvable · NACO Shop</title>
        <h1 className="product-name">Objet introuvable</h1>
        <p className="product-description">Cet objet n’existe pas ou n’est plus en vente.</p>
        <Link to="/" className="back-link">
          <span aria-hidden="true">← </span>Retour au catalogue
        </Link>
      </main>
    )
  }

  const universe = universes.find((u) => u.id === product.universe)
  const isFavorite = favorites.includes(product.id)

  return (
    <main className="product-page">
      {/* React 19 place automatiquement ce <title> dans le <head> : c'est le titre de l'onglet */}
      <title>{`${product.name} · NACO Shop`}</title>

      <Link to="/" className="back-link">
        <span aria-hidden="true">← </span>Retour au catalogue
      </Link>

      <div className="product-layout">
        <div className="thumb product-thumb">
          <span aria-hidden="true">{product.emoji}</span>
        </div>

        <div>
          <p className="universe">
            <i className="dot" style={{ background: universe.color }} />
            {universe.name}
          </p>

          <h1 className="product-name">{product.name}</h1>

          <p className="price product-price">{product.price.toFixed(2)} €</p>

          <p className="product-stock">
            {product.stock <= 5 ? `Plus que ${product.stock} en stock` : 'En stock'}
          </p>

          <p className="product-description">{product.description}</p>

          <div className="product-actions">
            {/* Pas encore d'action : il sera branché à l'étape du panier */}
            <button type="button" className="btn-primary">
              Ajouter au panier
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => onToggleFavorite(product.id)}
              aria-pressed={isFavorite}
            >
              <HeartIcon />
              Favori
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
