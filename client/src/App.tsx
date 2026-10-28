import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ContentPage from './pages/ContentPage'
import Edition from './pages/Edition'
import Editions from './pages/Editions'
import { pages } from './config/pages'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Partners from './pages/Partners'
import Privacy from './pages/Privacy'
import Register from './pages/Register'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="inscription" element={<Register />} />
          <Route path="politique-de-confidentialite" element={<Privacy />} />
          <Route path="partenaires" element={<Partners />} />
          {pages.map((p) => (
            <Route key={p.path} path={p.path.slice(1)} element={p.kind === 'editions' ? <Editions page={p} /> : <ContentPage page={p} />} />
          ))}
          <Route path="editions/:slug" element={<Edition />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}