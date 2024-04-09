import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="w-full flex flex-col items-center select-none">

        <Outlet/>
        
    </div>
  )
}

export default AdminDashboard