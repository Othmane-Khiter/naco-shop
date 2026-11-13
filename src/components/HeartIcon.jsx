// Cœur en SVG, utilisé par la carte produit et par la fiche produit.
// Il est décoratif (aria-hidden) : c'est le bouton qui le contient qui porte le nom accessible.
// Son remplissage dépend de l'attribut aria-pressed du bouton (voir .heart-icon dans index.css).
function HeartIcon() {
  return (
    <svg className="heart-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2 0 3.7 1.1 5.4 3 1.7-1.9 3.4-3 5.4-3 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}

export default HeartIcon
