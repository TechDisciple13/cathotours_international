import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ComingSoon from './pages/ComingSoon'
import { plannedRoutes } from './config/routes'
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
          {plannedRoutes.map((path) => (
            <Route key={path} path={path} element={<ComingSoon />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
