import React from 'react'

const Contact = () => {
  return (
    <div className='relative w-screen overflow-x-hidden p-8 md:px-32'>
      <div className=' flex flex-col md:flex-row justify-evenly h-80 items-center overflow-x-hidden bg-pink-300 rounded-2xl'>
        <img src="images/cat.gif" className='size-40 md:size-64' />
        <h1 className='text-xl md:text-4xl font-bold font-dream-avenue'>Let's connect...</h1>
        <div className='flex gap-4'>
          <img src="icons/instagram.svg" className='size-10' />
          <img src="icons/linkedin.svg" className='size-10' />
          <img src="icons/email.svg" className='size-10' />
        </div>
      </div>
    </div>
  )
}

export default Contact