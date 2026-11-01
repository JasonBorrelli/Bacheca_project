# Delta per interfaccia

## ADDED Requirements

### Requirement: Layout responsive mobile-first
Il sistema DEVE (MUST) adattare il layout a mobile, tablet e desktop, partendo dal design per mobile.

#### Scenario: Mobile
- **WHEN** la larghezza dello schermo è inferiore a 576px
- **THEN** le card degli annunci sono disposte su una colonna

#### Scenario: Tablet
- **WHEN** la larghezza dello schermo è almeno 768px
- **THEN** le card sono disposte su due colonne

#### Scenario: Desktop
- **WHEN** la larghezza dello schermo è almeno 992px
- **THEN** le card sono disposte su tre o quattro colonne

### Requirement: Navigazione
Il sistema DEVE (MUST) offrire un header con i link alle pagine principali, presente in tutte le pagine.

#### Scenario: Link attivo
- **WHEN** l'utente si trova su una pagina
- **THEN** il link corrispondente nell'header è evidenziato come attivo

### Requirement: Pagina non trovata
Il sistema DEVE (MUST) mostrare una pagina 404 quando l'utente apre un indirizzo che non esiste nel frontend.

#### Scenario: Indirizzo inesistente
- **WHEN** l'utente apre un percorso non previsto
- **THEN** viene mostrata una pagina 404 con un link per tornare alla home

### Requirement: Tema chiaro e scuro
Il sistema DEVE (MUST) permettere di scegliere tra tema chiaro e tema scuro e ricordare la scelta.

#### Scenario: Cambio tema
- **WHEN** l'utente clicca il pulsante del tema
- **THEN** l'interfaccia passa subito al tema opposto
- **AND** il testo del pulsante riflette il tema attivo

#### Scenario: Ritorno sul sito
- **WHEN** l'utente riapre il sito dopo aver scelto un tema
- **THEN** il tema scelto viene applicato fin dal caricamento
