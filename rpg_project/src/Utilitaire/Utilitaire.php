<?php

class Utilitaire {
    public static function afficherPersonnage(Personnage $personnage) {
        return "Pseudo: {$personnage->pseudo},
        Genre: {$personnage->genre},
        Force: {$personnage->force},
        Agilité: {$personnage->agilite}";
    }
}