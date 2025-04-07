import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import NavBar from './components/Navbar'

const App = () => {
  return (
    <main className='relative w-full overflow-x-hidden'>
      
      <Hero/>
      <Projects/>
      <About/>
      <Contact/>
      <NavBar/>
    </main>
  )
}

export default App