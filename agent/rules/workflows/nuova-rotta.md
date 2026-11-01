---
description: Aggiunge una nuova rotta REST al backend Express (router, query MySQL, test su Postman)
---

# Workflow: /nuova-rotta

Usa questo workflow quando devo aggiungere una rotta al backend di Bacheca.

1. Se non l'ho già detto, chiedimi: risorsa (es. `annunci`), operazione (index, show, store, update, destroy), percorso e risposta attesa.
2. Leggi lo schema in `backend/sql/` e in `docs/` e verifica che tabelle e colonne necessarie esistano. Se manca qualcosa, fermati e chiedimelo.
3. Descrivi il piano (file da modificare, query SQL prevista, status code) e **aspetta il mio ok**.
4. Scrivi la rotta in `backend/routers/<risorsa>.js`:
   - query con placeholder `?` di `mysql2`
   - `try/catch` con gli errori passati a `next(err)`, così li gestisce il middleware
   - risposte JSON; errori nel formato `{ "error": "messaggio" }`
5. Usa gli status code giusti: `200` lettura/aggiornamento, `201` creazione, `204` cancellazione senza corpo, `400` dati non validi, `404` risorsa non trovata.
6. Se il router è nuovo, registralo in `backend/app.js` con il prefisso `/api`.
7. Spiega in massimo cinque righe cosa fa il codice e quale argomento del corso mette in pratica.
8. Dammi il test da fare su Postman: metodo, URL, eventuale body di esempio e risposta attesa. Ricordami di controllare il risultato su DBeaver per store, update e destroy.
9. Solo dopo che ti ho confermato che funziona, aggiorna lo stato della rotta nella tabella API del `README.md`.
