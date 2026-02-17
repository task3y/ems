import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
  const {user} = useAuth()

  return (
    <div className='bg-gray-100 border-b border-gray-200 px-8 py-4'>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Welcome {user.username}</p>
        <button className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition">Logout</button>
      </div>
    </div>
  )
}

export default Navbar;