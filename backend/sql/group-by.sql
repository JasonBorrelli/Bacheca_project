-- Query GROUP BY e aggregazioni per Bacheca (MySQL 8.4)
-- Eseguire dopo schema.sql e seed.sql.

USE bacheca;

-- 1. Numero di annunci per categoria (5 righe).
--    LEFT JOIN per mostrare anche categorie senza annunci.
SELECT c.id, c.nome, COUNT(a.id) AS numero_annunci
FROM categorie c
LEFT JOIN annunci a ON a.categoria_id = c.id
GROUP BY c.id, c.nome
ORDER BY numero_annunci DESC, c.nome;

-- 2. Numero di annunci per tag (8 righe).
SELECT t.id, t.nome, COUNT(at.annuncio_id) AS numero_annunci
FROM tags t
LEFT JOIN annunci_tags at ON at.tag_id = t.id
GROUP BY t.id, t.nome
ORDER BY numero_annunci DESC, t.nome;

-- 3. Prezzi per categoria.
--    COUNT(*) conta tutte le righe, COUNT(a.prezzo) solo i prezzi valorizzati:
--    AVG ignora i NULL, quindi il medio è calcolato sui soli annunci con prezzo.
SELECT
  c.id,
  c.nome,
  COUNT(*)            AS annunci_totali,
  COUNT(a.prezzo)     AS annunci_con_prezzo,
  MIN(a.prezzo)       AS prezzo_min,
  MAX(a.prezzo)       AS prezzo_max,
  ROUND(AVG(a.prezzo), 2) AS prezzo_medio
FROM categorie c
LEFT JOIN annunci a ON a.categoria_id = c.id
GROUP BY c.id, c.nome
ORDER BY c.id;

-- 4. Numero di tag per annuncio (15 righe; l'annuncio 14 ha 0).
SELECT a.id, a.titolo, COUNT(at.tag_id) AS numero_tag
FROM annunci a
LEFT JOIN annunci_tags at ON at.annuncio_id = a.id
GROUP BY a.id, a.titolo
ORDER BY numero_tag DESC, a.id;

-- 5. Numero di annunci per venditore (4 righe).
SELECT u.id, u.nome, u.email, COUNT(a.id) AS numero_annunci
FROM utenti u
LEFT JOIN annunci a ON a.utente_id = u.id
GROUP BY u.id, u.nome, u.email
ORDER BY numero_annunci DESC, u.nome;

-- 6. Riepilogo generale: 15 annunci, 12 con prezzo, 3 senza, medio 105.83.
SELECT
  COUNT(*)                  AS annunci_totali,
  COUNT(prezzo)             AS annunci_con_prezzo,
  COUNT(*) - COUNT(prezzo)  AS annunci_senza_prezzo,
  ROUND(AVG(prezzo), 2)     AS prezzo_medio
FROM annunci;
