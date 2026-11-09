import express from 'express';
const router = express.Router();
import connection from '../../../data/db.js';

router.get('/', (req, res, next) => {
    const sql = `
        SELECT id, nome
        FROM categorie
        ORDER BY nome;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            return next(err);
        }
        res.json(results);
    });
});

export default router;
