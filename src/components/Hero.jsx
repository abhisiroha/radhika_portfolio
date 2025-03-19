import React,{ useState, useEffect, useRef } from 'react'
import BIRDS from 'vanta/dist/vanta.birds.min'
import Marquee from './marquee'

const Hero = () => {
  const [vantaEffect, setVantaEffect] = useState(null)
  const animation = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(BIRDS({
        el: animation.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xffffff,
        color1: 0x2b00ff,
        color2: 0xff00b4,
        wingSpan: 20.00,
        speedLimit: 3.00,
        separation: 100.00,
        alignment: 50.00,
        quantity: 3.00
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div ref={animation} className='relative h-dvh w-screen overflow-x-hidden' id='hero'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-24 px-8 overflow-hidden'>
        <div className='flex relative justify-center h-64 md:size-80 w-64 md:w-80 overflow-hidden'>
          <img src='images/profile.webp' className='size-64 md:size-80 rounded-sm z-10 shadow-2xl overflow-hidden'/>
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