CREATE DATABASE IF NOT EXISTS `projectRPG`;
USE `projectRPG`;

CREATE TABLE IF NOT EXISTS `Personnages` (
    `pseudo` VARCHAR(50) UNIQUE PRIMARY KEY,
    `type` VARCHAR(50) NOT NULL,
    `genre` bool NOT NULL,
    `force` int(3) NOT NULL,
    `agilite` int(3) NOT NULL
);

INSERT INTO `Personnages` (`pseudo`, `type`, `genre`, `force`, `agilite`) VALUES
('Aragorn', 'Guerrier', 1, 120, 40),
('Gandalf', 'Mage', 0, 50, 100),
('Legolas', 'Archer', 0, 80, 120);