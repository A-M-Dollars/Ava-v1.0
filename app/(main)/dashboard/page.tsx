'use client'

import React, { use } from 'react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter();
  const handleBotRedirect = () => {
    router.push('/Bot');
  }


  return (
    <div className='p-4 place-items-center justify-center flex flex-col'>
      <h1>This is the Dashboard</h1>
      <button 
      className='w-[300px] h-[50px] bg-black text-white font-light mt-4 cursor-pointer'
      onClick={handleBotRedirect}
      >
        Click here to the bot
      </button>
    </div>
  )
}

export default Dashboard