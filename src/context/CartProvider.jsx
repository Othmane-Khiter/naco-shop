import { useState } from 'react'
import { CartContext } from './CartContext'
import { products } from '../data/products'

// Composant qui détient l'état du panier et le met à disposition de tous ses enfants
function CartProvider({ children }) {
  // Lignes du panier : [{ productId: 3, quantity: 2 }, …]
  // On ne stocke que l'id : le nom, le prix… restent lus dans products.js (une seule source)
  const [items, setItems] = useState([])

  // Quantité d'un produit dans le panier (0 s'il n'y est pas)
  function getQuantity(productId) {
    const item = items.find((i) => i.productId === productId)
    return item ? item.quantity : 0
  }

  // Ajoute 1 exemplaire, sans dépasser le stock disponible
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId)

    setItems((current) => {
      const existing = current.find((i) => i.productId === productId)

      // Pas encore dans le panier : nouvelle ligne
      if (!existing) return [...current, { productId, quantity: 1 }]

      // Déjà tout le stock : on ne change rien
      if (existing.quantity >= product.stock) return current

      // Sinon : nouvelle ligne avec quantité + 1 (on recrée l'objet, on ne le modifie pas)
      return current.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
      )
    })
  }

  // Nombre total d'articles (2 Pokéballs + 1 Keyblade = 3) : calculé, pas stocké
  const cartCount = items.reduce((total, i) => total + i.quantity, 0)

  // React 19 : on peut écrire <CartContext value={…}> au lieu de <CartContext.Provider value={…}>
  return (
    <CartContext value={{ items, cartCount, getQuantity, addToCart }}>
      {children}
    </CartContext>
  )
}

export default CartProvider
