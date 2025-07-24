import { BotMessageSquare, Eye, EyeOff, Loader, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { login } from '../store/slices/auth.slice';

const Login = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:""
  });
  const {isLoggingIn}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  }
  return (
    <>
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white '>
      {/* Left side */}
      <div className='flex flex-col items-center justify-center px-6 py-12'>
        <div className='w-full max-w-md'>
          {/* logo& heading */}
          <div className='flex flex-col items-center text-center mb-6'>
            <div className='bg-black p-3 rounded-md'>
              <BotMessageSquare className='text-white  w-6 h-6' />
            </div>
            <h1 className='text-2xl'>Welcome Back</h1>
            <p className='text-gray-500 text-sm mt-2'>Sign in to you account</p>
          </div>


          {/* login form */}
          <form className='space-y-6' onSubmit={handleLogin}>
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>Email</label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2  -translate-y-1/2 text-gray-600'>
                  <Mail className='w-5 h-5 text-gray-500' />
                </span>
                <input className='w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none' type="email" placeholder='yourmail@example.com' onChange={(e)=>{
                  setFormData({...formData,email:e.target.value});
                }} value={formData.email} />
              </div>
            </div>
                        <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>Password</label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2  -translate-y-1/2 text-gray-600'>
                  <Lock className='w-5 h-5 text-gray-500' />
                </span>
                <input className='w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none' type={showPassword ?"text":"password"} placeholder='password' onChange={(e)=>{
                  setFormData({...formData,password:e.target.value});
                }} value={formData.password} />
                <button type='button' className='absolute right-3 top-1/2 text-gray-400 -translate-y-1/2' onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? (<EyeOff className='w-5 h-5' />) : (<Eye className='w-5 h-5' />)}
                </button>
              </div>
            </div>
            <button type='submit' disabled={isLoggingIn} className='w-full bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-800 transition duration-100 flex justify-center items-center'>{
              isLoggingIn?(<><Loader className='animate-spin size-5' /> Loading...</>):("Login")
              }</button>
          </form>
          <div className='mt-6 text-center text-gray-500'>
            <p className='text-sm'>
              Don&apos;t have an account? <Link to="/register" className='text-blue-500 hover:underline'>Sign Up</Link>
            </p>
          </div>


        </div>
      </div>

      <AuthImagePattern title="TalkByte" subtitle="Connect with your friends and the world around you." />

    </div>
    </>
  )
}

export default Login