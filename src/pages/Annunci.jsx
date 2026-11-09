import ListaAnnunci from '../components/ListaAnnunci.jsx'
import annunciFinti from '../data/annunciFinti.js'

const Annunci = () => {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">Annunci</h1>
        <p className="max-w-2xl text-text-secondary">
          Elenco di prova: presto questi dati arriveranno dal backend, con ricerca, filtro per
          categoria e ordinamento per prezzo.
        </p>
        <p className="text-sm text-text-muted">{annunciFinti.length} annunci di prova</p>
      </div>

      <ListaAnnunci annunci={annunciFinti} />
    </section>
  )
}

export default Annunci
