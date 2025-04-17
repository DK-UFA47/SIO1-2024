<?php
require_once 'Personnage.php';

class Mage extends Personnage {
    public function attaquer() {
        return "{$this->pseudo} lance un sort magique avec une agilité de {$this->agilite} !";
    }
}