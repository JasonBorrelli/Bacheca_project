# Delta per preferiti

## ADDED Requirements

### Requirement: Aggiunta e rimozione dei preferiti
Il sistema DEVE (MUST) permettere di aggiungere un annuncio ai preferiti e di rimuoverlo, dalla card e dalla pagina di dettaglio.

#### Scenario: Aggiunta
- **WHEN** l'utente clicca sul cuore di un annuncio non ancora nei preferiti
- **THEN** l'annuncio viene aggiunto ai preferiti
- **AND** l'icona cambia stato per indicarlo

#### Scenario: Rimozione
- **WHEN** l'utente clicca sul cuore di un annuncio già nei preferiti
- **THEN** l'annuncio viene rimosso dai preferiti

### Requirement: Contatore nell'header
Il sistema DEVE (MUST) mostrare nell'header, in ogni pagina, il numero di annunci presenti nei preferiti.

#### Scenario: Aggiornamento del contatore
- **WHEN** l'utente aggiunge o rimuove un preferito
- **THEN** il contatore nell'header si aggiorna subito, senza ricaricare la pagina

### Requirement: Persistenza dei preferiti
Il sistema DEVE (MUST) conservare i preferiti nel browser, senza salvarli nel database, in modo che sopravvivano alla chiusura e alla riapertura della pagina.

#### Scenario: Ricarica della pagina
- **WHEN** l'utente ricarica la pagina dopo aver salvato dei preferiti
- **THEN** gli stessi annunci risultano ancora tra i preferiti e il contatore è corretto

#### Scenario: Dati salvati non leggibili
- **WHEN** i dati salvati nel browser sono assenti o non validi
- **THEN** l'elenco dei preferiti parte vuoto senza mostrare errori

### Requirement: Pagina dei preferiti
Il sistema DEVE (MUST) offrire una pagina che elenca gli annunci preferiti.

#### Scenario: Elenco con preferiti
- **WHEN** l'utente apre la pagina dei preferiti
- **THEN** vengono mostrate le card degli annunci salvati

#### Scenario: Elenco vuoto
- **WHEN** l'utente apre la pagina dei preferiti senza averne salvati
- **THEN** viene mostrato un messaggio che invita a esplorare gli annunci