import React from 'react'
import NavPublic from './components/public/NavPublic'
import { Outlet } from 'react-router-dom'
import Footer from './components/public/Footer'

const Layout = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <NavPublic />
      <Outlet/>
      <Footer/>
    </main>
  )
}

export default Layout
