 import { motion } from 'framer-motion'
import SoftechFoundationLogo from '../assets/images/softechfoundation.png'
 
 const HeaderLogo = () => {
   return (
     <motion.div initial={{opacity:0 }} animate={{opacity:1}} transition={{duration:0.5,ease:"easeOut"}}  className='w-screen sm:h-[25vh] sm:flex sm:justify-start bg-gradient-to-r from-[#EFF6FF] to-white '>
       <img  src={SoftechFoundationLogo} className='sm:w-[170px] w-[150px] ml-16 sm:h-[50px] mt-4 mb-5 lg:h-[45px]  sm:ml-32 sm:mt-5' alt="" />
     </motion.div>
   )
 }
 
 export default HeaderLogo
 