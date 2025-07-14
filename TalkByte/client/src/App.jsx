import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { getUser } from './store/slices/auth.slice';
import { connectSocket } from './lib/socket';
import {Loader} from 'lucide-react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
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
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App