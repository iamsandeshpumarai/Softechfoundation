import React from 'react'
import HeroText from './HeroText'
import HeroForm from './HeroForm'

const Herosection = () => {
  return (
    <div className='md:grid  sm:flex flex-col w-screen md:grid-cols-[60%_40%]'>
      <HeroText/>
      <HeroForm/>
    </div>
  )
}

export default Herosection
