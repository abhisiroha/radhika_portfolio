import React from 'react'

const SkillIcon = ({iconSrc, iconText}) => {
  return (
    <div className='flex flex-col gap-1 justify-center items-center bg-website-organge rounded-xl size-16 md:size-20'>
        <img src={iconSrc} className='size-8 md:size-10' />
        <h1 className='font-satoshi text-brown-font text-sm'>
            {iconText}
        </h1>
    </div>
  )
}

export default SkillIcon