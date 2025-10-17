import React from 'react'
import NavPrivate from './components/private/NavPrivate'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  return (
    <>
    <NavPrivate/>
    <Outlet/>

    </>
  )
}

export default PrivateLayout