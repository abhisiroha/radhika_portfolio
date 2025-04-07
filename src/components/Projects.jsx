import React from 'react'
import { BentoCard, BentoTilt } from './Bento'
import { AnimatedTiles } from './AnimatedTiles'


const Projects = () => {

  return (
    <div id="work" className='h-dvh w-full relative items-center overflow-x-hidden px-8 md:px-32 pt-20'>

      <div className='flex flex-col gap-2 pb-4'>
        <AnimatedTiles title="Selected Work"/>
      </div>

      <div className='relative flex flex-col md:flex-row gap-12 items-center justify-center h-7/8'>
        <BentoTilt className="h-1/2 md:h-full w-full md:w-1/2 overflow-hidden rounded-md">
          <BentoCard
            src=""
            url={"https://www.youtube.com"}
            title={
              <>
                Case Study
              </>
            }
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis quas repellendus sit dolore tempore in, nobis ex temporibus deserunt illo sunt a debitis nulla sint molestiae illum cum excepturi!"
          />
        </BentoTilt>
        <BentoTilt className="h-1/2 md:h-full w-full md:w-1/2 overflow-hidden rounded-md">
          <BentoCard
            src=""
            url={"https://www.youtube.com"}
            title={
              <>
                Rsearch
              </>
            }
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis quas repellendus sit dolore tempore in, nobis ex temporibus deserunt illo sunt a debitis nulla sint molestiae illum cum excepturi!"
          />
        </BentoTilt>
      </div>

    </div>
  )
}

export default Projects