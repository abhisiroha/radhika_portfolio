import React from 'react'

const SkillIcon = ({iconSrc, iconText}) => {
  return (
    <div className='flex flex-col gap-1 justify-center items-center bg-website-organge rounded-3xl size-16 md:size-20'>
        <img src={iconSrc} className='size-6 md:size-8' />
        <h1 className='font-satoshi text-brown-font text-xs md:text-lg'>
            {iconText}
        </h1>
    </div>
  )
}

export default SkillIcon