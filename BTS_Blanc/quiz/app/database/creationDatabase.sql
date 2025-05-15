-- Active: 1738921173898@@127.0.0.2@3306@dbquiz
CREATE DATABASE IF NOT EXISTS dbQuiz;
USE dbQuiz;

------------------------------[ Utilisateurs ]------------------------------
CREATE TABLE IF NOT EXISTS Utilisateurs (
    idUtilisateurs INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Role ENUM('formateur', 'stagiaire') NOT NULL DEFAULT 'stagiaire',
    Nom VARCHAR(255) NOT NULL,
    Prenom VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);
------------------------------[ Quizzes ]------------------------------
CREATE TABLE IF NOT EXISTS Categories (
    idCategorie INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Questions (
    idQuestion INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (idCategorie) REFERENCES Categories(idCategorie),
    idCategorie INT(11) NOT NULL,
    Difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'easy',
    Question VARCHAR(255) NOT NULL,
        Choix1 VARCHAR(255) NOT NULL,
        Choix2 VARCHAR(255) NOT NULL,
        Choix3 VARCHAR(255) NOT NULL,
        Reponse VARCHAR(255) NOT NULL
);

------------------------------[ Data ]------------------------------
INSERT INTO Utilisateurs (Role, Nom, Prenom, Email, Password) VALUES
('formateur', 'Dupont', 'Jean', 'jean.dupont@mail.com', 'password123'),
('stagiaire', 'Martin', 'Alice', 'alice.martin@mail.com', 'password456');

INSERT INTO Categories (Nom) VALUES
('Culture générale'),
('Mathématiques'),
('Développement logiciel');

INSERT INTO Questions (idCategorie, Question, Choix1, Choix2, Choix3, Reponse, Difficulty) VALUES
(1, 'Quelle est la capitale de la France ?', 'Paris', 'Lyon', 'Marseille', 'Paris', 'easy'),
(1, 'Qui a écrit "Les Misérables" ?', 'Victor Hugo', 'Émile Zola', 'Gustave Flaubert', 'Victor Hugo', 'medium'),
(2, 'Résoudre l''équation 2x + 3 = 7.', 'x = 2', 'x = 3', 'x = 1', 'x = 2', 'easy'),
(3, 'Quel langage de programmation est principalement utilisé pour le développement web côté serveur ?', 'JavaScript', 'PHP', 'HTML', 'PHP', 'hard'),
(3, 'Quelle est la fonction utilisée pour afficher du texte en PHP ?', 'echo', 'prints', 'display', 'echo', 'easy');