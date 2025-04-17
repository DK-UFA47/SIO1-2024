<?php

class Utilitaire {
    // Méthode statique pour afficher les détails d'un personnage
    public static function afficherPersonnage(Personnage $personnage) {
        return "Pseudo: {$personnage->pseudo}, Genre: {$personnage->genre}, Force: {$personnage->force}, Agilité: {$personnage->agilite}";
    }
}