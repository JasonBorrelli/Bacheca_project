---
description: Chiude la giornata di lavoro: controlli, spunta in USER.md e commit
---

# Workflow: /chiudi-giornata

Usa questo workflow a fine sessione, per chiudere la giornata del programma in `USER.md`.

1. Chiedimi quale giornata del programma ho completato, se non l'ho già detto, e leggi la voce corrispondente in `USER.md`.
2. Controlla che il lavoro corrisponda a quella voce. Se manca qualcosa, elencamelo prima di proseguire.
3. Se esiste, esegui `pnpm lint` nella cartella su cui ho lavorato (`frontend/` o `backend/`) e riportami gli errori trovati, senza correggerli da solo.
4. Esegui `git status` e verifica che `.env` e `node_modules/` non siano tra i file da committare. Se lo sono, fermati e avvisami.
5. Mostrami un riepilogo delle modifiche della giornata in massimo cinque punti.
6. **Dopo il mio ok**, spunta la giornata in `USER.md` (`[ ]` → `[x]`). Se con questa giornata si chiude una fase, spunta anche la voce corrispondente nella checklist del `README.md`.
7. Proponimi un messaggio di commit breve in italiano (es. `Aggiunge la rotta SHOW degli annunci con i tag`). Esegui il commit solo dopo il mio ok; il push solo se te lo chiedo.
