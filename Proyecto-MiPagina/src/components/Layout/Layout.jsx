import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'
function Layout() {
  return (
 <>
    <Menu/>
    
    <Header />
    
    <main>
        {/* Outlet integra cualquier componente que visites */}
    <Outlet/>
    </main>
    
    <Footer />
    </>
  )
}

export default Layout