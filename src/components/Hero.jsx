import React from 'react'
import Marquee from './marquee'
import DisplacementSphere from './DisplacementSphere'

const Hero = () => {
  return (
    <div className='relative h-dvh w-screen overflow-x-hidden' id='hero'>

      <div className='-z-10'>
        <DisplacementSphere 
          scale={32}
          // position={{ x: 22, y: 16, z: 0 }}
          color="#ffffff"
          detail={128}
          rotationSpeed={0.001}
          distortionSpeed={0.00005}
          reduceMotion={false}
        />
      </div>
      
      <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-24 px-8 overflow-hidden'>
        <div className='flex relative justify-center h-64 md:size-80 w-64 md:w-80 overflow-hidden'>
          <img src='images/profile.webp' className='size-64 md:size-80 rounded-sm shadow-2xl overflow-hidden'/>
        </div>
        <div className='flex flex-col gap-2 justify-center md:w-xl overflow-hidden'>
          <p className='text-2xl md:text-2xl font-noto-sans'>Hi I am Radhika</p>
          <p className='text-4xl md:text-6xl font-dream-avenue'>A Curious Solution Crafter</p>
          <p className='text-2xl md:text-2xl font-noto-sans'>I believe in constantly evolving, turning every challenge into a canvas and every experience into a masterpiece.</p>
        </div>
      </div>
      <div className='absolute bottom-0 w-screen overflow-hidden'>
        <Marquee/>
      </div>
    </div>
  )
}

export default Hero