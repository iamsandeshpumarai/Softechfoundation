import React from 'react'
import { testimonialData } from '../data/content'
import { motion } from 'framer-motion'

const Testimonial = () => {
  return (
    <motion.div initial={{y:150}} whileInView={{y:0}} viewport={{once:true}} transition={{duration:0.5}} className='xl:bg-gradient-to-r from-[#EEF5FF] mb-5'>
      
   <div className="flex flex-col justify-center  w-[90%] mx-auto mt-10">
  <p className="md:font-medium text-center para font-bold text-[20px] xl:font-medium md:text-[32px] leading-2">
    
  
    Haptik has been pivotal in helping us explore the various
    engagement opportunities that come with an AI-powered chatbot, and giving us a competitive advantage in our mission to drive exceptional customer experiences at scale

  </p>

<div className='author  w-full  h-[150px] flex justify-center items-center'>
<img src={testimonialData.img} className='w-[68px] xl:w-[90px] xl:h-[90px] md:w-[100px] md:h-[100px] mr-3 h-[68px] ' alt="" />
<div className='info h-full  flex flex-col justify-center'>
<p className='font-bold  xl:font-medium md:text-[27px]'>{testimonialData.name}</p>
<p className='md:text-[17px]'>{testimonialData.position}</p>
<img src={testimonialData.logo} className='w-[120px]' alt="" />
</div>

</div>

</div>

    </motion.div>
  )
}

export default Testimonial
