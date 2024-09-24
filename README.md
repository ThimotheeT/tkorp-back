## Test Technique TKorp - API NestJS Partie Back

# Présentation du Projet

Ce projet est un test technique réalisé pour TKorp. Il s'agit d'une API développée avec Nest.js, 
qui gère un catalogue de personnes et d'animaux, permettant de les visualiser par la suite en 
frontend avec Next.js.

# Fonctionnalités Principales

- Gestion des personnes (CRUD)
- Gestion des animaux (CRUD)
- Association des animaux à leurs propriétaires

# Technologies Utilisées

- NestJS pour le backend
- MySQL pour la base de données
- TypeORM pour l'ORM

# Prérequis

- Node.js
- npm ou yarn
- MySQL

# Installation et Lancement

1. Clonez ce dépôt
2. Installez les dépendances : `npm install`
3. Lancez un serveur MySQL (par exemple, XAMPP).
   Accédez à phpMyAdmin ou à un autre outil de gestion de base de données MySQL.
   Créez une nouvelle base de données nommée "test-tkorp".
4. Modifiez le fichier .env.example en .env (Les données sont en clair pour le test technique ; sinon, ce sont des données cachées).
5. Collez le contenu du fichier src/database/init.sql dans le formulaire de requête de phpMyAdmin.
6. Lancez l'application : `npm run start:dev`
7. L'API sera disponible à l'adresse : `http://localhost:3000`

# Partie Front 

Vous pouvez récupérer la partie front ici : https://github.com/ThimotheeT/tkorp-front

# Structure du Projet

- `src/` : Code source de l'application
- `person/` : Contrôleurs de l'API, Services métier, Entités de la base de données
- `animal/` : Contrôleurs de l'API, Services métier, Entités de la base de données
- `database/` : Scripts SQL et migrations

# Endpoints principaux

- GET /persons : Liste toutes les personnes
- GET /persons/:id : Détails d'une personne spécifique
- GET /animals : Liste tous les animaux
- GET /animals/:id : Détails d'un animal spécifique

# Temps de Réalisation

Ce projet a été réalisé en approximativement 8 heures.

# Remarques

Ce projet a été développé dans le cadre d'un test technique.