import React from 'react'
import { BentoCard, BentoTilt } from './Bento'

const Projects = () => {
  return (
    <div className='relative overflow-x-hidden px-8 md:px-32 pt-8'>

      <div className='flex flex-col gap-2 pb-8'>
        <h1 className='text-2xl md:text-4xl font-bold font-noto-sans'>Selected Work</h1>
        <p className='font-satoshi overflow-hidden'>Have a look around some of my selected projects that created impact.</p>
      </div>

      <BentoTilt className="relative  w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/cat.mp4"
          url={"https://www.youtube.com"}
          title={
            <>
              Lorem ipsum
            </>
          }
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis quas repellendus sit dolore tempore in, nobis ex temporibus deserunt illo sunt a debitis nulla sint molestiae illum cum excepturi!"
        />
      </BentoTilt>

    </div>
  )
}

export default Projects