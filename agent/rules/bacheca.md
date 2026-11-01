---
trigger: always_on
description: Metodo di lavoro per il progetto Bacheca (progetto di allenamento del corso)
---

# Regola: metodo di lavoro per Bacheca

Questo è un progetto di allenamento: l'obiettivo è che io impari e sappia rifare tutto da solo. Stack, convenzioni e API sono descritti in `AGENTS.md`: leggilo e rispettalo.

## Come lavori

- Rispondi sempre in italiano.
- **Prima il piano, poi il codice.** Per ogni modifica non banale descrivi cosa farai e in quali file, e aspetta il mio ok.
- Una sola funzionalità per volta, con modifiche piccole e verificabili.
- Dopo ogni modifica spiega in poche righe cosa fa il codice e quale argomento del corso mette in pratica.
- Dopo ogni modifica dimmi **come verificarla**: su Postman (metodo, URL, body, risposta attesa) per il backend, nel browser a 512px e a desktop per il frontend.

## Cosa non fare

- Non inventare tabelle, colonne o endpoint: se non sono in `docs/` o in `backend/sql/`, chiedimelo.
- Non aggiungere librerie senza chiedere.
- Non scrivere query SQL con input concatenato: usa sempre i placeholder `?` di `mysql2`.
- Non mettere chiavi o password nel codice. Le chiavi stanno solo in `backend/.env`, mai nel frontend.
- Non fare commit o push se non te lo chiedo io.
