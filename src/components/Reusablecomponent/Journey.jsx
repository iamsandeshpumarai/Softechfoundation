import React from 'react'
import { motion } from 'framer-motion'

const Journey = ({data}) => {
  console.log(data[0]?.journey?.items)
  return (
    <motion.div initial={{y:150}} whileInView={{y:0}} viewport={{once:true}} transition={{duration:0.5}} className='w-screen   md:from-[#EEF5FF] md:to-white lg:bg-white'>
      <h1 className='xl:mb-10 flex justify-center font-bold h-[90px] md:text-[30px] md:w-[100%] md:text-center md:font-medium text-[20px] text-center xl:text-[32px] xl:font-medium items-center'>{data[0]?.journey?.sectionTitle}</h1>
      <div className='xl:grid xl:grid-cols-4 xl:place-items-center w-full mx-auto md:grid md:grid-cols-2 grid grid-cols-1 place-items-center  '>

{
  data[0]?.journey?.items.map((data,index)=>{
    return <div key={index} className='xl:flex flex flex-col items-center mb-6  md:mb-8 xl:flex-col  xl:items-center md:flex md:justify-center md:flex-col md:items-center'>
    <div className='logo  '>
        <img src={data?.image} className='md:w-[140px] w-[80px]' alt="" />
    </div>
    <div className='title font-semibold mt-4 mb-4  xl:text-center xl:text-[19px] xl:w-[40%]'>{data?.title}</div>
    <div className=' xl:font-normal text-center w-[80%] font-light'>{data?.content}</div>
    </div>
    })
}      
    </div>
    </motion.div>
  )
}

export default Journey
