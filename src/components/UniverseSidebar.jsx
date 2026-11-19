import { useState, useRef } from 'react'

function UniverseSidebar({ universes, products, selectedUniverse, onSelect }) {
  // Liste ouverte ou fermée. Ne compte que sous 900px : au-dessus, le CSS l'affiche toujours
  const [isOpen, setIsOpen] = useState(false)
  // Référence vers le bouton « Univers : … », pour y replacer le focus après un choix
  const toggleRef = useRef(null)

  // Nombre de produits par univers, ex. { bttf: 2, pkm: 3, ... }
  const counts = {}
  for (const product of products) {
    counts[product.universe] = (counts[product.universe] ?? 0) + 1
  }

  const isAllActive = selectedUniverse === 'all'

  // Nom affiché dans le bouton : « Tous » ou le nom de l'univers choisi
  const selectedName = isAllActive
    ? 'Tous'
    : universes.find((u) => u.id === selectedUniverse)?.name

  // Choisir un univers referme la liste (sur mobile) et remet le focus sur le bouton :
  // sans ça, le bouton cliqué disparaît avec la liste et le focus serait perdu
  function handleSelect(universeId) {
    onSelect(universeId)
    setIsOpen(false)
    toggleRef.current.focus()
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Univers</h2>

      {/* Visible seulement sous 900px. aria-expanded annonce « réduit / développé »,
          aria-controls indique quelle zone le bouton ouvre */}
      <button
        type="button"
        ref={toggleRef}
        className="universe-toggle"
        aria-expanded={isOpen}
        aria-controls="universe-list"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>
          Univers : <strong>{selectedName}</strong>
        </span>
        <svg className="chevron" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul id="universe-list" className={isOpen ? 'universe-list is-open' : 'universe-list'}>
        <li>
          <button
            type="button"
            className={isAllActive ? 'universe-item is-active' : 'universe-item'}
            aria-pressed={isAllActive}
            onClick={() => handleSelect('all')}
          >
            <span className="universe-label">Tous</span>
            <span className="universe-count">{products.length}</span>
          </button>
        </li>

        {universes.map((universe) => {
          const isActive = selectedUniverse === universe.id

          return (
            <li key={universe.id}>
              <button
                type="button"
                className={isActive ? 'universe-item is-active' : 'universe-item'}
                aria-pressed={isActive}
                onClick={() => handleSelect(universe.id)}
              >
                <span className="universe-label">
                  <i className="dot" style={{ background: universe.color }} />
                  {universe.name}
                </span>
                <span className="universe-count">{counts[universe.id] ?? 0}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default UniverseSidebar
