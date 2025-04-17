<?php
require_once "config.php";
class Profil extends Database {
    private $utilisateurId;
    private $jeuxFavoris;
    private $niveau;
    private $description;
    public function __construct($utilisateurId, $jeuxFavoris, $niveau, $description) {
        parent::__construct();

        $this->utilisateurId = $utilisateurId;

        $this->jeuxFavoris = $jeuxFavoris;

        $this->niveau = $niveau;

        $this->description = $description;
    }
    public function save() {

        $stmt = $this->conn->prepare("INSERT INTO profils (utilisateur_id, jeux_favoris, niveau, description) VALUES (?, ?, ?, ?);");

        $stmt->bindParam(1, $this->utilisateurId);

        $stmt->bindParam(2, $this->jeuxFavoris);

        $stmt->bindParam(3, $this->niveau);

        $stmt->bindParam(4, $this->description);

        return $stmt->execute();
    }
    public function read($id) {

        $stmt = $this->conn->prepare("SELECT * FROM profils WHERE id = ?;");

        $stmt->bindParam(1, $id);

        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function update($id) {

        $stmt = $this->conn->prepare("UPDATE profils SET utilisateur_id = ?, jeux_favoris = ?, niveau = ?, description = ? WHERE id = ?;");

        $stmt->bindParam(1, $this->utilisateurId);

        $stmt->bindParam(2, $this->jeuxFavoris);

        $stmt->bindParam(3, $this->niveau);

        $stmt->bindParam(4, $this->description);

        $stmt->bindParam(5, $id);

        return $stmt->execute();
    }
    public function delete($id) {

        $stmt = $this->conn->prepare("DELETE FROM profils WHERE id = ?;");

        $stmt->bindParam(1, $id);

        return $stmt->execute();
    }
}