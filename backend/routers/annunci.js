import express from 'express';
const router = express.Router();
import connection from '../../data/db.js';

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

export default router;