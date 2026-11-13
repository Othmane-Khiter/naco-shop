import { createContext, useContext } from 'react'

// Le « canal » qui transporte le panier jusqu'aux composants qui en ont besoin.
// La valeur réelle est fournie par <CartProvider> (voir CartProvider.jsx).
export const CartContext = createContext(null)

// Raccourci pour lire le panier depuis n'importe quel composant : const { cartCount } = useCart()
export function useCart() {
  const cart = useContext(CartContext)
  if (cart === null) {
    throw new Error('useCart() doit être utilisé dans un composant placé à l’intérieur de <CartProvider>')
  }
  return cart
}
