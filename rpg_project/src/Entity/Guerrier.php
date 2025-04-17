<?php
require_once 'Personnage.php';

class Guerrier extends Personnage {
    public function attaquer($cible = null) {
        if (is_null($cible)) {
            return "{$this->getPseudo()} attaque avec son épée !";
        } elseif (is_string($cible)) {
            return "{$this->getPseudo()} attaque {$cible} avec une force de {$this->getForce()} !";
        } elseif (is_array($cible)) {
            $cibles = implode(', ', $cible);
            return "{$this->getPseudo()} attaque plusieurs ennemis : {$cibles} avec une force de {$this->getForce()} !";
        } else {
            return "{$this->getPseudo()} attaque avec une méthode inconnue.";
        }
    }
}