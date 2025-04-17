<?php
require_once 'Personnage.php';
require_once 'src/interfaces/Combatant.php';

class Archer extends Personnage implements Combatant {
    // Implémentation de la méthode attaquer()
    public function attaquer() {
        return "{$this->pseudo} tire une flèche avec une précision de {$this->agilite} !";
    }

    // Implémentation de la méthode combattre() de l'interface Combatant
    public function combattre() {
        return "{$this->pseudo} se prépare à un combat stratégique avec son arc !";
    }
}