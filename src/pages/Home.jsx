import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="space-y-5">
      <p className="text-sm font-bold uppercase tracking-widest text-primary">Marketplace tra privati</p>
      <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-4xl">
        Benvenuto su Bacheca
      </h1>
      <p className="max-w-2xl text-base text-text-secondary">
        Compra e vendi oggetti vicino a te. Questa è la pagina iniziale del progetto: presto qui
        troverai gli annunci in evidenza e la ricerca.
      </p>
      <Link
        to="/annunci"
        className="inline-flex items-center rounded-input bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        Vai agli annunci
      </Link>
    </section>
  )
}

export default Home
