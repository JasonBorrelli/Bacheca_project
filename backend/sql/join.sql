-- Query JOIN di riferimento per Bacheca (MySQL 8.4)
-- Eseguire dopo schema.sql e seed.sql.
-- I valori letterali servono solo come esempio: nel backend si usano
-- sempre i placeholder ? di mysql2.

USE bacheca;

-- 1. INDEX: annunci con categoria e venditore (15 righe).
SELECT
  a.id,
  a.titolo,
  a.prezzo,
  a.immagine,
  a.created_at,
  c.id   AS categoria_id,
  c.nome AS categoria,
  u.id   AS utente_id,
  u.nome AS venditore
FROM annunci a
JOIN categorie c ON c.id = a.categoria_id
JOIN utenti u    ON u.id = a.utente_id
ORDER BY a.id;

-- 2. SHOW: dettaglio di un annuncio con categoria e venditore.
-- Nel backend: WHERE a.id = ?
SELECT
  a.id,
  a.titolo,
  a.descrizione,
  a.prezzo,
  a.immagine,
  a.created_at,
  c.id   AS categoria_id,
  c.nome AS categoria,
  u.id   AS utente_id,
  u.nome AS venditore,
  u.email AS venditore_email
FROM annunci a
JOIN categorie c ON c.id = a.categoria_id
JOIN utenti u    ON u.id = a.utente_id
WHERE a.id = 1;

-- 3. Tag di un annuncio. Con LEFT JOIN l'annuncio 14 (senza tag)
--    restituisce comunque una riga, con tag_id e tag a NULL.
SELECT a.id, a.titolo, t.id AS tag_id, t.nome AS tag
FROM annunci a
LEFT JOIN annunci_tags at ON at.annuncio_id = a.id
LEFT JOIN tags t          ON t.id = at.tag_id
WHERE a.id = 14;

-- 4. Tag in un'unica stringa, comodo per la pagina di dettaglio.
--    Per l'annuncio 1: "ritiro a mano, trattabile, usato".
SELECT
  a.id,
  a.titolo,
  GROUP_CONCAT(t.nome ORDER BY t.nome SEPARATOR ', ') AS tags
FROM annunci a
LEFT JOIN annunci_tags at ON at.annuncio_id = a.id
LEFT JOIN tags t          ON t.id = at.tag_id
WHERE a.id = 1
GROUP BY a.id, a.titolo;

-- 5. Annunci senza alcun tag (1 riga: annuncio 14).
SELECT a.id, a.titolo
FROM annunci a
LEFT JOIN annunci_tags at ON at.annuncio_id = a.id
WHERE at.annuncio_id IS NULL
ORDER BY a.id;

-- 6. Tag con gli annunci collegati (l'inverso del punto 3).
SELECT t.id, t.nome, a.id AS annuncio_id, a.titolo
FROM tags t
JOIN annunci_tags at ON at.tag_id = t.id
JOIN annunci a       ON a.id = at.annuncio_id
ORDER BY t.id, a.id;
