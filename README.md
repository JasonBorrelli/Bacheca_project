# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## API di Bacheca

Il backend si avvia con `pnpm watch` (porta 3000) e la collection pronta per Postman è in
[`postman/Bacheca.postman_collection.json`](postman/Bacheca.postman_collection.json).

| Metodo | Percorso | Descrizione | Status |
| --- | --- | --- | --- |
| GET | `/` | Verifica che il server sia attivo | `200` |
| GET | `/api/annunci` | Elenco annunci con categoria e venditore | `200` |
| GET | `/api/annunci/:id` | Dettaglio annuncio con i tag | `200`, `400`, `404` |
| POST | `/api/annunci` | Crea un annuncio (venditore creato se l'email è nuova) | `201`, `400` |
| PUT | `/api/annunci/:id` | Aggiorna un annuncio | `200`, `400`, `404` |
| DELETE | `/api/annunci/:id` | Elimina un annuncio | `204`, `400`, `404` |
| GET | `/api/categorie` | Elenco categorie ordinate per nome | `200` |

Gli errori rispondono sempre in JSON nel formato `{ "error": "messaggio" }`.
