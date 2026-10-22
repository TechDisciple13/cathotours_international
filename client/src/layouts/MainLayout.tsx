import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../sections/Footer'
import Navbar from './Navbar'

export default function MainLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
