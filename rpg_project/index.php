<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Personnages RPG</title>
        <link rel="stylesheet" href="public/styles.css">
    </head>
    <body>
        <?php
        require_once 'views/partials/header.php';

        // Database connection info
        $dbName = 'projectRPG';
        $server = 'localhost';
        $username = 'root';
        $password = '';

        try { // Databse connection
            $pdo = new PDO("mysql:host=$server;dbname=$dbName;charset=utf8", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Erreur de connexion à la base de données : " . $e->getMessage());
        }

        // Recup données 
        $stmt = $pdo->query("SELECT * FROM Personnages");
        $personnages = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Création des personnages en fonction de leur type
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
                    break;
            }
        }?>
        <div class="character-grid">
        <?php
        foreach ($personnages as $personnage) {
            echo "<div class='character'>";
            echo "<h2>" . $personnage->getPseudo() . "</h2>";
            echo "<p>" . Utilitaire::afficherPersonnage($personnage) . "</p>";
            echo "<p>" . $personnage->attaquer() . "</p>";
            if ($personnage instanceof Combatant) {
                echo "<p>" . $personnage->combattre() . "</p>";
            }
            echo "</div>";
        }

        require_once 'views/partials/footer.php';
        ?>
        </div>
    </body>
</html>

