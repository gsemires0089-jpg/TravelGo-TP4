# TravelGo - TP4

## Présentation
Cette application JavaScript permet de consulter et de filtrer les commandes d'une plateforme de voyage TravelGo.

## Technologies utilisées
- HTML5
- CSS3
- Bootstrap 5
- JavaScript ES Modules
- JSON
- Fetch API
- Git et GitHub

## Structure des données
L'application utilise trois fichiers JSON :
- `customers.json` : informations sur les clients.
- `products.json` : produits, catégories, prix et stock.
- `orders.json` : commandes, clients associés et produits commandés.

## Fonctionnalités
- Chargement asynchrone des données avec `fetch` et `async/await`.
- Gestion centralisée de l'état dans `state.js`.
- Recherche par nom du client.
- Filtrage des commandes par statut et catégorie.
- Calcul des statistiques et des totaux.
- Affichage du détail d'une commande dans une fenêtre modale.
- Gestion des erreurs de chargement.

## Organisation du code
- `app.js` : initialisation et événements.
- `dataService.js` : chargement des fichiers JSON.
- `state.js` : état central de l'application.
- `selectors.js` : recherche, filtrage et calculs.
- `view.js` : affichage des données.

## Lancement
Ouvrir `TP 4/index.html` avec l'extension Live Server de Visual Studio Code.
## Utilisation
1. Lancer l'application avec Live Server.
2. Rechercher un client par son nom.
3. Filtrer les commandes par statut.
4. Filtrer les commandes par catégorie de produit.
5. Cliquer sur « Voir le détail » pour consulter les informations d'une commande.

