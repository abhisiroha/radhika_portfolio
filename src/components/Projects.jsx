import React from 'react'
import { BentoCard, BentoTilt, BentoCardImage } from './Bento'
import { AnimatedTiles } from './AnimatedTiles'


const Projects = () => (
  <div id="work" className='h-screen w-full relative items-center overflow-x-hidden px-8 md:px-56 py-4 pt-8'>

    <div className='flex flex-col gap-2 pb-12'>
      <AnimatedTiles title="Selected Work" />
    </div>

    <div className='relative flex flex-col md:flex-row gap-12 items-center justify-center h-6/8'>
      <div className='h-full w-full'>
        <BentoTilt className="h-7/8 overflow-hidden rounded-md">
          <BentoCard 
          link="https://medium.com/design-bootcamp/boosting-adoption-rate-by-35-a-ux-case-study-on-milestone-driven-rewards-for-kirana-stores-febb58e7c540"
          buttonText='Case Study'
          vidLink="videos/app_new.mp4"
          />
        </BentoTilt>
        <p className="bento-title pt-4 text-pretty">Boosting adoption rate by 35%: A UX case study on milestone-driven rewards for kirana stores</p>
      </div>

      <div className='h-full w-full'>
        <BentoTilt className="h-7/8 overflow-hidden rounded-md">
          <BentoCardImage
          buttonText='Research'
          link='https://medium.com/design-bootcamp/designing-for-bharat-a-field-guide-to-inclusive-ux-in-rural-agri-tech-ecosystems-in-india-14a22fc42112'
          vidLink='images/case_research.webp'
          />
        </BentoTilt>
        <p className="bento-title pt-4 text-pretty">The Bharat UX Field Guide</p>
      </div>
    </div>

  </div>
)

export default Projects