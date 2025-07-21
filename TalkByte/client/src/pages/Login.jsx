import React from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const handleToast = () => {
    toast.success('Login successful!');
  }
  return (
    <div className='bg-gray-950 w-full min-h-screen text-white pt-20 px-8'>

      <button onClick={handleToast} className='px-5 py-2 bg-yellow-600'>CheckToast</button>
    </div>
  )
}

export default Login