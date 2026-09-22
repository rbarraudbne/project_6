# JustStreamIt

Application web développée pour l'association **JustStreamIt**, permettant de visualiser en temps réel un classement de films : meilleur film du moment, films les mieux notés, plusieurs catégories, et une sélection dynamique parmi tous les genres disponibles.

Projet réalisé dans le cadre du parcours OpenClassrooms *Développeur d'application Python*.

## Fonctionnalités

- Affichage du meilleur film (toutes catégories confondues), avec résumé complet
- Liste des films les mieux notés
- Deux catégories de films mises en avant (Mystery, Comedy)
- Sélection d'une catégorie parmi la liste complète des genres disponibles, avec rafraîchissement dynamique de l'affichage
- Fenêtre modale de détail au clic sur un film (genre, durée, classification, réalisateur, acteurs, résumé complet, recettes au box-office...)
- Interface responsive (mobile, tablette, ordinateur), avec un bouton "Voir plus" / "Voir moins" pour afficher les films masqués sur petits écrans

## Stack technique

- **HTML5** sémantique
- **CSS3**, avec [Bootstrap 5.3](https://getbootstrap.com/) pour la grille responsive
- **JavaScript vanilla** (aucun framework JS), utilisation de `fetch` et des Promises (chaînage `.then()` / `.catch()`)
- Données fournies par [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR), une API Django REST fournie en local pour ce projet

## Prérequis

- Un navigateur web récent (Chrome, Firefox, Safari ou Edge)
- [Python 3](https://www.python.org/) et `pip`, pour faire tourner l'API en local
- Git

## Installation

### 1. Cloner ce dépôt (le front-end)

```bash
git clone https://github.com/rbarraudbne/project_6
cd juststreamit-front
```

### 2. Installer et lancer l'API OCMovies

Ce projet dépend d'une API fournie séparément par OpenClassrooms. Dans un dossier distinct :

```bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
cd OCMovies-API-EN-FR
```

Suivre les instructions du README de ce dépôt pour créer l'environnement virtuel, installer les dépendances, et charger les données. Lancer ensuite le serveur :

```bash
python manage.py runserver
```

L'API doit être accessible sur **http://localhost:8000**.

> ⚠️ Le serveur Django doit rester actif dans un terminal pendant toute l'utilisation du site.

### 3. Lancer le front-end

Aucune installation n'est nécessaire pour le front-end (JavaScript vanilla, pas de `npm install`).

Ouvrir simplement `index.html` dans un navigateur — par exemple via l'option "Open in Browser" de PyCharm, ou en double-cliquant sur le fichier dans l'explorateur de fichiers.

## Structure du projet

```
juststreamit-front/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── api.js      # Appels fetch vers l'API OCMovies
    ├── ui.js        # Génération et mise à jour du DOM
    └── main.js       # Point d'entrée, gestion des événements
```

## Notes

- L'API OCMovies étant un projet de test fourni par OpenClassrooms, certaines affiches de films anciens peuvent être manquantes (lien d'image mort côté données) ; un visuel de remplacement s'affiche automatiquement dans ce cas.
- CORS doit être autorisé côté API (`django-cors-headers`) pour que le front-end puisse effectuer ses requêtes vers `localhost:8000`.

## Auteur

Rachelle Barraud
