<?php
require_once 'src/Entity/Guerrier.php';
require_once 'src/Entity/Mage.php';
require_once 'src/Entity/Archer.php';
require_once 'src/Utilitaire/Utilitaire.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer et valider les données
    $pseudo = htmlspecialchars($_POST['pseudo']);
    $genre = (bool) $_POST['genre'];
    $force = filter_var($_POST['force'], FILTER_VALIDATE_INT);
    $agilite = filter_var($_POST['agilite'], FILTER_VALIDATE_INT);
    $type = htmlspecialchars($_POST['type']);

    if (!$force || !$agilite || $force < 0 || $agilite < 0) {
        die("Les valeurs de force et d'agilité doivent être des nombres valides.");
    }

    // Créer le personnage en fonction du type
    $personnage = null;
    switch ($type) {
        case 'Guerrier':
            $personnage = new Guerrier($pseudo, $genre, $force, $agilite);
            break;
        case 'Mage':
            $personnage = new Mage($pseudo, $genre, $force, $agilite);
            break;
        case 'Archer':
            $personnage = new Archer($pseudo, $genre, $force, $agilite);
            break;
        default:
            die("Type de personnage invalide.");
    }

    // Afficher les détails du personnage
    echo "<h1>Détails du Personnage</h1>";
    echo "<p>" . Utilitaire::afficherPersonnage($personnage) . "</p>";
    echo "<br>";
    echo "<p>" . $personnage->attaquer() . "</p>";

    if ($personnage instanceof Combatant) {
        echo "<p>" . $personnage->combattre() . "</p>";
    }
}