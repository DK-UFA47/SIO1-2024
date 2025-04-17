<?php
require_once 'Personnage.php';

class Guerrier extends Personnage {
    public function attaquer($cible = null) {
        if (is_null($cible)) {
            return "{$this->pseudo} attaque avec son épée !";
        } elseif (is_string($cible)) {
            return "{$this->pseudo} attaque {$cible} avec une force de {$this->force} !";
        } elseif (is_array($cible)) {
            $cibles = implode(', ', $cible);
            return "{$this->pseudo} attaque plusieurs ennemis : {$cibles} avec une force de {$this->force} !";
        } else {
            return "{$this->pseudo} attaque avec une méthode inconnue.";
        }
    }
}