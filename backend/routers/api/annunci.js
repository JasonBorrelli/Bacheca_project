import express from 'express';
const router = express.Router();
import connection from '../../../data/db.js';

router.get('/', (req, res, next) => {
    const sql = `
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
        JOIN utenti    u ON u.id = a.utente_id
        ORDER BY a.id;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            return next(err); // Passa l'errore al middleware di gestione errori
        }
        res.json(results); // Restituisce i risultati in formato JSON
    });
});

router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID non valido' });
    }

    const sql = `
        SELECT
          a.id, a.titolo, a.descrizione, a.prezzo, a.immagine, a.created_at,
          c.id   AS categoria_id,
          c.nome AS categoria,
          u.id   AS utente_id,
          u.nome AS venditore,
          u.email AS venditore_email,
          (
            SELECT GROUP_CONCAT(t.nome ORDER BY t.nome SEPARATOR ', ')
            FROM annunci_tags at
            JOIN tags t ON t.id = at.tag_id
            WHERE at.annuncio_id = a.id
          ) AS tags
        FROM annunci a
        JOIN categorie c ON c.id = a.categoria_id
        JOIN utenti u    ON u.id = a.utente_id
        WHERE a.id = ?;
    `;

    // Passiamo l'array [id] come secondo argomento per prevenire SQL injection
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return next(err);
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Annuncio non trovato' });
        }

        const annuncio = results[0];
        annuncio.tags = annuncio.tags ? annuncio.tags.split(', ') : [];
        res.json(annuncio);
    });
});

export default router;