# Tasks

## 1. Fondamenta

- [x] 1.1 Creare la repo pubblica `bacheca` con `backend/`, `frontend/`, `docs/`
- [x] 1.2 Scrivere `README.md` e `AGENTS.md`, aggiungere rule e workflow in `agent/`
- [x] 1.3 Disegnare lo schema su drawSQL ed esportarlo in `docs/`
- [x] 1.4 Realizzare su Stitch i mockup di lista annunci e dettaglio

## 2. Database

- [x] 2.1 Creare le tabelle `utenti`, `categorie`, `annunci` (prezzo facoltativo), `tags`, `annunci_tags`
- [x] 2.2 Inserire dati di prova (almeno 15 annunci, 5 categorie, 8 tag)
- [x] 2.3 Scrivere in `backend/sql/` le query SELECT/NULL, GROUP BY e JOIN

## 3. Backend Express

- [x] 3.1 Impostare `app.js`, cartella `public`, `.env` e `db/connection.js`
- [x] 3.2 Aggiungere i middleware per il 404 e per gli errori 500
- [x] 3.3 Rotte `GET /api/annunci` (con categoria) e `GET /api/annunci/:id` (con tag)
- [x] 3.4 Rotta `GET /api/categorie`
- [x] 3.5 Rotte `POST` e `PUT` degli annunci con validazione; nel `POST` cercare il venditore per email e crearlo se manca
- [x] 3.6 Rotta `DELETE` con risposta 204
- [x] 3.7 Testare tutte le rotte su Postman e verificare i dati su DBeaver

## 4. Frontend base

- [x] 4.1 Creare il progetto con Vite e pnpm, installare Tailwind e React Router
- [x] 4.2 Layout con `Outlet`, header con `NavLink` e footer
- [x] 4.3 Pagina 404 e pagine vuote (home, annunci, dettaglio, pubblica, preferiti)
- [x] 4.4 Componenti `AnnuncioCard` e `ListaAnnunci` con dati finti
- [x] 4.5 Griglia responsive a 1, 2 e 3-4 colonne

## 5. Collegamento

- [ ] 5.1 Caricare gli annunci dal backend con `fetch` e `useEffect`
- [ ] 5.2 Aggiungere indicatore di caricamento e messaggi di errore con `try/catch`
- [ ] 5.3 Pagina di dettaglio con `useParams` e redirect se l'annuncio non esiste

## 6. Stato e interazione

- [ ] 6.1 Ricerca, filtro per categoria e ordinamento per prezzo (annunci senza prezzo in fondo)
- [ ] 6.2 Debounce sulla ricerca
- [ ] 6.3 Form di pubblicazione (con nome ed email del venditore) con validazione, contatore dei caratteri e `POST`
- [ ] 6.4 Notifica di conferma che sparisce dopo qualche secondo
- [ ] 6.5 Context con custom hook per i preferiti, contatore nell'header, localStorage
- [ ] 6.6 Pagina dei preferiti
- [ ] 6.7 Tema chiaro/scuro con `useEffect` e localStorage

## 7. Rifiniture

- [ ] 7.1 Endpoint `POST /api/descrizione` che chiama Gemini con la chiave in `.env`
- [ ] 7.2 Pulsante "Genera descrizione" nel form, con caricamento ed errore gestiti
- [ ] 7.3 README finale con screenshot, pulizia del codice, controllo su 512, 768 e 992 px
- [ ] 7.4 (Opzionale) Supabase per le foto degli annunci
