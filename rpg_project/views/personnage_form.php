<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer un Personnage</title>
</head>
<body>
    <h1>Créer un Personnage</h1>
    <form action="process_form.php" method="POST">
        <label for="pseudo">Pseudo :</label>
        <input type="text" id="pseudo" name="pseudo" required><br><br>

        <label for="genre">Genre :</label>
        <select id="genre" name="genre" required>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
        </select><br><br>

        <label for="force">Force :</label>
        <input type="number" id="force" name="force" min="0" required><br><br>

        <label for="agilite">Agilité :</label>
        <input type="number" id="agilite" name="agilite" min="0" required><br><br>

        <label for="type">Type de Personnage :</label>
        <select id="type" name="type" required>
            <option value="Guerrier">Guerrier</option>
            <option value="Mage">Mage</option>
            <option value="Archer">Archer</option>
        </select><br><br>

        <button type="submit">Créer</button>
    </form>
</body>
</html>