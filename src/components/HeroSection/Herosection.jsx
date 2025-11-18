import React from 'react'
import HeroText from './HeroText'
import HeroForm from './HeroForm'

const Herosection = ({data}) => {
  console.log(data,"is the headsection")
  return (
    <div className='md:grid  sm:flex flex-col w-screen md:grid-cols-[60%_40%]'>
      <HeroText data={data}/>
      <HeroForm/>
    </div>
  )
}

export default Herosection
