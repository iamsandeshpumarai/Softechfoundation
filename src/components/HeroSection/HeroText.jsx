import { CheckIcon } from '@heroicons/react/24/solid';
import { aiAgentBenefits, clientLogo } from '../../data/content';
import { motion } from 'framer-motion';


const HeroText = () => {
  return (
    <motion.div initial={{x:-300}} animate={{x:0}} transition={{duration:0.5}} className=' h-full bg-gradient-to-r from-[#EFF6FF] to-white   flex flex-col items-center justify-between '>
        <div className=' w-full flex flex-col items-center '>
            {/* brand  */}
             <div className='headtext text-[40px] text-center md:text-[58px] mb-8 md:leading-[60px] sm:text-[55px] sm:leading-[55px] sm:text-center md:text-left font-extrabold mt-4'>
<h1>Build Powerful</h1>
<h1>Conversational <span className='text-[#006dee]'>AI Agents</span>  </h1>
<h1 className='text-[#006dee]'>for Enterprise-Scale</h1>
      </div>

<div className='md:ml-28 '>
    {aiAgentBenefits.map((data,index)=>{
return <div className='flex gap-2  mt-2 ' key={index}>  <div className='sm:mt-4 sm:w-5 sm:h-5 w-4 h-4 mt-3  bg-white border-2 border-blue-500 rounded-full flex items-center justify-center'>
  

             <CheckIcon className="sm:w-3 w-4 h-3 sm:h-4 text-blue-500" />
  
             
</div> <span className='sm:text-[16px] text-[16px] leading-8 sm:leading-[40px]'>{data}</span> </div>

    })}

      </div>
        </div>
      {/* brand logo  */}
      <div className='mb-3 brandslogo  w-full flex flex-col justify-center items-center'>
<div className='md:w-[85%] md:ml-16 md:font-semibold hidden mt-6 mb-6 sm:flex sm:justify-start  md:flex md:justify-start'><p className='text-[20px]'>Trusted by Leading Brands</p> </div>
<div className='md:w-[85%] md:ml-16 sm:block hidden  border border-[#F7F9FB] shadow-md md:flex gap-4  bg-white h-[9vh]'>
<img className='sm:w-full sm:h-full ' src={clientLogo[0].img} alt="" />
</div>
      </div>
    </motion.div>
  )
}

export default HeroText
