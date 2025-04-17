<?php
require_once __DIR__ . '/../src/Entity/Personnage.php';
require_once __DIR__ . '/../src/Entity/Guerrier.php';
require_once __DIR__ . '/../src/Entity/Mage.php';
require_once __DIR__ . '/../src/Entity/Archer.php';
require_once __DIR__ . '/../src/Utilitaire/Utilitaire.php';

// Database connection
$dbName = 'projectRPG';
$server = 'locahost';
$username = 'root';
$password = '';    

try {
    $pdo = new PDO("mysql:host=$server;dbname=$dbName;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}

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

    // Insérer les données dans la base de données
    $stmt = $pdo->prepare("
        INSERT INTO Personnages (pseudo, type, genre, `force`, agilite)
        VALUES (:pseudo, :type, :genre, :force, :agilite)
    ");
    try {
        $stmt->execute([
            ':pseudo' => $pseudo,
            ':type' => $type,
            ':genre' => $genre,
            ':force' => $force,
            ':agilite' => $agilite
        ]);
    } catch (PDOException $e) {
        die("Erreur lors de l'insertion dans la base de données : " . $e->getMessage());
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
    echo "<nav><a href=\"index.php\">Accueil</a></nav>";
    echo "<h1>Détails du Personnage</h1>";
    echo "<p>" . Utilitaire::afficherPersonnage($personnage) . "</p>";
    echo "<br>";
    echo "<p>" . $personnage->attaquer() . "</p>";

    if ($personnage instanceof Combatant) {
        echo "<p>" . $personnage->combattre() . "</p>";
    }
}