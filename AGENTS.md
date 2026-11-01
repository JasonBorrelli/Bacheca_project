# AGENTS.md

Istruzioni per gli agenti AI che lavorano su questo repository.

## Contesto del progetto

**Bacheca** è un marketplace di annunci tra utenti. È un progetto di allenamento per il corso AI Web Developer: l'obiettivo principale è **imparare**, non solo ottenere codice funzionante. Il progetto deve mettere insieme tutti gli argomenti del corso (HTML/CSS, JavaScript, React, SQL, Express, API Gemini).

## Stack

- **Frontend** (`frontend/`): React, Vite, Tailwind CSS, React Router (modalità declarative), Context API
- **Backend** (`backend/`): Node.js, Express 5, `mysql2`, `dotenv`
- **Database**: MySQL 8.4
- **AI**: API Gemini, chiamata solo dal backend
- **Package manager**: `pnpm` (mai `npm` o `yarn`)

## Struttura del repository

```
backend/    server Express: app.js, routers/, middlewares/, db/, sql/, public/
frontend/   app React: src/components, src/pages, src/context, src/hooks
docs/       immagine dello schema e mockup
agent/      regole e workflow per l'agente
openspec/   proposta, specifiche e task del progetto
DESIGN.md   design system, token Tailwind e mockup Stitch
```

## Comandi

```bash
# backend
cd backend && pnpm install && pnpm dev     # http://localhost:3000

# frontend
cd frontend && pnpm install && pnpm dev    # http://localhost:5173
```

## Regole e workflow

- `agent/rules/bacheca.md`: metodo di lavoro (prima il piano, un passo alla volta).
- `agent/rules/workflows/nuova-rotta.md`: procedura per aggiungere una rotta REST.
- `agent/rules/workflows/chiudi-giornata.md`: controlli, spunta in `USER.md` e commit di fine giornata.
- `DESIGN.md`: token di stile da Stitch e configurazione Tailwind (colori, tipografia, componenti).

## Convenzioni di codice

- **Nomi del dominio in italiano** (`annunci`, `categorie`, `AnnuncioCard`, `usePreferiti`), parti tecniche in inglese (`Router`, `Provider`, `handleSubmit`).
- Componenti React in PascalCase, un componente per file. Funzioni e variabili in camelCase.
- Funzioni a freccia e componenti funzionali con hook. Niente class component.
- Stile solo con classi Tailwind. Approccio **mobile-first**: si parte da 512px e si aggiungono i breakpoint 576 / 768 / 992 px.
- Commenti in italiano, brevi, solo dove il motivo del codice non è ovvio.

## Convenzioni API

- Prefisso `/api`. Rotte REST: index, show, store, update, destroy.
- Risposte sempre in JSON. Errori nel formato `{ "error": "messaggio" }`.
- Status code: `200` lettura/aggiornamento, `201` creazione, `204` cancellazione (senza corpo), `400` dati non validi, `404` risorsa o rotta inesistente, `500` errore del server.
- Gli errori sono gestiti da due middleware in fondo ad `app.js`: uno per le rotte inesistenti (404) e uno per gli errori del server (500).

## Database

Tabelle previste: `utenti`, `categorie`, `annunci`, `tags`, `annunci_tags`.

- `annunci` → `categorie` (molti a uno) e `annunci` → `utenti` (molti a uno)
- `annunci` ↔ `tags` (molti a molti, tramite `annunci_tags`)
- Il prezzo di un annuncio può essere `NULL` ("da concordare"). Per ordinare mettendo i `NULL` in fondo: `ORDER BY prezzo IS NULL, prezzo`
- Alla pubblicazione il venditore si identifica con l'email: se esiste in `utenti` si usa quell'utente, altrimenti lo si crea
- I preferiti **non** sono nel database: stanno nel browser (Context + localStorage)
- Le query SELECT, GROUP BY e JOIN di riferimento stanno in `backend/sql/`.

## Regole per l'agente

1. **Prima il piano.** Per ogni modifica non banale proponi un piano (cosa, dove, perché) e aspetta l'ok prima di scrivere codice.
2. **Un passo alla volta.** Implementa una sola funzionalità per volta, in modifiche piccole e verificabili. Non generare interi moduli in una volta sola.
3. **Spiega le scelte.** Dopo ogni modifica spiega in breve cosa fa il codice e quale argomento del corso mette in pratica, così posso rifarlo da solo.
4. **Query sicure.** Usa sempre i placeholder di `mysql2` (`?`). Mai concatenare input dell'utente dentro una query SQL.
5. **Nessun segreto nel repo.** Le chiavi (database, `GEMINI_API_KEY`) stanno solo in `backend/.env`, che non va mai committato. Mantieni aggiornato `backend/.env.example` senza valori reali. La chiave Gemini non deve mai finire nel frontend.
6. **Dipendenze.** Non aggiungere librerie senza chiedere. Preferisci ciò che è già stato visto nel corso.
7. **Gestione degli stati.** Ogni chiamata `fetch` nel frontend deve avere stato di caricamento, gestione dell'errore con `try/catch` e controllo di `response.ok`.
8. **Non toccare** `.env`, `node_modules/`, cartelle di build e file in `docs/` senza che io lo chieda.
9. **Commit.** Messaggi brevi e descrittivi in italiano, uno per funzionalità (es. `Aggiunge la rotta SHOW degli annunci con i tag`).
10. **Se manca un'informazione**, chiedi invece di inventare tabelle, colonne o endpoint.

## Definizione di "fatto"

Una funzionalità è completa quando: funziona in locale, le rotte sono testate su Postman, l'interfaccia è usabile a 512px e a desktop, non ci sono errori in console e il lavoro è committato.
