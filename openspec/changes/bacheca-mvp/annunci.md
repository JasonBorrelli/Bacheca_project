# Delta per annunci

## ADDED Requirements

### Requirement: Elenco degli annunci

Il sistema DEVE (MUST) mostrare l'elenco degli annunci con titolo, prezzo (o "Da concordare" se manca), categoria e immagine, caricandolo dal backend al momento in cui la pagina viene mostrata.

#### Scenario: Caricamento riuscito

- **WHEN** l'utente apre la pagina degli annunci
- **THEN** viene mostrato un indicatore di caricamento
- **AND** al termine compare la griglia delle card con i dati ricevuti da `GET /api/annunci`

#### Scenario: Backend non raggiungibile

- **WHEN** la richiesta fallisce o `response.ok` è falso
- **THEN** viene mostrato un messaggio di errore chiaro al posto dell'elenco

#### Scenario: Nessun annuncio

- **WHEN** il backend risponde con un elenco vuoto
- **THEN** viene mostrato il messaggio "Nessun annuncio trovato"

### Requirement: Ricerca, filtri e ordinamento

Il sistema DEVE (MUST) permettere di cercare per testo, filtrare per categoria e ordinare per prezzo senza ricaricare la pagina.

#### Scenario: Ricerca per testo

- **WHEN** l'utente digita nel campo di ricerca
- **THEN** l'elenco si aggiorna mostrando solo gli annunci il cui titolo contiene il testo
- **AND** l'aggiornamento parte dopo una breve pausa nella digitazione (debounce)

#### Scenario: Filtro per categoria

- **WHEN** l'utente seleziona una categoria
- **THEN** vengono mostrati solo gli annunci di quella categoria

#### Scenario: Ordinamento per prezzo

- **WHEN** l'utente sceglie l'ordinamento per prezzo crescente o decrescente
- **THEN** le card vengono riordinate di conseguenza
- **AND** gli annunci senza prezzo restano in fondo all'elenco

### Requirement: Dettaglio di un annuncio

Il sistema DEVE (MUST) mostrare in una pagina dedicata tutte le informazioni di un annuncio: descrizione, prezzo, categoria, venditore e tag.

#### Scenario: Annuncio esistente

- **WHEN** l'utente apre `/annunci/:id` di un annuncio esistente
- **THEN** vengono mostrati i dati completi, compresi i tag ricevuti da `GET /api/annunci/:id`

#### Scenario: Annuncio inesistente

- **WHEN** l'utente apre `/annunci/:id` di un annuncio che non esiste
- **THEN** l'utente viene riportato all'elenco degli annunci

### Requirement: Pubblicazione di un annuncio

Il sistema DEVE (MUST) permettere di pubblicare un nuovo annuncio tramite un form con validazione.

#### Scenario: Dati validi

- **WHEN** l'utente compila titolo, descrizione, categoria, nome ed email del venditore e (facoltativamente) il prezzo, e invia il form
- **THEN** il frontend invia `POST /api/annunci` e il backend risponde `201`
- **AND** compare una notifica di conferma che sparisce dopo qualche secondo
- **AND** l'utente viene portato al dettaglio del nuovo annuncio

#### Scenario: Venditore già registrato

- **WHEN** l'email indicata nel form esiste già in `utenti`
- **THEN** l'annuncio viene collegato a quell'utente senza crearne uno nuovo

#### Scenario: Venditore nuovo

- **WHEN** l'email indicata nel form non esiste in `utenti`
- **THEN** il backend crea il nuovo utente e collega l'annuncio a lui

#### Scenario: Prezzo omesso

- **WHEN** l'utente lascia vuoto il campo prezzo
- **THEN** l'annuncio viene salvato con prezzo `NULL` e mostrato come "Da concordare"

#### Scenario: Dati non validi

- **WHEN** l'utente invia il form con titolo vuoto, descrizione troppo corta, email non valida o prezzo negativo
- **THEN** il form mostra l'errore accanto al campo e non invia nulla al backend

#### Scenario: Conteggio dei caratteri

- **WHEN** l'utente scrive nella descrizione
- **THEN** viene mostrato quanti caratteri restano disponibili

### Requirement: Modifica e cancellazione

Il backend DEVE (MUST) permettere di modificare e di eliminare un annuncio esistente.

#### Scenario: Modifica

- **WHEN** arriva `PUT /api/annunci/:id` con dati validi per un annuncio esistente
- **THEN** l'annuncio viene aggiornato nel database e la risposta contiene i dati aggiornati

#### Scenario: Cancellazione

- **WHEN** arriva `DELETE /api/annunci/:id` per un annuncio esistente
- **THEN** l'annuncio viene rimosso dal database e la risposta è `204` senza corpo

#### Scenario: Annuncio inesistente

- **WHEN** `PUT` o `DELETE` riguardano un id che non esiste
- **THEN** la risposta è `404` con `{ "error": "..." }`

### Requirement: Gestione degli errori dell'API

Il backend DEVE (MUST) rispondere sempre in JSON, anche in caso di errore, tramite due middleware dedicati.

#### Scenario: Rotta inesistente

- **WHEN** viene chiamato un endpoint che non esiste
- **THEN** la risposta è `404` con un messaggio nel formato `{ "error": "..." }`

#### Scenario: Errore lato server

- **WHEN** una query o una rotta genera un errore inatteso
- **THEN** la risposta è `500` con un messaggio generico, senza esporre dettagli interni
