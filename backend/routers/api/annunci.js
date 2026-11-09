import express from 'express';
const router = express.Router();
import connection from '../../../data/db.js';

const db = connection.promise();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validaAnnuncio = (body) => {
    const errori = [];

    const titolo = typeof body.titolo === 'string' ? body.titolo.trim() : '';
    if (!titolo) {
        errori.push('Il titolo è obbligatorio');
    } else if (titolo.length > 150) {
        errori.push('Il titolo non può superare 150 caratteri');
    }

    const descrizione = typeof body.descrizione === 'string' ? body.descrizione.trim() : '';
    if (descrizione.length < 100) {
        errori.push('La descrizione deve avere almeno 100 caratteri');
    }

    const categoriaId = Number(body.categoria_id);
    if (!Number.isInteger(categoriaId) || categoriaId <= 0) {
        errori.push('La categoria non è valida');
    }

    let prezzo = null;
    if (body.prezzo !== undefined && body.prezzo !== null && body.prezzo !== '') {
        prezzo = Number(body.prezzo);
        if (!Number.isFinite(prezzo) || prezzo < 0) {
            errori.push('Il prezzo deve essere un numero maggiore o uguale a 0');
        } else if (prezzo > 99999999.99) {
            errori.push('Il prezzo è troppo alto');
        } else {
            prezzo = Math.round(prezzo * 100) / 100;
        }
    }

    let immagine = null;
    if (body.immagine !== undefined && body.immagine !== null && body.immagine !== '') {
        if (typeof body.immagine !== 'string') {
            errori.push("L'immagine deve essere un testo");
        } else if (body.immagine.trim().length > 255) {
            errori.push("L'immagine non può superare 255 caratteri");
        } else {
            immagine = body.immagine.trim();
        }
    }

    // null = tags non inviati (nel PUT restano invariati); [] = svuota i tag
    let tags = null;
    if (body.tags !== undefined) {
        if (!Array.isArray(body.tags)) {
            errori.push('I tag devono essere un array di id');
        } else {
            tags = [...new Set(body.tags.map(Number))];
            if (tags.some((tagId) => !Number.isInteger(tagId) || tagId <= 0)) {
                errori.push('I tag non sono validi');
            }
        }
    }

    return {
        errori,
        dati: { titolo, descrizione, prezzo, immagine, categoriaId, tags },
    };
};

const validaVenditore = (body) => {
    const errori = [];

    const nome = typeof body.nome_venditore === 'string' ? body.nome_venditore.trim() : '';
    if (!nome) {
        errori.push('Il nome del venditore è obbligatorio');
    } else if (nome.length > 100) {
        errori.push('Il nome del venditore non può superare 100 caratteri');
    }

    const email = typeof body.email_venditore === 'string' ? body.email_venditore.trim() : '';
    if (!EMAIL_REGEX.test(email)) {
        errori.push("L'email del venditore non è valida");
    } else if (email.length > 255) {
        errori.push("L'email del venditore non può superare 255 caratteri");
    }

    return { errori, nome, email };
};

const trovaAnnuncio = async (id) => {
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

    const [results] = await db.query(sql, [id]);
    if (results.length === 0) {
        return null;
    }

    const annuncio = results[0];
    annuncio.tags = annuncio.tags ? annuncio.tags.split(', ') : [];
    return annuncio;
};

const verificaCategoriaETags = async (dati) => {
    const [categorie] = await db.query('SELECT id FROM categorie WHERE id = ?', [dati.categoriaId]);
    if (categorie.length === 0) {
        return 'La categoria indicata non esiste';
    }

    if (dati.tags && dati.tags.length > 0) {
        const [tags] = await db.query('SELECT id FROM tags WHERE id IN (?)', [dati.tags]);
        if (tags.length !== dati.tags.length) {
            return 'Uno o più tag indicati non esistono';
        }
    }

    return null;
};

router.get('/', async (req, res, next) => {
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

    try {
        const [results] = await db.query(sql);
        res.json(results);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID non valido' });
    }

    try {
        const annuncio = await trovaAnnuncio(id);
        if (!annuncio) {
            return res.status(404).json({ error: 'Annuncio non trovato' });
        }
        res.json(annuncio);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const body = req.body ?? {};
    const { errori: erroriAnnuncio, dati } = validaAnnuncio(body);
    const { errori: erroriVenditore, nome, email } = validaVenditore(body);
    const errori = [...erroriAnnuncio, ...erroriVenditore];

    if (errori.length > 0) {
        return res.status(400).json({ error: errori.join('; ') });
    }

    try {
        await db.beginTransaction();

        const erroreDati = await verificaCategoriaETags(dati);
        if (erroreDati) {
            await db.rollback();
            return res.status(400).json({ error: erroreDati });
        }

        const [utenti] = await db.query('SELECT id FROM utenti WHERE email = ?', [email]);
        let utenteId;

        if (utenti.length > 0) {
            utenteId = utenti[0].id;
        } else {
            const [nuovoUtente] = await db.query(
                'INSERT INTO utenti (nome, email) VALUES (?, ?)',
                [nome, email]
            );
            utenteId = nuovoUtente.insertId;
        }

        const [nuovoAnnuncio] = await db.query(
            `INSERT INTO annunci
                (titolo, descrizione, prezzo, immagine, categoria_id, utente_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [dati.titolo, dati.descrizione, dati.prezzo, dati.immagine, dati.categoriaId, utenteId]
        );

        if (dati.tags && dati.tags.length > 0) {
            const valoriTags = dati.tags.map((tagId) => [nuovoAnnuncio.insertId, tagId]);
            await db.query('INSERT INTO annunci_tags (annuncio_id, tag_id) VALUES ?', [valoriTags]);
        }

        await db.commit();

        const annuncio = await trovaAnnuncio(nuovoAnnuncio.insertId);
        res.status(201).json(annuncio);
    } catch (err) {
        await db.rollback().catch(() => {});
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID non valido' });
    }

    const { errori, dati } = validaAnnuncio(req.body ?? {});
    if (errori.length > 0) {
        return res.status(400).json({ error: errori.join('; ') });
    }

    try {
        await db.beginTransaction();

        const [esistenti] = await db.query('SELECT id FROM annunci WHERE id = ?', [id]);
        if (esistenti.length === 0) {
            await db.rollback();
            return res.status(404).json({ error: 'Annuncio non trovato' });
        }

        const erroreDati = await verificaCategoriaETags(dati);
        if (erroreDati) {
            await db.rollback();
            return res.status(400).json({ error: erroreDati });
        }

        await db.query(
            `UPDATE annunci
             SET titolo = ?, descrizione = ?, prezzo = ?, immagine = ?, categoria_id = ?
             WHERE id = ?`,
            [dati.titolo, dati.descrizione, dati.prezzo, dati.immagine, dati.categoriaId, id]
        );

        if (dati.tags !== null) {
            await db.query('DELETE FROM annunci_tags WHERE annuncio_id = ?', [id]);
            if (dati.tags.length > 0) {
                const valoriTags = dati.tags.map((tagId) => [id, tagId]);
                await db.query('INSERT INTO annunci_tags (annuncio_id, tag_id) VALUES ?', [valoriTags]);
            }
        }

        await db.commit();

        const annuncio = await trovaAnnuncio(id);
        res.json(annuncio);
    } catch (err) {
        await db.rollback().catch(() => {});
        next(err);
    }
});

export default router;
