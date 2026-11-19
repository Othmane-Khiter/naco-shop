# NACO Shop

Boutique en ligne **fictive** de goodies et de répliques issus de la pop culture : l'hoverboard de Marty McFly, la Pokéball, le marteau de Thor, l'épée de Link, la Keyblade…

Ce projet fait partie de mon portfolio. Mon objectif était de mener une application front-end complète de bout en bout, de la maquette au panier, en soignant l'accessibilité et la lisibilité du code.

**Démo en ligne : [naco-shop.netlify.app](https://naco-shop.netlify.app/)**

<!-- Capture d'écran à ajouter : ![Page catalogue de NACO Shop](docs/capture-catalogue.png) -->

## Fonctionnalités

- **Catalogue** avec filtre par univers (Pokémon, Marvel, Zelda…), recherche par nom et tri par prix ou par nom.
- **Fiche produit** avec description, prix, stock disponible et ajout au panier.
- **Panier** : modification des quantités (limitées au stock), suppression d'un article, total et nombre d'articles dans l'en-tête. Il est conservé après un rechargement.
- **Favoris** : un cœur sur chaque carte et sur chaque fiche, conservé d'une page à l'autre et après un rechargement.
- **Mode sombre**, qui suit la préférence du système et mémorise le choix du visiteur.
- **Responsive** : de 2 à 4 colonnes selon la largeur de l'écran ; sur mobile, la liste des univers se replie dans un bouton pour laisser les produits visibles dès l'arrivée.

## Stack

- [React 19](https://react.dev) et [Vite 6](https://vite.dev), en JavaScript
- [React Router 6](https://reactrouter.com) pour la navigation entre les pages
- CSS sans framework, organisé autour de variables CSS (thème clair et sombre)
- ESLint pour la qualité du code
- Hébergement sur [Netlify](https://www.netlify.com), redéployé à chaque push sur `main`

Les données des produits sont pour l'instant écrites en dur dans `src/data/products.js`.

## Choix techniques

- **État partagé.** Le panier est fourni à toute l'application par un contexte React (`CartProvider` + hook `useCart()`). Les autres états vivent dans le composant parent commun le plus proche, et descendent en props.
- **Valeurs calculées plutôt que stockées.** La liste des produits affichés, le nombre d'articles et le total du panier sont recalculés à chaque rendu à partir de l'état, ce qui évite les données désynchronisées.
- **Le panier ne stocke que des ids et des quantités.** Les informations des produits restent dans une seule source.
- **Persistance locale.** Les favoris, le panier et le thème sont enregistrés dans `localStorage`. Les données relues sont vérifiées (JSON illisible, produit inexistant, quantité au-delà du stock) avant d'être utilisées.
- **Routes côté client sur Netlify.** Le fichier `public/_redirects` renvoie `index.html` pour toutes les adresses, pour que `/panier` ou `/produit/3` s'affichent aussi après un rechargement.
- **Thème par variables CSS.** Le mode sombre redéfinit seulement les variables de couleur, sur `<html data-theme="dark">`.
- **Accessibilité** :
  - éléments HTML adaptés (boutons, liens, listes, libellés de formulaire) ;
  - `aria-pressed` pour les boutons à bascule (favori, mode sombre) ;
  - zones `role="status"` et `aria-live` pour annoncer les changements du panier ;
  - focus clavier visible, et jamais perdu (par exemple après la suppression d'un article) ;
  - textes cachés visuellement mais lus par les lecteurs d'écran.

## Lancer le projet

Prérequis : [Node.js](https://nodejs.org) 18 ou plus récent.

```bash
git clone https://github.com/Othmane-Khiter/naco-shop.git
cd naco-shop
npm install
npm run dev
```

Le site est alors disponible sur http://localhost:5173.

| Commande          | Rôle                                           |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Serveur de développement avec rechargement     |
| `npm run build`   | Version optimisée pour la production (`dist/`) |
| `npm run preview` | Aperçu local de la version de production       |
| `npm run lint`    | Vérification du code avec ESLint               |

## Structure

```
src/
├── App.jsx              Routes, thème et favoris
├── components/          Éléments réutilisables (en-tête, carte produit, barre latérale…)
├── context/             Contexte du panier
├── data/products.js     Univers et produits
├── pages/               Catalogue, fiche produit, panier
└── index.css            Styles et variables du thème
```

## Prochaines étapes

- Vraies photos des produits, à la place des emojis
- Backend avec [Medusa.js](https://medusajs.com) : produits, stock et panier gérés par une API

## Avertissement

NACO Shop est un projet d'apprentissage : aucun produit n'est réellement vendu et aucun paiement n'est possible. Les noms d'œuvres et de personnages cités appartiennent à leurs ayants droit respectifs.
