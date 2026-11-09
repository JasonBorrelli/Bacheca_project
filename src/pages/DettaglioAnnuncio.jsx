import { Link, useParams } from 'react-router-dom'

const DettaglioAnnuncio = () => {
  const { id } = useParams()

  return (
    <section className="space-y-4">
      <Link to="/annunci" className="text-sm font-semibold text-primary hover:text-primary-hover">
        Torna agli annunci
      </Link>
      <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
        Annuncio #{id}
      </h1>
      <p className="max-w-2xl text-text-secondary">
        Qui compariranno descrizione, prezzo, categoria, venditore e tag dell&apos;annuncio.
      </p>
      <div className="rounded-card border border-border-subtle bg-surface p-6 text-sm text-text-muted shadow-card">
        Dettaglio in arrivo.
      </div>
    </section>
  )
}

export default DettaglioAnnuncio
