<?php
require_once 'views/partials/header.php';
require_once 'views/partials/footer.php';

$guerrier = new Guerrier("Carole", "1", 120, 40);
$mage = new Mage("Gandalf", "0", 50, 100);
$archer = new Archer("Legolas", "0", 80, 120);

$personnages = [$guerrier, $mage, $archer];

foreach ($personnages as $personnage) {
    echo Utilitaire::afficherPersonnage($personnage) . PHP_EOL;
    echo $personnage->attaquer() . PHP_EOL;

    if ($personnage instanceof Combatant) {
        echo $personnage->combattre() . PHP_EOL;
    }
}