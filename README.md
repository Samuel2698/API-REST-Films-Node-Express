# API de Films

Cette API est construite avec Node.js et Express. Elle gère différentes opérations sur une liste de films stockés dans un fichier JSON. L'API permet de créer, lire, mettre à jour et supprimer des films.

## Installation

1. Cloner ce dépôt : `git clone <URL>`
2. Installer les dépendances : `npm install`
3. Démarrer le serveur : `npm start`

## Routes

- `GET /` : Renvoie un message de bienvenue.
- `GET /movies` : Renvoie la liste complète des films ou les films filtrés par genre, si spécifié dans les paramètres de requête.
- `GET /movies/:id` : Renvoie un film spécifique en fonction de l'ID fourni.
- `POST /movies` : Ajoute un nouveau film à la liste. Les détails du film doivent être inclus dans le corps de la requête.
- `PATCH /movies/:id` : Met à jour les détails d'un film existant en fonction de l'ID fourni. Seuls les champs spécifiés dans la requête seront modifiés.
- `DELETE /movies/:id` : Supprime un film de la liste en fonction de l'ID fourni.

## CORS

L'API est configurée pour prendre en charge les requêtes provenant des origines suivantes :

- http://localhost:8080
- http://localhost:1234
- https://movies.com

## Démarrage du serveur

Le serveur démarre sur le port spécifié dans la variable d'environnement `PORT` ou sur le port 1234 par défaut. Une fois démarré, le serveur affiche l'URL à laquelle il écoute.
