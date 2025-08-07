import React from 'react'
import Style from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout({setSearch}) {
  return (
   <>
   
   <div className='flex flex-col justify-between min-h-screen '>
    <Navbar setSearch={setSearch}/>

    <div className='mt-30'>
      <Outlet></Outlet>

    </div>
    <Footer/>
   </div>
   
   
   
   </>
  )
}
