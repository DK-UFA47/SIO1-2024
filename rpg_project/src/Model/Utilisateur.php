<?php
require_once "config.php";
class Utilisateur extends Database {
    private $nom;
    private $pseudo;
    private $email;
    private $motDePasse;
    
    public function __construct($nom, $pseudo, $email, $motDePasse) {
        parent::__construct();
        $this->nom = $nom;
        $this->pseudo = $pseudo;
        $this->email = $email;
        $this->motDePasse = password_hash($motDePasse, PASSWORD_DEFAULT);
    }
    
    public function save() {
        $stmt = $this->conn->prepare("INSERT INTO utilisateurs (nom, pseudo, email, mot_de_passe) VALUES (?, ?, ?, ?);");
        $stmt->bindParam(1, $this->nom);
        $stmt->bindParam(2, $this->pseudo);
        $stmt->bindParam(3, $this->email);
        $stmt->bindParam(4, $this->motDePasse);
        return $stmt->execute();
    }

    public function read($id) {
        $stmt = $this->conn->prepare("SELECT * FROM utilisateurs WHERE id = ?;");
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($id) {
        $stmt = $this->conn->prepare("UPDATE utilisateurs SET nom = ?, pseudo = ?, email = ?, mot_de_passe = ? WHERE id = ?;");
        $stmt->bindParam(1, $this->nom);
        $stmt->bindParam(2, $this->pseudo);
        $stmt->bindParam(3, $this->email);
        $stmt->bindParam(4, $this->motDePasse);
        $stmt->bindParam(5, $id);
        return $stmt->execute();
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM utilisateurs WHERE id = ?;");
        $stmt->bindParam(1, $id);
        return $stmt->execute();
    }
}