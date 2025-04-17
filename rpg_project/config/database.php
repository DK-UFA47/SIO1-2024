<?php
// Database connection info
$dbName = 'projectRPG';
$server = '127.0.0.2';
$username = 'root';
$password = '';

try { // Databse connection
    $pdo = new PDO("mysql:host=$server;dbname=$dbName;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
?>