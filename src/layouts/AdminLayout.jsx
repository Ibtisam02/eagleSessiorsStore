import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/adminComponents/SideBar'

function AdminLayout() {
  return (
    <div className='flex'>
      <SideBar/>
    <main>
      <Outlet/>
    </main>
    </div>
  )
}

export default AdminLayout