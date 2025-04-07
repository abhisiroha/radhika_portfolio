import React from 'react'
import Marquee from './marquee'
import { DecoderText } from './DecoderText'
import Lanyard from './Lanyard/Lanyard'
import RotatingText from './RotatingText'
import Button from './Button'
import SkillIcon from './SkillIcon'



const Hero = () => {
  return (
    <div id='home' className='relative h-dvh w-screen overflow-hidden items-center justify-center'>
      <div className='absolute flex flex-col gap-8 bottom-0 md:top-1/4 left-0 md:left-1/12 w-full md:w-1/2 items-left md:items-start px-4'>
        <h1 className='text-3xl md:text-6xl font-satoshi font-bold text-left z-10'>
          <h1 className='text-2xl '> Hi,</h1>
          <DecoderText text="I am Radhika" delay={500} />
        </h1>
        <div className='flex items-center justify-start gap-2 '>
          <p className='text-black text-lg md:text-3xl  font-satoshi'>Creative</p>
          <RotatingText
            texts={['Thinker', 'Designer', 'Painter', 'Researcher']}
            mainClassName="text-highlist-organge text-lg md:text-3xl font-bold font-satoshi overflow-hidden justify-center item-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "10%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000} />
        </div>

        <div className='flex gap-2 md:gap-4  '>
          <SkillIcon iconSrc={"icons/figma.svg"} iconText={"Figma"}/>
          <SkillIcon iconSrc={"icons/illustrator.svg"} iconText={"Illustrator"}/>
          <SkillIcon iconSrc={"icons/googleAnalytics.svg"} iconText={"Analytics"}/>
          <SkillIcon iconSrc={"icons/framer.svg"} iconText={"Framer"}/>
          <SkillIcon iconSrc={"icons/notion.svg"} iconText={"Notion"}/>
        </div>

        <Button buttonTitle={`Let's Connect`} />

      </div>
      <div className='absolute top-0 z-0 h-full w-full left-0 '>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} fov={20} xPos={3} />
      </div>
      <div className='absolute top-0 z-0 h-full w-full left-0 md:hidden'>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} fov={20} xPos={0} yPos={5} />
      </div>
      {/* <div className='absolute bottom-0 w-screen overflow-hidden'>
        <Marquee />
      </div> */}
    </div>
  )
}

export default Hero