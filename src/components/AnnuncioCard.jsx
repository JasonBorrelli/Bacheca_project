import { Link } from 'react-router-dom'
import { Store } from 'lucide-react'
import { formattaPrezzo } from '../utils/formattaPrezzo.js'

const AnnuncioCard = ({ annuncio }) => {
  return (
    <article className="overflow-hidden rounded-card border border-border-subtle bg-surface shadow-card">
      <Link
        to={`/annunci/${annuncio.id}`}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="relative aspect-square overflow-hidden bg-primary-light">
          {annuncio.immagine ? (
            <img
              src={annuncio.immagine}
              alt={annuncio.titolo}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-primary">
              <Store className="h-10 w-10" aria-hidden="true" />
            </div>
          )}
          <span className="absolute left-2 top-2 rounded-full bg-surface/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            {annuncio.categoria}
          </span>
        </div>

        <div className="space-y-1 p-3">
          <h2 className="truncate text-base font-semibold text-text-primary">{annuncio.titolo}</h2>
          <p className="text-lg font-bold tabular-nums text-text-primary">
            {formattaPrezzo(annuncio.prezzo)}
          </p>
          <p className="text-xs text-text-secondary">{annuncio.venditore}</p>
        </div>
      </Link>
    </article>
  )
}

export default AnnuncioCard
