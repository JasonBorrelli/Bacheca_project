-- Dati di prova per Bacheca (da eseguire dopo schema.sql)
-- 4 utenti, 5 categorie, 8 tag, 15 annunci, 32 collegamenti annunci-tag.
-- Di proposito: 3 annunci senza prezzo (NULL) e 1 annuncio senza tag,
-- per esercitare IS NULL e LEFT JOIN. Le immagini sono segnaposto di esempio.

USE bacheca;

-- Svuota le tabelle (ordine inverso rispetto alle dipendenze) per poter rieseguire lo script
DELETE FROM annunci_tags;
DELETE FROM annunci;
DELETE FROM tags;
DELETE FROM categorie;
DELETE FROM utenti;

INSERT INTO utenti (id, nome, email) VALUES
  (1, 'Marco Rossi',    'marco.rossi@example.com'),
  (2, 'Giulia Bianchi', 'giulia.bianchi@example.com'),
  (3, 'Luca Ferrari',   'luca.ferrari@example.com'),
  (4, 'Sara Colombo',   'sara.colombo@example.com');

INSERT INTO categorie (id, nome) VALUES
  (1, 'Elettronica'),
  (2, 'Casa e giardino'),
  (3, 'Abbigliamento'),
  (4, 'Sport e tempo libero'),
  (5, 'Libri e musica');

INSERT INTO tags (id, nome) VALUES
  (1, 'usato'),
  (2, 'come nuovo'),
  (3, 'nuovo'),
  (4, 'vintage'),
  (5, 'spedizione'),
  (6, 'ritiro a mano'),
  (7, 'trattabile'),
  (8, 'occasione');

INSERT INTO annunci (id, titolo, descrizione, prezzo, immagine, categoria_id, utente_id) VALUES
  (1,  'Bicicletta da città 28 pollici',   'Bicicletta con cambio a 6 marce, cestino e luci. Usata poco, sempre tenuta in garage.',                     120.00, 'https://picsum.photos/seed/bacheca1/600/400',  4, 1),
  (2,  'iPhone 12 128 GB',                 'Funziona perfettamente, batteria all''85%. Vendo con cover e caricabatterie originale.',                      300.00, 'https://picsum.photos/seed/bacheca2/600/400',  1, 2),
  (3,  'Divano a tre posti grigio',        'Divano in tessuto sfoderabile, molto comodo. Va ritirato a mano, misura 210 cm.',                             250.00, 'https://picsum.photos/seed/bacheca3/600/400',  2, 3),
  (4,  'Giacca di pelle vintage',          'Giacca di pelle nera anni Novanta, taglia L. Qualche segno del tempo, ma ancora bellissima.',                  80.00, 'https://picsum.photos/seed/bacheca4/600/400',  3, 2),
  (5,  'Cuffie wireless Sony',             'Cuffie con cancellazione del rumore, usate un paio di mesi. Complete di custodia e cavo.',                     60.00, 'https://picsum.photos/seed/bacheca5/600/400',  1, 1),
  (6,  'Set di vasi in terracotta',        'Sei vasi di varie dimensioni, mai usati. Ideali per balcone o giardino. Prezzo da concordare.',               NULL,  'https://picsum.photos/seed/bacheca6/600/400',  2, 4),
  (7,  'Racchetta da tennis Wilson',       'Racchetta per giocatori di livello intermedio, con corde nuove e fodero.',                                     35.00, 'https://picsum.photos/seed/bacheca7/600/400',  4, 3),
  (8,  'Collezione di romanzi gialli',     'Venti romanzi gialli in buone condizioni, venduti insieme. Si spediscono in un unico pacco.',                  40.00, 'https://picsum.photos/seed/bacheca8/600/400',  5, 4),
  (9,  'Chitarra classica Yamaha',         'Chitarra perfetta per iniziare, corde nuove e custodia morbida inclusa.',                                      90.00, 'https://picsum.photos/seed/bacheca9/600/400',  5, 1),
  (10, 'Scarponi da trekking numero 42',   'Scarponi impermeabili usati per tre escursioni. Suola in ottimo stato.',                                       55.00, 'https://picsum.photos/seed/bacheca10/600/400', 4, 2),
  (11, 'Lampada da tavolo di design',      'Lampada nuova con base in metallo e luce regolabile. Prezzo da concordare.',                                   NULL,  'https://picsum.photos/seed/bacheca11/600/400', 2, 3),
  (12, 'Monitor 24 pollici Full HD',       'Monitor con ingressi HDMI e VGA, nessun pixel rotto. Vendo con cavo di alimentazione.',                        85.00, 'https://picsum.photos/seed/bacheca12/600/400', 1, 4),
  (13, 'Cappotto di lana donna taglia M',  'Cappotto lungo color cammello, indossato una sola stagione. Foderato e molto caldo.',                          45.00, 'https://picsum.photos/seed/bacheca13/600/400', 3, 2),
  (14, 'Tavolo da giardino in ferro',      'Tavolo in ferro battuto verniciato, con quattro sedie. Da ritirare di persona.',                              110.00, 'https://picsum.photos/seed/bacheca14/600/400', 2, 1),
  (15, 'Vinili anni Ottanta, lotto da 30', 'Trenta dischi in vinile di pop e rock anni Ottanta. Prezzo da concordare dopo averli visti.',                   NULL,  'https://picsum.photos/seed/bacheca15/600/400', 5, 3);

-- Tag: 1 usato, 2 come nuovo, 3 nuovo, 4 vintage, 5 spedizione, 6 ritiro a mano, 7 trattabile, 8 occasione
-- L'annuncio 14 non ha nessun tag, di proposito.
INSERT INTO annunci_tags (annuncio_id, tag_id) VALUES
  (1, 1), (1, 6), (1, 7),
  (2, 2), (2, 5),
  (3, 1), (3, 6),
  (4, 1), (4, 4),
  (5, 2), (5, 5),
  (6, 3), (6, 6),
  (7, 1), (7, 5), (7, 8),
  (8, 1), (8, 5), (8, 8),
  (9, 1), (9, 7),
  (10, 1), (10, 8),
  (11, 3), (11, 7),
  (12, 2), (12, 5),
  (13, 1), (13, 8),
  (15, 4), (15, 5), (15, 7);

-- Controlli rapidi dopo l'import:
--   SELECT COUNT(*) FROM annunci;                       -- 15
--   SELECT COUNT(*) FROM annunci WHERE prezzo IS NULL;  -- 3
--   SELECT COUNT(*) FROM annunci_tags;                  -- 32
