function UniverseSidebar({ universes, products, selectedUniverse, onSelect }) {
  // Nombre de produits par univers, ex. { bttf: 2, pkm: 3, ... }
  const counts = {}
  for (const product of products) {
    counts[product.universe] = (counts[product.universe] ?? 0) + 1
  }

  const isAllActive = selectedUniverse === 'all'

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Univers</h2>

      <ul className="universe-list">
        <li>
          <button
            type="button"
            className={isAllActive ? 'universe-item is-active' : 'universe-item'}
            aria-pressed={isAllActive}
            onClick={() => onSelect('all')}
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
                onClick={() => onSelect(universe.id)}
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
