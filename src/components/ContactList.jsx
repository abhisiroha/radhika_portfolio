import React from 'react'
import { MdCallMade } from 'react-icons/md'

const ContactList = ({iconSrc="icons/medium.svg", iconText="Medium", link="https://medium.com/@raadhikamehtaa"}) => {
    const handleClick = () => {
        window.open(link);
      };
  return (
    <div onClick={handleClick} className='flex flex-row gap-4 items-center text-highlist-organge cursor-pointer'>
              <img src={iconSrc} className='size-8' />
              <h1>{iconText}</h1>
              <MdCallMade />
            </div>
  )
}

export default ContactList