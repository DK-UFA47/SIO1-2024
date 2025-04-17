<?php

class Utilitaire {
    public static function afficherPersonnage(Personnage $personnage) {
        $genre = $personnage->getGenre() ? 'Femme' : 'Homme';
        return
            "Pseudo: {$personnage->getPseudo()},
            Genre: {$genre},
            Force: {$personnage->getForce()},
            Agilité: {$personnage->getAgilite()}";
    }
}