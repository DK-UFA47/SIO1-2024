<?php
abstract class Personnage {
    protected $pseudo;
    protected $genre;
    protected $force;
    protected $agilite;

    public function __construct($pseudo, $genre, $force, $agilite) {
        $this->pseudo = $pseudo;
        $this->genre = $genre;
        $this->force = $force;
        $this->agilite = $agilite;
    }

    public function getPseudo() {
        return $this->pseudo;
    }
    public function getGenre() {
        return $this->genre;
    }
    public function getForce() {
        return $this->force;
    }
    public function getAgilite() {
        return $this->agilite;
    }

    abstract public function attaquer();
}