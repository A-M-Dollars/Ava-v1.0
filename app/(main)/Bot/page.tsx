import ChatSide from '@/components/bot/chat'
import ICDMOutput from '@/components/bot/icdm'
import QueryList from '@/components/bot/list'
import React from 'react'

const BotPage = () => {
  return (
    <div
    className='grid grid-cols-9 h-screen'
    >
      <div className='col-span-1 bg-[#242E22] text-[#E3E9E2]'>
        {/* Query Lists */}
        <QueryList />
      </div>
      <div className='col-span-5 bg-[#E3E9E2]'>
        {/* Chat Side */}
        <ChatSide />
      </div>
      <div className='col-span-3 bg-[#2A0B32] text-[#E3E9E2]'>
        {/* ICDM Output */}
        <ICDMOutput />
      </div>
    </div>
  )
}

export default BotPage