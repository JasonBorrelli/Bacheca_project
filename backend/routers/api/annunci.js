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
    const id = req.params.id;
    const sql = `
        SELECT 
          a.id, 
          a.titolo, 
          t.id AS tag_id, 
          t.nome AS tag
        FROM annunci a
        LEFT JOIN annunci_tags at ON at.annuncio_id = a.id
        LEFT JOIN tags t          ON t.id = at.tag_id
        WHERE a.id = ?;
    `;

    // Passiamo l'array [id] come secondo argomento per prevenire SQL injection
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return next(err);
        }
        
        // Se non trova nessun record o l'annuncio non esiste
        if (results.length === 0) {
            return res.status(404).json({ error: "Annuncio non trovato" });
        }

        res.json(results);
    });
});

export default router;