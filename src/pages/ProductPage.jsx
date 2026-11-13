import { Link, useParams } from 'react-router-dom'
import HeartIcon from '../components/HeartIcon'
import { useCart } from '../context/CartContext'
import { products, universes } from '../data/products'

function ProductPage({ favorites, onToggleFavorite }) {
  // Le « :id » de l'adresse /produit/:id. Il arrive toujours sous forme de texte ("3"),
  // alors que les ids de products.js sont des nombres (3) : d'où le Number()
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  // Les hooks s'appellent toujours avant tout `return`, jamais après un if
  const { addToCart, getQuantity } = useCart()

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
  const inCart = getQuantity(product.id)
  const isMaxed = inCart >= product.stock

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
            <button type="button" className="btn-primary" onClick={() => addToCart(product.id)}>
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

          {/* role="status" : les lecteurs d'écran annoncent chaque changement de ce texte.
              Le <p> est toujours présent (même vide), seul son contenu change */}
          <p className="cart-status" role="status">
            {inCart > 0 && `${inCart} dans votre panier`}
            {isMaxed && ' · stock maximum atteint'}
          </p>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
