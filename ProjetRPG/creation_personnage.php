<?php
// Utiliser le chemin absolu ou le chemin du répertoire actuel
require_once 'Personnage.php';

// Traitement du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sécurisation et validation des données
    $pseudo = filter_input(INPUT_POST, 'pseudo', FILTER_SANITIZE_STRING);
    $genre = filter_input(INPUT_POST, 'genre', FILTER_VALIDATE_BOOLEAN);
    $force = filter_input(INPUT_POST, 'force', FILTER_VALIDATE_INT);
    $agilite = filter_input(INPUT_POST, 'agilite', FILTER_VALIDATE_INT);

    if ($pseudo && $genre !== null && $force !== false && $agilite !== false) {
        // Création du personnage
        $personnage = new Personnage($pseudo, $genre, $force, $agilite);

        // Chargement des personnages existants
        $personnages = [];
        if (file_exists(__DIR__ . '/personnages.json')) {
            $personnages = json_decode(file_get_contents(__DIR__ . '/personnages.json'), true);
        }

        // Ajout du nouveau personnage
        $personnages[] = [
            'pseudo' => $personnage->pseudo,
            'genre' => $personnage->getGenreTexte(),
            'force' => $personnage->getForce(),
            'agilite' => $personnage->getAgilite()
        ];

        // Sauvegarde dans le fichier JSON
        file_put_contents(__DIR__ . '/personnages.json', json_encode($personnages, JSON_PRETTY_PRINT));

        $message = "Personnage créé avec succès !";
    } else {
        $message = "Erreur dans la saisie des données.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Création de Personnage RPG</title>
</head>
<body>
    <h1>Création de Personnage</h1>
    
    <?php if (isset($message)): ?>
        <p><?= $message ?></p>
    <?php endif; ?>

    <form method="POST">
        <label>Pseudo : <input type="text" name="pseudo" required></label><br>
        
        <label>Genre :</label>
        <input type="radio" name="genre" value="1" required> Homme
        <input type="radio" name="genre" value="0" required> Femme<br>
        
        <label>Force (1-100) : <input type="number" name="force" min="1" max="100" required></label><br>
        
        <label>Agilité (1-100) : <input type="number" name="agilite" min="1" max="100" required></label><br>
        
        <input type="submit" value="Créer Personnage">
    </form>
</body>
</html>