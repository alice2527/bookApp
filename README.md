# Application de Gestion de Livres

Cette application Spring Boot permet de gérer une bibliothèque de livres, avec des fonctionnalités pour créer, mettre à jour, supprimer et récupérer des livres à partir d'une base de données.
## Technologies Utilisées

- Java 17
- Spring Boot 3.1.5
- MySQL
- Maven
 ## Configuration Requise

Avant de commencer, assurez-vous d'avoir installé :

- JDK 17 ou une version supérieure
- Maven
- MySQL Server
## Configuration de la Base de Données

-Créez une base de données MySQL nommée `bookapp`
-Configurez les informations de connexion à la base de données dans src/main/resources/application.properties.

## Utilisation de l'API

L'API REST de l'application expose les endpoints suivants pour gérer les livres :

GET /api/books : Récupérer tous les livres.
GET /api/books/{id} : Récupérer un livre par son ID.
GET /api/books/author/{author} : Récupérer les livres d'un auteur spécifique.
GET /api/books/type/{type} : Récupérer les livres d'un auteur spécifique.
POST /api/books : Créer un nouveau livre.
PUT /api/books/{id} : Mettre à jour un livre existant par son ID.
PATCH /api/books/{id} : Mettre à jour partiellement un livre par son ID.
DELETE /api/books/{id} : Supprimer un livre par son ID.
