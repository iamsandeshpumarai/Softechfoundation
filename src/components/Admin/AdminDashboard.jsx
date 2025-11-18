// AdminDashboard.jsx
import React, { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {  useQuery} from '@tanstack/react-query'
import axios from 'axios'
import Userdetails from './Userdetails'



const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const location = useLocation()
  const { data=[],isLoading,isError } = useQuery({
    queryKey: ['userdetails'],
    queryFn: async () => {
      const res = await axios.get('https://softechbackend-2.onrender.com/admin/userdata', { withCredentials: true })
      return res.data
    },
    onSuccess:(data)=>{
console.log(data)
    }
  })

 

  const toggleSidebar = () => setSidebarOpen((prev) => !prev)

  const navLinks = [
    { name: 'Users', short: 'U', path: '/admindashboard' },
    { name: 'Analytics', short: 'A', path: '/admindashboard/chart' },

    { name: 'EditPanel', short: 'A', path: '/admindashboard/EditPanel' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className={`font-bold text-lg ${sidebarOpen ? 'block' : 'hidden'}`}>Admin</h1>
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white transition"
          >
            {sidebarOpen ? '«' : '»'}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`
              }
            >

              {sidebarOpen ? link.name : link.short}
            </NavLink>
          ))}
        </nav>

        {/* Logout button inside sidebar (optional) */}
    
      </aside>
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
       
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          {isLoading && <p className="text-gray-500">Loading user data...</p>}
          {isError && (
            <p className="text-red-500">Failed to load data. Please try again.</p>
          )}

          {/* Default route shows user details */}
          {location.pathname === '/admindashboard' && (
            <Userdetails userData={data?.userdata} />
          )}

          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t text-center py-3 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Admin Dashboard
        </footer>
      </div>
    </div>
  )
}

export default AdminDashboard
