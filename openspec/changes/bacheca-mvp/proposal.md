# Proposta: Bacheca MVP

## Why

Serve un progetto unico che metta in pratica tutti gli argomenti del corso AI Web Developer (HTML/CSS, JavaScript, React, SQL, Express, API Gemini) e che sia presentabile come portfolio. Un marketplace di annunci è abbastanza ricco da richiedere CRUD completo, relazioni tra tabelle (anche molti-a-molti), filtri, stato globale e una integrazione AI, senza essere troppo grande per essere finito in 5 settimane.

## What Changes

- Un backend Express + MySQL che espone le API REST per annunci e categorie, con middleware per errori e rotte inesistenti.
- Un frontend React con elenco annunci, ricerca e filtri, pagina di dettaglio, form di pubblicazione e pagina dei preferiti.
- Preferiti con contatore nell'header, salvati nel browser.
- Tema chiaro e scuro, layout responsive mobile-first.
- Generazione della descrizione di un annuncio con l'API Gemini, chiamata solo dal backend.

## Capabilities

- `annunci`: consultazione, ricerca, filtri, dettaglio, pubblicazione, modifica e cancellazione, errori API
- `preferiti`: salvataggio degli annunci preferiti e contatore
- `descrizione-ai`: generazione della descrizione con Gemini
- `interfaccia`: layout responsive, navigazione, pagina 404, tema chiaro/scuro

## Fuori ambito (per ora)

- Registrazione e login degli utenti (eventuale evoluzione con Supabase)
- Upload delle foto (si usano URL di immagini o file statici in `public/`)
- Messaggi tra utenti e pagamenti

## Decisioni

1. **Venditore**: il form di pubblicazione chiede nome ed email del venditore. Il backend cerca l'email in `utenti`: se esiste usa quell'utente, altrimenti lo crea, poi inserisce l'annuncio collegato a lui. Login e registrazione restano fuori ambito.
2. **Preferiti**: solo nel browser (Context + localStorage). La tabella `preferiti` non fa parte dello schema dell'MVP e tornerà con login e Supabase.
3. **Prezzo**: facoltativo. `NULL` significa "da concordare" e il frontend lo mostra così. Se presente, deve essere 0 o più. Nell'ordinamento per prezzo gli annunci senza prezzo vanno in fondo (`ORDER BY prezzo IS NULL, prezzo`).

## Impact

- Nuovi: `backend/` (Express), `frontend/` (React), `docs/` (schema), `backend/sql/`
- Nessun codice esistente da modificare: la repo parte da zero.
