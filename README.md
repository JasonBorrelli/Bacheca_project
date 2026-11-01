# Bacheca

Marketplace di annunci tra utenti, costruito come progetto di allenamento per il corso **AI Web Developer**. Gli utenti consultano gli annunci, li filtrano per categoria e tag, salvano i preferiti e ne pubblicano di nuovi. Un assistente basato su Gemini genera la descrizione di un annuncio a partire da poche parole chiave.

> Stato del progetto: **in sviluppo**. Il programma giornaliero è in [`USER.md`](USER.md).

## Funzionalità

- Elenco annunci con ricerca, filtro per categoria e ordinamento per prezzo
- Pagina di dettaglio con categoria, venditore e tag
- Pubblicazione di un nuovo annuncio con validazione
- Preferiti / carrello con contatore nell'header, salvati nel browser
- Tema chiaro e scuro
- Generazione della descrizione di un annuncio con l'API Gemini
- Layout responsive, pensato prima per mobile

## Stack

| Parte     | Tecnologie                                           |
| --------- | ---------------------------------------------------- |
| Frontend  | React, Vite, Tailwind CSS, React Router, Context API |
| Backend   | Node.js, Express 5, mysql2                           |
| Database  | MySQL 8.4                                            |
| AI        | API Gemini (chiamata dal backend)                    |
| Strumenti | pnpm, Git/GitHub, Postman, DBeaver                   |

## Struttura del repository

```
bacheca/
├── README.md
├── AGENTS.md
├── USER.md
├── docs/               schema del database, specifiche, mockup
├── backend/
│   ├── app.js
│   ├── .env.example
│   ├── db/             connessione a MySQL
│   ├── routers/        annunci.js, categorie.js
│   ├── middlewares/    gestione errori e 404
│   ├── sql/            schema e query (SELECT, GROUP BY, JOIN)
│   └── public/         file statici
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── context/
        └── hooks/
```

## Come avviare il progetto

### Prerequisiti

- Node.js e pnpm
- MySQL 8.4 in esecuzione e un client come DBeaver

### 1. Database

Crea un database (per esempio `bacheca`) e importa lo schema da `backend/sql/`.

### 2. Backend

```bash
cd backend
pnpm install
cp .env.example .env     # poi compila i valori
pnpm dev                 # http://localhost:3000
```

Variabili in `backend/.env`:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bacheca
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=
```

### 3. Frontend

```bash
cd frontend
pnpm install
pnpm dev                 # http://localhost:5173
```

## API

Tutte le rotte hanno il prefisso `/api`.

| Metodo | Rotta          | Descrizione                      | Stato   |
| ------ | -------------- | -------------------------------- | ------- |
| GET    | `/annunci`     | Elenco annunci con categoria     | da fare |
| GET    | `/annunci/:id` | Dettaglio con tag                | da fare |
| POST   | `/annunci`     | Crea un annuncio (201)           | da fare |
| PUT    | `/annunci/:id` | Aggiorna un annuncio             | da fare |
| DELETE | `/annunci/:id` | Elimina un annuncio (204)        | da fare |
| GET    | `/categorie`   | Elenco categorie                 | da fare |
| POST   | `/descrizione` | Genera la descrizione con Gemini | da fare |

Gli errori sono sempre in JSON: `{ "error": "messaggio" }`.

## Database

Tabelle: `utenti`, `categorie`, `annunci`, `tags`, `annunci_tags` (relazione molti a molti) e `preferiti`. Lo schema è in `docs/`.

## Argomenti del corso messi in pratica

Git/GitHub · HTML/CSS (box model, flexbox, grid, responsive) · JavaScript (array, oggetti, fetch, localStorage, timing functions) · React (componenti, hook, form, Router, Context) · SQL (relazioni, GROUP BY, JOIN) · Express (routing, middleware, mysql2) · API Gemini · AGENTS.md e sviluppo con agenti AI.

## Avanzamento

- [ ] Fondamenta: repo, README, AGENTS.md, schema, mockup
- [ ] Database con dati di prova e query
- [ ] Backend Express con CRUD e middleware
- [ ] Frontend base con Router e layout responsive
- [ ] Collegamento frontend e backend
- [ ] Filtri, form, Context e localStorage
- [ ] Integrazione Gemini e rifiniture

## Screenshot

_Da aggiungere a fine progetto._
