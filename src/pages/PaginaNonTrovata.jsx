import { Link } from 'react-router-dom'

const PaginaNonTrovata = () => {
  return (
    <section className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-primary">Errore 404</p>
      <h1 className="text-3xl font-bold tracking-tight text-text-primary">Pagina non trovata</h1>
      <p className="max-w-md text-text-secondary">
        L&apos;indirizzo che hai aperto non esiste o è stato spostato.
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-input bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        Torna alla home
      </Link>
    </section>
  )
}

export default PaginaNonTrovata
