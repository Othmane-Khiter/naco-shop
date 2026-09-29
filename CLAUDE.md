# NACO Shop

Nom officiel du site : « NACO Shop » (le nom « Artéfacts » de la maquette est abandonné).

E-shop fictif de goodies et répliques issus de la pop culture (hoverboard de Marty McFly, Pokéball, marteau de Thor, Stormbreaker, épée de Link, Keyblade, casquette de Mario…).

Projet perso destiné au portfolio d'un futur développeur freelance junior. Objectif : aller au bout d'un projet complet et vérifier que c'est à sa portée. Privilégier des explications pédagogiques et du code simple et lisible plutôt que des abstractions avancées.

## Stack

- React 19 + Vite 6, JavaScript (pas de TypeScript)
- react-router-dom 6 pour la navigation
- CSS pur dans `src/index.css`, avec variables CSS sur `:root` (pas de framework CSS)
- Données produits en dur dans `src/data/products.js` (`universes` et `products`)

## Maquette de référence (page catalogue)

Une maquette HTML interactive existe (faite dans le chat claude.ai, sous le nom de travail « Artéfacts », remplacé par « NACO Shop »). Éléments de la page catalogue :

- **En-tête** : logo en police display très grasse, souligné d'un trait turquoise (`--color-accent`) ; à droite, « Rechercher » et « Panier » avec icône + libellé.
- **Barre latérale « Univers »** : filtre par univers avec pastille de couleur et nombre de produits ; entrée « Tous » active surlignée (fond teinté + bordure gauche turquoise).
- **Zone principale** : champ « Rechercher un objet » pleine largeur ; ligne avec le nombre de résultats (« 12 objets ») à gauche et « Trier par » + menu déroulant (« Prix croissant »…) à droite.
- **Grille** de 4 colonnes sur grand écran.
- **Carte produit** : vignette carrée sur fond teinté avec l'emoji du produit, bouton favori (cœur) rond en haut à droite, étiquette « Stock limité » en bas à gauche quand `stock <= 5`, puis le nom, l'univers (pastille + nom) et le prix en police display grasse.
- **Mode sombre** : fond bleu nuit, cartes et vignettes bleu-violet foncé, mêmes accents turquoise.
- La barre « Maquette interactive / Mode sombre / Réinitialiser » en haut de la maquette sert seulement à la démo, ce n'est pas un élément du site. Le bouton de mode sombre reste à placer dans le vrai site.

## Pages prévues

- `/` : catalogue (ci-dessus)
- `/produit/:id` : fiche produit (les cartes y mènent déjà)
- `/panier` : panier (lien déjà présent dans l'en-tête)

## Avancement de la page catalogue

Méthode de travail : Claude code une étape à la fois, puis explique en détail ce qu'il a fait et pourquoi (notions React, CSS, accessibilité), et demande avant de passer à l'étape suivante. Une fois l'étape validée : cocher la case ici, puis commit + push (un commit par étape).

**Reprise (session du 29/09/2026 terminée)** : étapes 1 à 3 faites, commitées et en ligne. Projet déplacé dans `~/Dev/naco-shop` et publié sur GitHub. Prochaine session : l'utilisateur vérifie d'abord la recherche et le tri dans le navigateur (`npm run dev`), puis on attaque l'**étape 4 — bouton favori**. À faire plus tard : réécrire `README.md` (encore celui du modèle Vite) avant de montrer le projet.

- [x] **Étape 1 — Mise en page** : `src/pages/CatalogPage.jsx` (la page) et `src/components/UniverseSidebar.jsx` (barre latérale avec compteurs). CSS Grid responsive : barre latérale au-dessus sous 900px, à gauche au-dessus ; grille de 2 / 3 / 4 colonnes (700px, 1200px). Chaque carte est dans un `<li>`.
- [x] **Étape 2 — Filtre par univers** : `useState('all')` dans `CatalogPage` (état remonté dans le parent commun), transmis à `UniverseSidebar` via `selectedUniverse` / `onSelect`. `visibleProducts` est calculé avec `.filter()`, pas stocké dans le state. Compteur « N objet(s) » accordé.
- [x] **Étape 3 — Recherche et tri** : deux `useState` de plus (`search`, `sortOrder`). Chaîne de calcul dans le rendu : filtre univers → filtre recherche (`.toLowerCase().includes()`) → tri sur une copie (`[...tableau].sort()`, `localeCompare` pour le nom). Libellés `<label htmlFor>` (celui de la recherche en `.visually-hidden`), barre `.toolbar` en flex (compteur à gauche, tri à droite), message si aucun résultat.
- [ ] **Étape 4 — Bouton favori** (cœur) sur les cartes. ← **prochaine étape**
- [ ] **Étape 5 — Mode sombre** avec bouton.
- [ ] **Étape 6 — En-tête** : trait turquoise sous le logo, libellés « Rechercher » et « Panier » à côté des icônes.
- [ ] Ensuite : fiche produit (`/produit/:id`), puis panier (`/panier`, avec un contexte React dans `src/context/`).

## Points techniques connus

- `npm run lint` fonctionne, mais met plusieurs minutes sur cette machine.
- `eslint.config.js` utilise `reactHooks.configs['recommended-latest']` (plugin react-hooks en v5) et la règle `no-unused-vars` avec `varsIgnorePattern: '^[A-Z_]'`.
- Si Vite sert un fichier vide ou périmé (ex. « does not provide an export named 'default' »), relancer avec `npm run dev --force`.
- Le projet était dans `~/Documents`, synchronisé par iCloud : la synchro faisait échouer les redémarrages de Vite (« Unexpected end of file in JSON » sur `package.json`) et servait des fichiers vides. Il a été déplacé dans `~/Dev/naco-shop` (29/09/2026), hors d'iCloud. Ne pas le remettre dans `Documents` ou `Bureau`.
- Git + GitHub : dépôt public https://github.com/Othmane-Khiter/naco-shop (branche `main`). Commits signés avec l'adresse anonyme GitHub (`user.email` configuré localement dans ce dépôt, pas en global). Un commit par étape terminée.
