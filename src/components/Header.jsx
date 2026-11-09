import { NavLink } from 'react-router-dom'
import { Heart, PlusCircle, Store } from 'lucide-react'

const classeLink = ({ isActive }) =>
  `flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? 'bg-primary text-white'
      : 'text-text-secondary hover:bg-primary-light hover:text-primary'
  }`

const Header = () => {
  return (
    <header className="border-b border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <NavLink to="/" end className="flex items-center gap-2 text-lg font-bold text-text-primary">
          <Store className="h-5 w-5 text-primary" aria-hidden="true" />
          Bacheca
        </NavLink>

        <nav className="flex flex-wrap items-center gap-1" aria-label="Navigazione principale">
          <NavLink to="/annunci" className={classeLink}>
            Annunci
          </NavLink>
          <NavLink to="/pubblica" className={classeLink}>
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Pubblica
          </NavLink>
          <NavLink to="/preferiti" className={classeLink}>
            <Heart className="h-4 w-4" aria-hidden="true" />
            Preferiti
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
