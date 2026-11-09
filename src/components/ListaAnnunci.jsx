import AnnuncioCard from './AnnuncioCard.jsx'

const ListaAnnunci = ({ annunci }) => {
  if (!annunci || annunci.length === 0) {
    return (
      <div className="rounded-card border border-border-subtle bg-surface p-6 text-sm text-text-muted shadow-card">
        Nessun annuncio trovato.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {annunci.map((annuncio) => (
        <AnnuncioCard key={annuncio.id} annuncio={annuncio} />
      ))}
    </div>
  )
}

export default ListaAnnunci
