import React from 'react'
import { Analytics } from '@vercel/analytics/react';
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import NavBar from './components/Navbar'


const App = () => {
  return (
    <main className='relative w-full overflow-x-hidden scroll-smooth'>
      <Hero/>
      <Projects/>
      <About/>
      <Contact/>
      <NavBar/>
      <Analytics />
    </main>
  )
}

export default App