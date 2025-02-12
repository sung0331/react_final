import React from 'react'
import Header from './Header'

import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import "./Header.css";
function Layout({footermessage}) {
  return (
    <div>
        <Header/>
        <div className='main_content'>
          <Navbar/>
          <Outlet/>
        </div>
        <Footer message={footermessage}/>
    </div>
  )
}

export default Layout