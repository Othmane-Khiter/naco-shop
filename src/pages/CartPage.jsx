import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { products, universes } from '../data/products'

function CartPage() {
  const { items, cartCount, setQuantity, removeFromCart } = useCart()
  // Le titre de la page : on y replace le focus quand une ligne est supprimée
  const titleRef = useRef(null)

  // Le panier ne contient que des ids : on y joint le produit complet pour l'affichage
  const lines = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId),
  }))

  // Total : somme de (prix × quantité) de chaque ligne
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  function handleRemove(productId) {
    removeFromCart(productId)
    // Le bouton cliqué va disparaître avec sa ligne : sans ça, le focus clavier serait perdu
    titleRef.current.focus()
  }

  return (
    <main className="cart-page">
      <title>Panier · NACO Shop</title>

      {/* tabIndex={-1} : le titre peut recevoir le focus par le code, sans entrer dans l'ordre de Tab */}
      <h1 className="product-name" ref={titleRef} tabIndex={-1}>
        Votre panier
      </h1>

      {lines.length === 0 ? (
        <div className="cart-empty">
          <p>Votre panier est vide.</p>
          <Link to="/" className="btn-primary">
            Découvrir le catalogue
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-list">
            {lines.map(({ product, quantity }) => {
              const universe = universes.find((u) => u.id === product.universe)
              const isMin = quantity <= 1
              const isMax = quantity >= product.stock

              return (
                <li key={product.id} className="cart-item">
                  <div className="thumb cart-thumb">
                    <span aria-hidden="true">{product.emoji}</span>
                  </div>

                  <div>
                    <Link to={`/produit/${product.id}`} className="cart-item-name">
                      {product.name}
                    </Link>
                    <span className="universe">
                      <i className="dot" style={{ background: universe.color }} />
                      {universe.name}
                    </span>
                    <span className="cart-unit-price">{product.price.toFixed(2)} € l’unité</span>
                  </div>

                  <span className="price cart-line-total">
                    {(product.price * quantity).toFixed(2)} €
                  </span>

                  <div className="cart-item-actions">
                    {/* role="group" + aria-label : les deux boutons et le chiffre forment un tout */}
                    <div className="qty" role="group" aria-label={`Quantité : ${product.name}`}>
                      {/* aria-disabled plutôt que disabled : le bouton garde le focus,
                          il est annoncé « indisponible », et setQuantity ne dépasse pas les limites */}
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-disabled={isMin}
                        aria-label="Retirer un exemplaire"
                      >
                        −
                      </button>
                      {/* aria-live : le nouveau chiffre est lu après chaque clic */}
                      <span className="qty-value" aria-live="polite">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-disabled={isMax}
                        aria-label="Ajouter un exemplaire"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemove(product.id)}
                      aria-label={`Retirer du panier : ${product.name}`}
                    >
                      Retirer
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <aside className="cart-summary" aria-labelledby="summary-title">
            <h2 id="summary-title" className="cart-summary-title">
              Récapitulatif
            </h2>
            <p className="cart-summary-row">
              <span>
                {cartCount} {cartCount > 1 ? 'articles' : 'article'}
              </span>
              <span className="price">{total.toFixed(2)} €</span>
            </p>
            {/* Boutique fictive : pas de paiement, bouton visuel seul */}
            <button type="button" className="btn-primary cart-checkout">
              Passer commande
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}

export default CartPage
