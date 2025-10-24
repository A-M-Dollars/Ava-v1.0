'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const Landing = () => {
  const router = useRouter();
  const handleLoginRedirect = () => {
    router.push('/stafflogin');
  }
  return (
    <div className='p-4 place-items-center justify-center flex flex-col'>
        <h1>This is a landing page</h1>
        <button
        className='bg-black font-light text-white w-[300px] h-[50px] mt-4 cursor-pointer'
        onClick={handleLoginRedirect}
        >Login into your Account</button>
    </div>
  )
}

export default Landing