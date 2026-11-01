# Delta per descrizione-ai

## ADDED Requirements

### Requirement: Generazione della descrizione
Il sistema DEVE (MUST) generare una descrizione per un annuncio a partire dal titolo e da poche parole chiave, usando l'API Gemini.

#### Scenario: Generazione riuscita
- **WHEN** l'utente compila titolo e parole chiave nel form e clicca "Genera descrizione"
- **THEN** il frontend invia `POST /api/descrizione`
- **AND** il testo ricevuto viene inserito nel campo descrizione, dove l'utente può modificarlo

#### Scenario: Stato di caricamento
- **WHEN** la richiesta di generazione è in corso
- **THEN** il pulsante è disabilitato e mostra un indicatore di attesa

#### Scenario: Dati insufficienti
- **WHEN** l'utente clicca "Genera descrizione" con il titolo vuoto
- **THEN** non parte nessuna richiesta e viene indicato che il titolo è necessario

### Requirement: Protezione della chiave API
Il sistema DEVE (MUST) tenere la chiave dell'API Gemini solo nel backend.

#### Scenario: Chiamata a Gemini
- **WHEN** il backend riceve `POST /api/descrizione`
- **THEN** è il backend a chiamare l'API Gemini usando la chiave letta da `.env`
- **AND** la chiave non compare mai nel codice del frontend né nelle risposte inviate al browser

### Requirement: Gestione degli errori di Gemini
Il sistema DEVE (MUST) gestire il caso in cui Gemini non risponda o risponda con un errore.

#### Scenario: Errore dall'API
- **WHEN** l'API Gemini restituisce un errore o va in timeout
- **THEN** il backend risponde con uno status di errore e `{ "error": "..." }`
- **AND** il form mostra un messaggio e lascia l'utente libero di scrivere la descrizione a mano
