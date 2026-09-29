import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import UniverseSidebar from '../components/UniverseSidebar'
import { products, universes } from '../data/products'

function CatalogPage() {
  // Univers choisi : 'all' pour « Tous », sinon l'id d'un univers ('pkm', 'mrv'…)
  const [selectedUniverse, setSelectedUniverse] = useState('all')
  // Texte tapé dans le champ de recherche
  const [search, setSearch] = useState('')
  // Ordre de tri choisi dans le menu déroulant
  const [sortOrder, setSortOrder] = useState('price-asc')

  // 1. Filtre par univers
  const universeProducts =
    selectedUniverse === 'all'
      ? products
      : products.filter((product) => product.universe === selectedUniverse)

  // 2. Filtre par recherche (sans tenir compte des majuscules)
  const query = search.trim().toLowerCase()
  const foundProducts = universeProducts.filter((product) =>
    product.name.toLowerCase().includes(query)
  )

  // 3. Tri : on trie une copie, car .sort() modifie le tableau d'origine
  const visibleProducts = [...foundProducts].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price
    if (sortOrder === 'price-desc') return b.price - a.price
    return a.name.localeCompare(b.name, 'fr')
  })

  return (
    <div className="catalog">
      <UniverseSidebar
        universes={universes}
        products={products}
        selectedUniverse={selectedUniverse}
        onSelect={setSelectedUniverse}
      />

      <main className="catalog-main">
        <label className="visually-hidden" htmlFor="search">
          Rechercher un objet
        </label>
        <input
          id="search"
          className="search-input"
          type="search"
          placeholder="Rechercher un objet"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="toolbar">
          <p className="result-count">
            {visibleProducts.length} {visibleProducts.length > 1 ? 'objets' : 'objet'}
          </p>

          <div className="sort">
            <label htmlFor="sort">Trier par</label>
            <select
              id="sort"
              className="sort-select"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name">Nom (A → Z)</option>
            </select>
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <p className="empty-message">Aucun objet ne correspond à votre recherche.</p>
        ) : (
          <ul className="grid">
            {visibleProducts.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  universe={universes.find((u) => u.id === product.universe)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default CatalogPage
