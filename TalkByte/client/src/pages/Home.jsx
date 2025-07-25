
import React from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

const Home = () => {
  const {selectedUser}=useSelector((state) => state.auth);
  return (
    <>
    <div className='min-h-screen bg-gray-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-white rounded-lg shadow-md w-full max-w-6xl  h-[calc(100vh-80rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser?<NoChatSelected />:<ChatContainer />}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home;
