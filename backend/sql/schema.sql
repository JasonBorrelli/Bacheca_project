-- Schema del database di Bacheca (MySQL 8.4)
-- Bozza da riprodurre su drawSQL (docs/) e importare in DBeaver.

CREATE DATABASE IF NOT EXISTS bacheca
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bacheca;

-- Ordine di eliminazione inverso rispetto alle dipendenze, per poter rieseguire lo script
DROP TABLE IF EXISTS annunci_tags;
DROP TABLE IF EXISTS annunci;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS categorie;
DROP TABLE IF EXISTS utenti;

-- Venditori: identificati dall'email (creati alla prima pubblicazione)
CREATE TABLE utenti (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_utenti_email (email)
) ENGINE=InnoDB;

CREATE TABLE categorie (
  id   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categorie_nome (nome)
) ENGINE=InnoDB;

CREATE TABLE tags (
  id   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_tags_nome (nome)
) ENGINE=InnoDB;

-- prezzo NULL = "da concordare"; immagine = URL oppure percorso in backend/public/
CREATE TABLE annunci (
  id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  titolo       VARCHAR(150)  NOT NULL,
  descrizione  TEXT          NOT NULL,
  prezzo       DECIMAL(10,2) NULL,
  immagine     VARCHAR(255)  NULL,
  categoria_id INT UNSIGNED  NOT NULL,
  utente_id    INT UNSIGNED  NOT NULL,
  created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT chk_annunci_prezzo CHECK (prezzo IS NULL OR prezzo >= 0),
  CONSTRAINT fk_annunci_categoria FOREIGN KEY (categoria_id)
    REFERENCES categorie (id) ON DELETE RESTRICT,
  CONSTRAINT fk_annunci_utente FOREIGN KEY (utente_id)
    REFERENCES utenti (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Relazione molti-a-molti tra annunci e tags.
-- ON DELETE CASCADE: cancellando un annuncio spariscono anche i suoi collegamenti ai tag.
CREATE TABLE annunci_tags (
  annuncio_id INT UNSIGNED NOT NULL,
  tag_id      INT UNSIGNED NOT NULL,
  PRIMARY KEY (annuncio_id, tag_id),
  CONSTRAINT fk_annunci_tags_annuncio FOREIGN KEY (annuncio_id)
    REFERENCES annunci (id) ON DELETE CASCADE,
  CONSTRAINT fk_annunci_tags_tag FOREIGN KEY (tag_id)
    REFERENCES tags (id) ON DELETE CASCADE
) ENGINE=InnoDB;
