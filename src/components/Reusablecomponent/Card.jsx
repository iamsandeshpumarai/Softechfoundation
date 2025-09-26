import React from 'react'
import Text from './Text'
import { Banners } from '../../data/content'
import { motion } from 'framer-motion'


const Card = () => {
  return (
    <motion.div initial={{opacity:0}}  whileInView={{opacity:1}} transition={{duration:1}} className='md:hidden sm:flex sm:flex-col sm:items-center '>
        {
Banners.map((data,index)=>{
    return <>
         <Text classname= {`${index>=1 ? 'mt-8':"" } w-screen h-[10vh] md:hidden`} heading={data.quote} text={data.subheading} textclass="text-center font-bold text-[17px]" headingclass="text-blue-600 text-center font-semibold" />
      <div className='BannerImage  h-[70%]  object-fill'>
<img src={data.img} className='sm:h-[450px]' alt="" />
      </div>
      <div className='BannerText'>
<div className='mt-3'>
 <p className='text-[16px] text-center font-normal'>{data.text}</p>
</div>
<div className='w-screen flex justify-center mt-6'>
    <button className='bg-[#006DEE] text-white flex items-center h-[35px] justify-center w-[95%] rounded-sm'>See it in Action</button>
</div>
      </div>
    </>
})
        }
    
    </motion.div>
  )
}

export default Card
