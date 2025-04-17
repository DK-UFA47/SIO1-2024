<?php
class Personnage {
    public $pseudo;
    public $genre; // true pour Homme, false pour Femme
    private $force;
    private $agilite;

    // Constructeur
    public function __construct($pseudo, $genre, $force, $agilite) {
        $this->pseudo = $pseudo;
        $this->genre = $genre;
        $this->setForce($force);
        $this->setAgilite($agilite);
    }

    // Getters et Setters
    public function getForce() {
        return $this->force;
    }

    public function setForce($force) {
        // Validation de la force (entre 1 et 100)
        $this->force = max(1, min(100, intval($force)));
    }

    public function getAgilite() {
        return $this->agilite;
    }

    public function setAgilite($agilite) {
        // Validation de l'agilité (entre 1 et 100)
        $this->agilite = max(1, min(100, intval($agilite)));
    }

    // Méthode pour convertir le genre en texte lisible
    public function getGenreTexte() {
        return $this->genre ? 'Homme' : 'Femme';
    }
}
?>