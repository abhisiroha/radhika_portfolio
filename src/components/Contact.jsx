import React from 'react'

import ContactList from './ContactList'

const Contact = () => {

  return(
  <div id='contact' className='relative w-screen overflow-x-hidden p-12 md:px-56'>
    <div className='flex flex-row h-56 overflow-x-hidden bg-website-organge rounded-2xl md:px-6'>

      <div className='flex flex-col justify-start pt-4 px-4 gap-4'>
        <h1 className='text-xl md:text-5xl text-brown-font'>raadhikamehtaa@gmail.com</h1>
        <ContactList iconSrc="icons/linkedin.svg" iconText='Linkedin' link='https://www.linkedin.com/in/radhika-mehta-b25726171/'/>
        <ContactList/>
        <ContactList iconSrc='icons/resume.svg' iconText='Resume' link='https://drive.google.com/file/d/1Lt9lvNS-ZxqNVb4ETx6LLrrbu2lALGfG/view?usp=sharing'/>

      </div>
      <div className='absolute right-8 md:right-32'>
        <img src="images/cat.gif" className='size-40 md:size-48' />
      </div>
    </div>
  </div>
  )
}

export default Contact