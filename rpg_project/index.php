<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Personnages RPG</title>
    </head>
    <body>
        <nav>
            <a href="index.php">Accueil</a>
            <a href="views/personnage_form.php">Créer un Personnage</a>
        </nav>
        <?php
        require_once 'views/partials/header.php';
        require_once 'views/partials/footer.php';

        // Database connection
        $dbName = 'projectRPG';
        $server = 'localhost';
        $username = 'root';
        $password = '';

        try {
            $pdo = new PDO("mysql:host=$server;dbname=$dbName;charset=utf8", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Erreur de connexion à la base de données : " . $e->getMessage());
        }

        // Fetch data from the database
        $stmt = $pdo->query("SELECT * FROM Personnages");
        $personnages = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Dynamically create objects based on the 'type' column
            switch ($row['type']) {
                case 'Guerrier':
                    $personnages[] = new Guerrier($row['pseudo'], $row['genre'], $row['force'], $row['agilite']);
                    break;
                case 'Mage':
                    $personnages[] = new Mage($row['pseudo'], $row['genre'], $row['force'], $row['agilite']);
                    break;
                case 'Archer':
                    $personnages[] = new Archer($row['pseudo'], $row['genre'], $row['force'], $row['agilite']);
                    break;
                default:
                    // Handle unknown types if necessary
                    break;
            }
        }

        // Display the personnages
        foreach ($personnages as $personnage) {
            echo "<p>" . Utilitaire::afficherPersonnage($personnage) . "</p>";
            echo "<p>" . $personnage->attaquer() . "</p>";

            if ($personnage instanceof Combatant) {
                echo "<p>" . $personnage->combattre() . "</p>";
            }
        }
        ?>
    </body>
</html>

