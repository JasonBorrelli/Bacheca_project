const Preferiti = () => {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">Preferiti</h1>
      <p className="max-w-2xl text-text-secondary">
        Qui compariranno gli annunci salvati nel browser, con il contatore nell&apos;header.
      </p>
      <div className="rounded-card border border-border-subtle bg-surface p-6 text-sm text-text-muted shadow-card">
        Nessun preferito salvato.
      </div>
    </section>
  )
}

export default Preferiti
