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

    abstract public function attaquer();
}