<?php
// Chargement des personnages depuis le fichier JSON
$personnages = [];
if (file_exists(__DIR__ . '/personnages.json')) {
    $personnages = json_decode(file_get_contents(__DIR__ . '/personnages.json'), true);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Liste des Personnages RPG</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
    </style>
</head>
<body>
    <h1>Liste des Personnages</h1>

    <?php if (empty($personnages)): ?>
        <p>Aucun personnage n'a été créé.</p>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>Pseudo</th>
                    <th>Genre</th>
                    <th>Force</th>
                    <th>Agilité</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($personnages as $personnage): ?>
                    <tr>
                        <td><?= htmlspecialchars($personnage['pseudo']) ?></td>
                        <td><?= htmlspecialchars($personnage['genre']) ?></td>
                        <td><?= intval($personnage['force']) ?></td>
                        <td><?= intval($personnage['agilite']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>

    <p>
        <a href="creation_personnage.php">Créer un nouveau personnage</a>
    </p>
</body>
</html>