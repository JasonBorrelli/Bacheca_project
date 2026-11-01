-- Query SELECT di base per Bacheca (MySQL 8.4)
-- Eseguire dopo schema.sql e seed.sql.
-- I valori letterali servono solo come esempio: nel backend si usano
-- sempre i placeholder ? di mysql2.

USE bacheca;

-- 1. Tutti gli annunci (15 righe), in ordine di id.
SELECT id, titolo, prezzo, categoria_id, utente_id, created_at
FROM annunci
ORDER BY id;

-- 2. Annunci con un prezzo (12 righe).
SELECT id, titolo, prezzo
FROM annunci
WHERE prezzo IS NOT NULL
ORDER BY id;

-- 3. Annunci senza prezzo: "da concordare" (3 righe: 6, 11, 15).
SELECT id, titolo
FROM annunci
WHERE prezzo IS NULL
ORDER BY id;

-- 4. Prezzo pronto da mostrare: se è NULL diventa "Da concordare".
SELECT
  id,
  titolo,
  COALESCE(CONCAT('EUR ', FORMAT(prezzo, 2)), 'Da concordare') AS prezzo_mostrato
FROM annunci
ORDER BY id;

-- 5. Ordinamento crescente: i NULL restano in fondo (6, 11, 15).
SELECT id, titolo, prezzo
FROM annunci
ORDER BY prezzo IS NULL, prezzo ASC;

-- 6. Ordinamento decrescente: anche qui i NULL restano in fondo.
SELECT id, titolo, prezzo
FROM annunci
ORDER BY prezzo IS NULL, prezzo DESC;

-- 7. Ricerca per titolo (esempio: "bici" trova solo l'annuncio 1).
-- Nel backend: WHERE titolo LIKE ?  con parametro '%bici%'.
SELECT id, titolo
FROM annunci
WHERE titolo LIKE '%bici%'
ORDER BY id;

-- 8. Filtro per categoria (esempio: categoria 2, 4 annunci: 3, 6, 11, 14).
-- Nel backend: WHERE categoria_id = ?
SELECT id, titolo, categoria_id
FROM annunci
WHERE categoria_id = 2
ORDER BY id;

-- 9. Ricerca + filtro + ordinamento insieme (3 annunci: 5, 12, 2).
-- Nel backend: WHERE titolo LIKE ? AND categoria_id = ?
--              ORDER BY prezzo IS NULL, prezzo
SELECT id, titolo, prezzo, categoria_id
FROM annunci
WHERE titolo LIKE '%i%' AND categoria_id = 1
ORDER BY prezzo IS NULL, prezzo;
