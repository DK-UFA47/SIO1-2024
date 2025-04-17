# Projet RPG - Système de Gestion des Personnages
## Contexte
Ce projet a pour objectif de créer un système de gestion des personnages pour un nouveau jeu de rôle (RPG). Les joueurs doivent pouvoir créer et gérer leurs personnages, qui possèdent différentes caractéristiques et capacités.
## Caractéristiques des Personnages
Chaque personnage a les attributs suivants :
- **Pseudo** (public) : Le nom du personnage.
- **Genre** (public, booléen) : Indique si le personnage est un homme ou une femme.
- **Force** (private) : Représente la force du personnage.
- **Agilité** (private) : Représente l'agilité du personnage.
## Concepts de Programmation Orientée Objet
Ce projet intègre des concepts avancés de POO, tels que :
- **Classes abstraites** : Utilisées pour définir des comportements communs pour les classes dérivées.
- **Surcharge** : Permet d'utiliser plusieurs méthodes avec le même nom mais des signatures différentes.
- **Polymorphisme** : Permet d'utiliser des objets de différentes classes de manière interchangeable.
- **Méthodes statiques** : Utilisées pour des opérations qui ne dépendent pas d'une instance de la classe.
- **Interface** : Définissent des méthodes que les classes doivent implémenter.
## Interface Web
Une interface web sera créée pour permettre aux utilisateurs de saisir les informations des personnages et de les enregistrer dans une base de données. Cette interface utilisera des requêtes et des méthodes de communication avec la base de données qui implémentent également la POO.
## Prérequis
- PHP 7.4 ou supérieur
- Serveur web (Apache, Nginx, etc.)
- MySQL ou MariaDB
## Installation
1. **Clonez le dépôt :**
   ```bash
   git clone https://votre-repo-url.git
   ```
2. **Accédez au répertoire du projet :**
   ```bash
   cd projet_rpg
   ```
3. **Créez la base de données :**
   Exécutez le script SQL pour créer les tables nécessaires.
   ```sql
   SOURCE sql/create_tables.sql;
   ```
4. **Configurez la base de données :**
   Modifiez le fichier `config/config.php` pour y insérer vos informations de connexion à la base de données.
5. **Lancez le serveur :**
   Vous pouvez utiliser le serveur intégré de PHP pour tester l'application ou simplement lancer Apache dans XAMPP ou WAMP:
   ```bash
   php -S localhost:8080 -t public
   ```
6. **Accédez à l'application :**
   Ouvrez votre navigateur et allez à `http://localhost/chemin_vers_fichier_index.php`.
## Sécurité
- Assurez-vous que votre fichier `config.php` est bien protégé et non accessible publiquement.
- Utilisez des requêtes préparées pour éviter les injections SQL.
- Hachez les mots de passe avant de les stocker dans la base de données.
## Fonctionnalités
- Création de personnages
- Gestion des caractéristiques des personnages
- Interface web pour la saisie et l'enregistrement des informations des personnages
