import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import Annunci from './pages/Annunci.jsx'
import DettaglioAnnuncio from './pages/DettaglioAnnuncio.jsx'
import PubblicaAnnuncio from './pages/PubblicaAnnuncio.jsx'
import Preferiti from './pages/Preferiti.jsx'
import PaginaNonTrovata from './pages/PaginaNonTrovata.jsx'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="annunci" element={<Annunci />} />
        <Route path="annunci/:id" element={<DettaglioAnnuncio />} />
        <Route path="pubblica" element={<PubblicaAnnuncio />} />
        <Route path="preferiti" element={<Preferiti />} />
        <Route path="*" element={<PaginaNonTrovata />} />
      </Route>
    </Routes>
  )
}

export default App
