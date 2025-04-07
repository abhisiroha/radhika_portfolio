import React from 'react'
import Marquee from './marquee'
import { DecoderText } from './DecoderText'
import Lanyard from './Lanyard/Lanyard'
import RotatingText from './RotatingText'



const Hero = () => (
  <div id='hero' className='relative h-dvh w-screen overflow-hidden items-center justify-center'>
    <div className='absolute flex flex-col gap-4 bottom-1/8 md:top-1/4 left-0 md:left-1/12 w-full md:w-1/2 items-center md:items-start '>
      <h1 className='text-4xl md:text-6xl font-satoshi text-center uppercase z-10'>
        <DecoderText text="Hi I am Radhika" delay={500} />
      </h1>
      <div className='flex items-center justify-start gap-2 '>
        <p className='text-black text-2xl font-satoshi'>Creative</p>
        <RotatingText
        texts={['Thinker', 'Designer', 'Painter', 'Researcher']}
        mainClassName=" text-black text-2xl md:text-4xl font-bold font-dream-avenue bg-highlist-organge overflow-hidden justify-center item-center rounded-lg w-50 pt-2"
        staggerFrom={"last"}
        initial={{ y: "10%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={2000} />
      </div>
      <p className='text-2xl text-center md:text-start font-satoshi'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed voluptatibus, adipisci hic inventore
      </p>
      
    </div>
    <div className='absolute top-0 z-0 h-full w-full left-0 '>
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} fov={20} xPos={3}/>
    </div>
    <div className='absolute top-0 z-0 h-full w-full left-0 md:hidden'>
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} fov={20} xPos={0} yPos={5}/>
    </div>
    <div className='absolute bottom-0 w-screen overflow-hidden'>
      <Marquee />
    </div>
  </div>
)

export default Hero