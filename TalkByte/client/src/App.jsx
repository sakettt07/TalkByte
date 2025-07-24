import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { getUser, setOnlineUsers } from './store/slices/auth.slice';
import { connectSocket, disconnectSocket } from './lib/socket';
import {Loader} from 'lucide-react';
import {BrowserRouter as Router,Route,Routes, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';
import toast,{Toaster} from 'react-hot-toast';
const App = () => {
  const {user,isCheckingAuth}=useSelector((state)=>state.auth);

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUser());
  },[getUser]);


  useEffect(()=>{
    if(user){
      const socket=connectSocket(user._id);
      socket.on("getOnlineUsers",(users)=>{
        dispatch(setOnlineUsers(users));
      })
      return ()=>disconnectSocket();
    }
  },[user]);

  if(isCheckingAuth&& !user){
    return <div className='w-full h-screen bg-gray-950 flex justify-center items-center'>
      <Loader className='animate-spin size-10' />
    </div>
  }
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={user?<Home />:<Navigate to={"/login"} />} />
        <Route path='/register' element={!user?<Register />:<Navigate to={"/"} />} />
        <Route path='/login' element={!user?<Login />:<Navigate to={"/"} />} />
        <Route path='/profile' element={user?<Profile />:<Navigate to={"/login"} />} />
      </Routes>
      <Toaster position="top-center"
      reverseOrder={false} />
    </Router>
    </>
  )
}

export default App