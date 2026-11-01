# Programma giornaliero: progetto "Bacheca"

Marketplace di annunci tra utenti, per allenarsi in vista del progetto di fine corso.
Stack: React + Vite + Tailwind + React Router + Context, Express + MySQL, Gemini API (Supabase opzionale).

**Periodo:** lunedì 2 novembre → sabato 5 dicembre 2026 (5 settimane)

## Ritmo di lavoro (ipotesi)

- Giorni liberi (lun, mer, ven, sab): circa 2 ore
- Giorni di lezione (mar, gio): circa 30 minuti
- Domenica: riposo
- Regola fissa: **un commit con messaggio chiaro alla fine di ogni giornata**

Spunta ogni giornata con `[x]` quando l'hai completata.

---

## Settimana 1 (2-8 nov): fondamenta e database

- [x] **Lun 2**: crea la repo pubblica `bacheca` con cartelle `backend/` e `frontend/`. Scrivi README iniziale e `AGENTS.md`. Aggiungi una rule e un workflow per l'agente.
- [x] **Mar 3** (30 min): bozza delle funzionalità come specifica OpenSpec.
- [x] **Mer 4**: schema su drawSQL con `utenti`, `categorie`, `annunci` (prezzo facoltativo), `tags`, `annunci_tags`. Esporta l'immagine nella repo.
- [ ] **Gio 5** (30 min): mockup su Stitch di due schermate: lista annunci e dettaglio.
- [x] **Ven 6**: crea il DB in DBeaver con le tabelle e i dati di prova (almeno 15 annunci, 5 categorie, 8 tag).
- [ ] **Sab 7**: scrivi le query SELECT/NULL, GROUP BY e JOIN in file `.sql`. Commit e push.
- [ ] **Dom 8**: riposo.

## Settimana 2 (9-15 nov): backend Express

- [ ] **Lun 9**: setup di Express con `app.js`, cartella `public`, `mysql2` e `db/connection.js`. Testa la rotta `/` su Postman.
- [ ] **Mar 10** (30 min): middleware per gli errori 500 e per il 404.
- [ ] **Mer 11**: router `annunci` con INDEX (JOIN con la categoria) e SHOW (con i tag).
- [ ] **Gio 12** (30 min): router `categorie`, con la sola INDEX.
- [ ] **Ven 13**: STORE e UPDATE, con validazione dei dati in ingresso. Nello STORE cerca il venditore per email e crealo se non esiste.
- [ ] **Sab 14**: DESTROY (risposta 204), test completo su Postman, verifica su DBeaver ed export della collection nella repo.
- [ ] **Dom 15**: riposo.

## Settimana 3 (16-22 nov): frontend e collegamento

- [ ] **Lun 16**: Vite con pnpm, Tailwind, reset CSS, font e icone. React Router con `Outlet` e pagine vuote.
- [ ] **Mar 17** (30 min): pagina 404 e `NavLink` con classe active.
- [ ] **Mer 18**: `AnnuncioCard` e `ListaAnnunci` con dati finti, griglia responsive mobile-first.
- [ ] **Gio 19** (30 min): rifinitura di Header e Footer seguendo il mockup di Stitch.
- [ ] **Ven 20**: sostituisci i dati finti con `fetch` e `useEffect`, con loader, errori con try/catch e gestione CORS.
- [ ] **Sab 21**: pagina di dettaglio `/annunci/:id` con `useParams`. Redirect all'elenco se l'annuncio non esiste.
- [ ] **Dom 22**: riposo.

## Settimana 4 (23-29 nov): stato e interazione

- [ ] **Lun 23**: ricerca, filtro per categoria e ordinamento per prezzo con elementi controllati.
- [ ] **Mar 24** (30 min): debounce sulla ricerca.
- [ ] **Mer 25**: form "pubblica annuncio" con validazione, contatore caratteri e POST al backend.
- [ ] **Gio 26** (30 min): notifica "annuncio pubblicato" che sparisce dopo qualche secondo.
- [ ] **Ven 27**: Context con custom hook per carrello e preferiti, badge nell'header e salvataggio in localStorage.
- [ ] **Sab 28**: tema chiaro/scuro con `useEffect` e localStorage.
- [ ] **Dom 29**: riposo.

## Settimana 5 (30 nov - 5 dic): Gemini, rifiniture e buffer

- [ ] **Lun 30**: endpoint Express che chiama Gemini, con la chiave nel backend.
- [ ] **Mar 1 dic** (30 min): ripasso di ciò che hai fatto nella settimana.
- [ ] **Mer 2 dic**: pulsante "Genera descrizione" nel form, con stato di caricamento.
- [ ] **Gio 3 dic** (30 min): ripasso e sistemazione dei bug emersi.
- [ ] **Ven 4 dic**: README finale con screenshot, pulizia del codice e controllo responsive su 512, 768 e 992 px.
- [ ] **Sab 5 dic**: recupero di ciò che è rimasto indietro. Se sei in pari, aggiungi Supabase per le foto.

---

## Dopo il 5 dicembre

Hai circa un mese e mezzo prima dell'esame. Puoi rifare da zero una seconda versione, per esempio con Supabase al posto di Express + MySQL, così arrivi all'esame avendo provato entrambi gli approcci.

## Se resti indietro

- Non recuperare tutto in un giorno: sposta il lavoro rimasto sul sabato successivo.
- Taglia per primi Supabase, il tema scuro e le notifiche: sono rifiniture, il nucleo è CRUD + filtri + Router + Context.
