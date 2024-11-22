# Documentation du Projet "Parties Plans"

## Introduction

### Introduction du Projet

Dans un monde où les connexions virtuelles dominent nos interactions sociales, il est parfois difficile de trouver des opportunités concrètes pour se rassembler et partager des moments uniques en dehors du numérique. Que ce soit à travers les réseaux sociaux, les applications de rencontres ou les jeux en ligne, le virtuel prend souvent le pas sur les expériences réelles.

Cependant, il arrive fréquemment que l’on se retrouve en quête d’un **bon plan pour une soirée**, sans réellement savoir où aller, surtout à la dernière minute. Cette situation peut laisser un sentiment de frustration et d'ennui, notamment pour ceux qui recherchent des événements locaux adaptés à leurs envies et à leurs styles de vie.

C’est pour répondre à ce besoin que ce projet a été conçu : une **application révolutionnaire dédiée à la découverte et à l’organisation de soirées**. Cette plateforme intuitive et conviviale vise à connecter des organisateurs et des participants autour d’événements variés, tout en mettant en avant la personnalisation, la proximité et la simplicité d’utilisation.

Grâce à ses fonctionnalités robustes, cette application permettra :

- De découvrir rapidement des soirées en fonction de ses préférences (type, lieu, budget, etc.).
- D'organiser des événements facilement, tout en gérant les participants.
- De bâtir une communauté où chaque utilisateur peut être évalué et commenter les soirées auxquelles il a participé.

Notre ambition est claire : faire de cette plateforme **le point de départ incontournable pour toutes les soirées**, en mettant en avant des expériences réelles, conviviales et mémorables.

Cette introduction donne le ton pour explorer les nombreuses fonctionnalités et les technologies innovantes qui sous-tendent ce projet. Ensemble, mettons fin aux soirées ratées et donnons vie à des événements inoubliables. 🎉

## Technologies Utilisées

- Frontend : Angular
- Backend : NestJS
- Base de Données : PostGresSQL

## Installation

Pour installer le projet sur votre machine, veuillez suivre les étapes ci-dessous :

### Prérequis

- Node.js & npm
  Téléchargez et installez Node.js à partir du site officiel : https://nodejs.org/

- Angular CLI

```
  npm install -g @angular/cli
```

- NestJS CLI

```
  npm install -g @nestjs/cli
```

- Compte Azure avec les autorisations nécessaires pour créer des machines virtuelles

### Étapes d'Installation

1. Décompressé le dossier Zit à l'emplacement souhaité
2. Accéder au répertoire frontend et exécuter la commande suivante pour installer les dépendances :
   ```
   cd Front_app
   npm install
   ```
3. Accéder au répertoire backend et exécuter la commande suivante pour installer les dépendances :
   ```
   cd back_app
   npm install
   ```

## Configuration

Avant de lancer l'application, vous devez configurer vos identifiants pour la base de données. Suivez les étapes ci-dessous pour effectuer la configuration :

1. Initialement les credentials sont configuré dans le fichier .env à la racine du projet. Si vous souhaité la changé ce serait ceci

   ```
   const JWT_SECRET = 'xxxxxxxxxxxxxxxxxxxxxx;
   const POSTGRES_HOST = 'xxxxxxxxxxxxxxxxxxxxxx';
   const POSTGRES_PORT = 'xxxxxxxxxxxxxxxxxxxxxx';
   const POSTGRES_USER = 'xxxxxxxxxxxxxxxxxxxxxx';
   const POSTGRES_PASSWORD = 'xxxxxxxxxxxxxxxxxxxxxx';
   const POSTGRES_DATABASE = 'xxxxxxxxxxxxxxxxxxxxxx';
   ```

2. Ou sinon vous pouvez supprimez le fichier et créer le votre.

## Lancement de l'Application

Une fois l'installation et la configuration terminées, vous pouvez lancer l'application en suivant les étapes ci-dessous :

### Frontend (Angular)

1. Accéder au répertoire frontend.
   ```
   cd Front_app
   ```
2. Exécuter la commande suivante pour démarrer l'application frontend :
   ```
   ng serve
   ```

### Backend (NestJS)

1. Accéder au répertoire backend.
   ```
   cd back_app
   ```
2. Exécuter la commande suivante pour démarrer l'application backend :
   ```
   npm run start
   ```
3. Bravo! Maintenant votre projet est lancé et prêt à l'utilisation: Le front est donc accessible avec l'url: http://localhost:4200/ et le back avec l'url: http://localhost:3000/
   NB: Assurez vous que ce port soit libre et utilisé par aucun service, autrement le lien d'accession au site ne sera pas le même que celui indiqué ci-dessus.

## Utilisation

Après s'être connecté à l'application, les utilisateurs peuvent accéder à l'interface web et trouver leur soirée ou en créer et profiter des plans de soirée.🎉

### Contact

Pour tout autre demande n'hésitez pas à contacter le service support contact@parties-plans.fr

...

###### Derrick ALAVO
