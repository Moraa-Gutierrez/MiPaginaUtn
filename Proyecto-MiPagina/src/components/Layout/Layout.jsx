import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Menu from './Menu'
function Layout() {
  return (
 <>
    <Menu/>

    
    <main>
        {/* Outlet integra cualquier componente que visites */}
    <Outlet/>
    </main>
    
    <Footer />
    </>
  )
}

export default Layout