<?php
require_once "config.php";class Equipe extends Database {
    private $nomEquipe;

    public function __construct($nomEquipe) {
        parent::__construct();
        $this->nomEquipe = $nomEquipe;
    }

    public function save() {
        $stmt = $this->conn->prepare("INSERT INTO equipes (nom_equipe) VALUES (?);");
        $stmt->bindParam(1, $this->nomEquipe);
        return $stmt->execute();
    }

    public function read($id) {
        $stmt = $this->conn->prepare("SELECT * FROM equipes WHERE id = ?;");
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($id) {
        $stmt = $this->conn->prepare("UPDATE equipes SET nom_equipe = ? WHERE id = ?;");
        $stmt->bindParam(1, $this->nomEquipe);
        $stmt->bindParam(2, $id);
        return $stmt->execute();
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM equipes WHERE id = ?;");
        $stmt->bindParam(1, $id);
        return $stmt->execute();
    }
}
