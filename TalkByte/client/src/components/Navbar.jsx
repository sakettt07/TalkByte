import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const {user}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  const handleLogout = () => {
    console.log("You are logging out");
  }
  return (
    <header className='py-4 px-8 fixed top-0 w-full backdrop-blur-md bg-white/10 text-white z-50 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>
          {/* left logo */}
          <div className='flex items-center gap-8'></div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
