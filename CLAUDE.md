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

**Reprise (session du 19/11/2026 terminée)** : parcours complet catalogue → fiche → panier fait, commité et en ligne ; 20 objets dans 7 univers (emojis approximatifs pour les deux casquettes, le sabre laser et le blaster, en attendant les vraies images). Favoris et panier désormais gardés au rechargement ; univers repliables sur mobile. Site en ligne sur https://naco-shop.netlify.app/ (redéployé à chaque push sur `main`), lien de démo dans le README. Pistes suivantes : vraies images des produits (voir plus bas), capture d'écran du README, puis le backend Medusa. Autre piste : vraies images des produits (voir plus bas). Puis le backend Medusa. `README.md` réécrit (13/11/2026) ; une capture d'écran est prévue en commentaire (`docs/capture-catalogue.png`) : à décommenter quand l'utilisateur l'aura faite. Pas de mention de l'aide de Claude dans le README pour l'instant (choix laissé à l'utilisateur).

- [x] **Étape 1 — Mise en page** : `src/pages/CatalogPage.jsx` (la page) et `src/components/UniverseSidebar.jsx` (barre latérale avec compteurs). CSS Grid responsive : barre latérale au-dessus sous 900px, à gauche au-dessus ; grille de 2 / 3 / 4 colonnes (700px, 1200px). Chaque carte est dans un `<li>`.
- [x] **Étape 2 — Filtre par univers** : `useState('all')` dans `CatalogPage` (état remonté dans le parent commun), transmis à `UniverseSidebar` via `selectedUniverse` / `onSelect`. `visibleProducts` est calculé avec `.filter()`, pas stocké dans le state. Compteur « N objet(s) » accordé.
- [x] **Étape 3 — Recherche et tri** : deux `useState` de plus (`search`, `sortOrder`). Chaîne de calcul dans le rendu : filtre univers → filtre recherche (`.toLowerCase().includes()`) → tri sur une copie (`[...tableau].sort()`, `localeCompare` pour le nom). Libellés `<label htmlFor>` (celui de la recherche en `.visually-hidden`), barre `.toolbar` en flex (compteur à gauche, tri à droite), message si aucun résultat.
- [x] **Étape 4 — Bouton favori** : `useState([])` d'ids dans `CatalogPage` + `toggleFavorite` (forme fonctionnelle de `setFavorites`), transmis à `ProductCard` via `isFavorite` / `onToggleFavorite`. Bouton `<button aria-pressed aria-label>` frère du `<Link>` (pas dedans), cœur en SVG inline, `.card` en `position: relative`. Favoris non persistés pour l'instant (perdus au rechargement).
- [x] **Étape 5 — Mode sombre** : `theme` dans le `useState` de `App` (valeur initiale via `getInitialTheme` : `localStorage` puis `prefers-color-scheme`), `useEffect` qui écrit `<html data-theme>` et mémorise le choix. CSS : bloc `:root[data-theme="dark"]` qui redéfinit seulement les variables ; `--color-on-accent` pour le texte sur turquoise. Bouton 🌙/☀️ dans `Header` (`aria-pressed`, libellé fixe). Léger flash clair possible au chargement (non traité).
- [x] **Étape 6 — En-tête** : « Rechercher » est un `<Link to="/" state={{ focusSearch: true }}>` ; `CatalogPage` lit `useLocation()` et fait `searchRef.current.focus()` dans un `useEffect` (`useRef` sur l'input). Logo souligné en turquoise via `text-decoration-*`. Liens `.header-link` icône + libellé visible (plus d'`aria-label`), emojis en `aria-hidden`, badge positionné sur `.header-icon`, avec texte caché « article(s) ». Libellés masqués visuellement (pas `display: none`) sous 600px.
- [x] **Fiche produit** (`/produit/:id`) : `src/pages/ProductPage.jsx`, `useParams()` + `Number(id)`, message « Objet introuvable » si l'id n'existe pas, `<title>` React 19 dans le composant. Favoris remontés dans `App` (passés en props au catalogue et à la fiche). Cœur extrait dans `src/components/HeartIcon.jsx`, rempli via `[aria-pressed="true"] .heart-icon`. Boutons `.btn-primary` / `.btn-secondary`. « Ajouter au panier » est visuel seul (à brancher). Limites : filtre/recherche/tri du catalogue remis à zéro au retour ; favoris non persistés.
- [x] **Panier, partie 1 — contexte** : `src/context/CartContext.js` (`createContext` + hook `useCart()` qui lève une erreur hors Provider) et `src/context/CartProvider.jsx` (composant, séparé pour la règle `react-refresh/only-export-components`). State `items` = `[{ productId, quantity }]` (ids seulement), `addToCart` plafonné au stock, `cartCount` calculé par `.reduce()`. Syntaxe React 19 `<CartContext value>`. `<CartProvider>` entoure tout dans `App`. `Header` lit `cartCount` via `useCart()`. Fiche : bouton branché, `<p role="status">` « N dans votre panier · stock maximum atteint » (bouton jamais `disabled`, pour ne pas perdre le focus). Panier non persisté.
- [x] **Panier, partie 2 — page `/panier`** : `src/pages/CartPage.jsx`. Contexte enrichi de `setQuantity` (bornée entre 1 et le stock dans le Provider) et `removeFromCart`. Lignes reconstruites en joignant le produit (`{ ...item, product }`), total par `.reduce()`. Boutons + / − dans un `role="group"` nommé, quantité en `aria-live`, limites en `aria-disabled` (pas `disabled`). Après « Retirer », focus replacé sur le `<h1 tabIndex={-1}>` via `useRef`. Message + lien si panier vide. « Passer commande » visuel seul (boutique fictive).
- [x] **Favoris persistés** : `getInitialFavorites` dans `App` (sur le modèle de `getInitialTheme`) : `JSON.parse(localStorage.getItem('favorites'))` dans un `try / catch`, valeur gardée seulement si `Array.isArray` et filtrée sur les nombres, sinon `[]`. `useState(getInitialFavorites)` (initialisation paresseuse) + `useEffect` qui fait `JSON.stringify` à chaque changement. Limite : un id de produit supprimé resterait stocké (sans effet visible).
- [x] **Panier persisté** : `getInitialItems` dans `CartProvider` (clé `cart`, `JSON.parse` dans un `try / catch`). Vérification ligne par ligne (`for...of` + `continue`) : produit existant (`item?.productId`), `Number.isInteger(quantity)`, quantité bornée entre 1 et le stock, ligne reconstruite. `useState(getInitialItems)` + `useEffect` sur `[items]` qui fait `JSON.stringify`.
- [x] **Univers repliables sur mobile** : dans `UniverseSidebar`, bouton `.universe-toggle` « Univers : <nom> » (`aria-expanded`, `aria-controls`, chevron SVG tourné via `[aria-expanded="true"] .chevron`), état local `isOpen`. Sous 899px : `<h2>` caché visuellement, liste en `display: none` sauf `.is-open` ; à partir de 900px : bouton en `display: none`, liste toujours visible. Choisir un univers referme la liste et replace le focus sur le bouton (`useRef`). Limites : la liste pousse la grille (pas de superposition), pas de fermeture par Échap.
- [x] **Mise en ligne (Netlify)** : https://naco-shop.netlify.app/, déploiement automatique depuis `main` (build `npm run build`, dossier `dist`, base directory vide). `public/_redirects` (`/*  /index.html  200`) : réécriture, pas redirection, pour que les routes React Router survivent au rechargement. Projet rangé dans une équipe Netlify déjà existante (créer une nouvelle équipe n'était pas gratuit) ; à transférer vers une équipe perso plus tard si besoin.

## Vraies images des produits (à faire)

Décidé avec l'utilisateur : images libres de droits (photos perso, générées par IA ou banques libres ; pas de photos officielles des marques), carrées (~800×800), en WebP, idéalement sur fond transparent. En attendant Medusa : fichiers dans `public/images/products/`, champ `image: '/images/products/xxx.webp'` dans `products.js`, `<img alt="" width height loading="lazy">` avec l'emoji en secours si pas d'image, `object-fit: contain`.

## Après le frontend : backend Medusa.js

L'utilisateur a terminé le tutoriel Medusa (12/11/2026) et veut, une fois le frontend fini, réfléchir à un backend Medusa.js. Pistes à discuter à ce moment-là :

- `src/data/products.js` → Store API Medusa (`fetch` + états de chargement / erreur) ; univers → catégories ou collections ; emoji → images.
- Panier : le panier Medusa vit côté serveur (on ne garde que son id dans le navigateur). Le `CartProvider` (ids + quantités) devra appeler l'API au lieu de son `useState`.
- Stock → module d'inventaire Medusa. Favoris : pas de liste d'envies native → module personnalisé (bon exercice).
- Images : envoyées dans l'admin Medusa, rangées par le module de fichiers (provider local en dev ; S3 / Cloudflare R2 en production, car le disque des hébergeurs type Render ou Railway est effacé à chaque déploiement). L'API renvoie `thumbnail` et `images[].url` : `product.image` deviendra `product.thumbnail`, et `public/images/` sera supprimé.

## Points techniques connus

- `npm run lint` fonctionne, mais met plusieurs minutes sur cette machine.
- `eslint.config.js` utilise `reactHooks.configs['recommended-latest']` (plugin react-hooks en v5) et la règle `no-unused-vars` avec `varsIgnorePattern: '^[A-Z_]'`.
- Si Vite sert un fichier vide ou périmé (ex. « does not provide an export named 'default' »), relancer avec `npm run dev --force`.
- Emplacement : `~/Documents/Dev-Web/naco-shop/naco-shop-frontend` (l'utilisateur l'a remis là volontairement, pour des raisons pratiques ; le dossier parent `naco-shop/` accueillera sans doute le backend). Attention : `~/Documents` est synchronisé par iCloud (« Bureau et Documents » activé, vérifié le 13/11/2026). Le 29/09/2026, cette synchro avait fait échouer les redémarrages de Vite (« Unexpected end of file in JSON » sur `package.json`) et servi des fichiers vides. Si ça revient : `npm run dev --force`, ou déplacer le projet hors de `Documents` / `Bureau`.
- Git + GitHub : dépôt public https://github.com/Othmane-Khiter/naco-shop (branche `main`). Commits signés avec l'adresse anonyme GitHub (`user.email` configuré localement dans ce dépôt, pas en global). Un commit par étape terminée.
