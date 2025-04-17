<?php
require_once 'src/controllers/Guerrier.php';
require_once 'src/controllers/Mage.php';
require_once 'src/controllers/Archer.php';
require_once 'src/utils/Utilitaire.php';

$guerrier = new Guerrier("Aragorn", "Homme", 120, 40);
$mage = new Mage("Gandalf", "Homme", 50, 100);
$archer = new Archer("Legolas", "Elfe", 80, 120);

$personnages = [$guerrier, $mage, $archer];

foreach ($personnages as $personnage) {
    echo Utilitaire::afficherPersonnage($personnage) . PHP_EOL;
    echo $personnage->attaquer() . PHP_EOL;

    if ($personnage instanceof Combatant) {
        echo $personnage->combattre() . PHP_EOL;
    }
}