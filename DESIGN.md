# Design System: Cobalt Peer (Bacheca)

Questo documento definisce il design system, l'identità visiva e i design token per il frontend di **Bacheca**, sincronizzati con il progetto Stitch **`bacheca`** (`projects/10310858917274964222`).

Serve come punto di riferimento per la UI, i mockup delle schermate e la configurazione di **Tailwind CSS**.

---

## 1. Identità e Mockup di Riferimento

- **Stile:** Modern High-Clarity Utility con dettagli *Luminous AI*.
- **Font principale:** `Inter` (sans-serif per testi e titoli) con supporto tabular (`tnum`) per i prezzi.
- **Approccio:** Mobile-first (schermi nativi su griglia fluida a partire da 390px/512px fino a desktop).

### Schermate Stitch (Mockup)
1. **Esplora Annunci - PeerMarket** (`6d3eec5943bc4801921285072b375041`): feed annunci con griglia a 2 colonne, pill orizzontali per categorie, barra di ricerca e badge prezzo.
2. **Dettaglio Annuncio** (`1207b15f24bd4c67a3ae104e882e3992`): foto principale a tutta larghezza con angoli arrotondati, box prezzo ben visibile, dettagli venditore con badge di affidabilità e tag associati.
3. **Nuovo Annuncio con Gemini AI** (`cfb5f7b3aedf447581ee49fece7eec32`): modulo di inserimento annuncio con pulsante speciale gradiente "Migliora con Gemini AI" e box di anteprima del testo generato.
4. **I Miei Preferiti - PeerMarket** (`856672bcebb54a12ac7aa862470efd9f`): lista degli annunci salvati in locale, badge di stato e rimozione rapida.

---

## 2. Palette Colori & Token Semantici

| Nome Token | Hex | Tailwind Class / Variabile | Utilizzo |
| :--- | :--- | :--- | :--- |
| **Primary (Electric Cobalt)** | `#2563EB` | `bg-primary`, `text-primary` | CTA principali, bottoni attivi, tab selezionati, badge verificati |
| **Primary Hover** | `#1D4ED8` | `hover:bg-primary-hover` | Stato hover e active dei pulsanti primari |
| **Secondary (Gemini Indigo)** | `#6366F1` | `text-secondary`, `bg-secondary` | Funzionalità intelligenti AI, badge Gemini |
| **Tertiary (Gemini Violet)** | `#8B5CF6` | `text-tertiary`, `bg-tertiary` | Accenti secondari per l'assistente AI |
| **AI Gradient** | `#6366F1` → `#8B5CF6` | `bg-gradient-to-r from-indigo-500 to-purple-500` | Bottoni e banner per le azioni con Gemini AI |
| **Canvas / Background** | `#F8FAFC` | `bg-canvas` (`slate-50`) | Sfondo generale dell'applicazione |
| **Surface (Cards/Modals)** | `#FFFFFF` | `bg-surface` (`white`) | Sfondo per card annunci, fogli modali, navbar |
| **Text Primary** | `#0F172A` | `text-text-primary` (`slate-900`) | Titoli, prezzi, intestazioni principali |
| **Text Secondary** | `#475569` | `text-text-secondary` (`slate-600`) | Metadati, timestamp, info venditore, descrizioni secondarie |
| **Text Muted** | `#94A3B8` | `text-text-muted` (`slate-400`) | Placeholder degli input, icone disattivate |
| **Border Subtle** | `#E2E8F0` | `border-border-subtle` (`slate-200`) | Bordi perimetrali delle card e divisori |
| **Price Drop (Alert/Sconto)** | `#EF4444` | `bg-price-drop` (`red-500`) | Badge sconto, evidenziazione cali di prezzo |
| **Success (Verificato)** | `#10B981` | `bg-success` (`emerald-500`) | Badge venditore affidabile, feedback di successo |

---

## 3. Tipografia

- **Famiglia:** `'Inter', system-ui, sans-serif`

| Token Tipografico | Dimensioni (Desktop / Mobile) | Peso | Lettera / Spaziatura |
| :--- | :--- | :--- | :--- |
| **headline-xl** | `36px` (line-height `44px`) / `28px` (`36px`) | Bold (`700`) | `-0.025em` |
| **headline-lg** | `28px` (line-height `36px`) / `22px` (`28px`) | Bold (`700`) / Semibold (`600`) | `-0.02em` |
| **headline-md** | `18px` (line-height `24px`) | Semibold (`600`) | `-0.01em` |
| **title-price** | `20px` (line-height `26px`) | Bold (`700`) | `-0.02em` (cifre tabulari `tnum`) |
| **body-lg** | `16px` (line-height `24px`) | Regular (`400`) | Normal |
| **body-md** | `14px` (line-height `20px`) | Regular (`400`) | Normal |
| **body-sm** | `12px` (line-height `16px`) | Regular (`400`) | Normal |
| **label-sm (Badge)** | `10px` (line-height `12px`) | Bold (`700`) | Uppercase, `+0.04em` |

---

## 4. Spaziature, Raggi di Curvatura & Ombre

### Spaziature (Griglia 8pt / 4pt)
- **Gutter feed annunci:** `0.75rem` (`12px`) su mobile, `1rem` (`16px`) su tablet/desktop.
- **Margine pagina:** `1rem` (`16px`) su mobile, `1.5rem` (`24px`) su schermi più ampi.
- **Padding interno card:** `0.75rem` (`12px`) per card compatte, `1rem` (`16px`) per card in evidenza.

### Arrotondamenti (Border Radius)
- **Card e contenitori principali:** `rounded-2xl` (`16px` / `1rem`) con `overflow-hidden` per ritaglio pulito delle immagini.
- **Pulsanti e campi di input:** `rounded-xl` (`12px` / `0.75rem`) per garantire zone di tocco ergonomiche.
- **Chip di categoria e badge:** `rounded-full` (`9999px`, stile pill).

### Elevazione & Ombre
- **Livello 1 (Card annunci):** Sfondo `#FFFFFF`, bordo `1px solid #E2E8F0`, ombra `0 1px 3px rgba(15, 23, 42, 0.04)`.
- **Livello 2 (CTA fluttuanti e Bottom Nav):** Ombra diffusa `0 10px 25px -5px rgba(37, 99, 235, 0.20)`.
- **Focus Box AI (Gemini):** Bordo tenue con sfumatura indaco/viola e glow esterno `0 0 0 1px rgba(99, 102, 241, 0.3)`.

---

## 5. Specifiche Componenti Chiave

### 1. Card Annuncio (`AnnuncioCard`)
- Immagine in aspect-ratio `1:1` o `4:5` in cima alla card con `overflow-hidden`.
- Badge categoria o stato posizionato in assoluto su `top: 8px`, `left: 8px`.
- Prezzo in evidenza (`title-price`) con supporto a `NULL` ("Prezzo da concordare").
- Titolo troncato su una riga, seguito da metadati (città / venditore) in `body-sm`.
- Pulsante preferito a forma di cuore con animazione di toggle.

### 2. Filtro Categorie (Chip orizzontali)
- Barra a scorrimento orizzontale su mobile senza scrollbar visibile.
- Pill inattiva: sfondo bianco, bordo `border-slate-200`, testo `text-slate-600`.
- Pill attiva: sfondo `bg-blue-600` (`#2563EB`), testo bianco `text-white`, senza bordo.

### 3. Assistente AI Gemini (`GeminiPromptModule`)
- Contenitore evidenziato con bordo gradiente (`#6366F1` → `#8B5CF6`) e sfondo traslucido `rgba(99, 102, 241, 0.03)`.
- Bottone CTA con icona "sparkle" e testo *"Migliora descrizione con AI"*.
- Badge di stato *"Generato con Gemini · Verifica i dettagli"*.

---

## 6. Configurazione per `tailwind.config.js`

Quando verrà inizializzato il frontend con Tailwind, configurare i token in `tailwind.config.js` estendendo il tema come segue:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8FAFC',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#2563EB', // Electric Cobalt
          hover: '#1D4ED8',
          light: '#DBE1FF',
        },
        ai: {
          indigo: '#6366F1',
          violet: '#8B5CF6',
        },
        'text-primary': '#0F172A',   // Slate 900
        'text-secondary': '#475569', // Slate 600
        'text-muted': '#94A3B8',     // Slate 400
        'border-subtle': '#E2E8F0',  // Slate 200
        'price-drop': '#EF4444',     // Crimson alert
        'badge-success': '#10B981',  // Emerald verified
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '1rem',    // 16px
        'input': '0.75rem', // 12px
      },
      boxShadow: {
        'card': '0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)',
        'floating': '0 10px 25px -5px rgba(37, 99, 235, 0.2), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
        'ai-focus': '0 0 0 1px rgba(99, 102, 241, 0.3), 0 4px 20px rgba(139, 92, 246, 0.12)',
      }
    },
  },
  plugins: [],
}
```

