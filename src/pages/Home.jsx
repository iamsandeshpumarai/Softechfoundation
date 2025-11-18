import HeaderLogo from '../components/HeaderLogo'
import Herosection from '../components/HeroSection/Herosection'
import Info from '../components/Testimonial'
import Journey from '../components/Reusablecomponent/Journey'
import Text from '../components/Reusablecomponent/Text'
import StatCard from '../components/StatCard'
import Footer from '../components/Footer'
import Ad from '../components/Reusablecomponent/Ad'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Toaster } from "react-hot-toast";




const Home = () => {
       const { data = [] } = useQuery({
    queryKey: ['dataheading'],
    queryFn: async () => {
      const res = await axios.get('https://softechbackend-2.onrender.com/content/getcontent');
      return res?.data?.data;
    },
  });
  console.log(data," this is the website content")

  return (
    
    <div id="home" className='overflow-x-hidden'>
 <Toaster
        position="top-center"   // 👈 notification will appear from TOP
        reverseOrder={false}
      />
      <HeaderLogo/>
      <Herosection data={data}/>
 <Text  data={data} headingclass="text-black font-bold text-[22px]  md:font-font-semibold md:text-[32px]"  text="with Intelligent Virtual Agents" textclass="text-black hidden sm:block text-[17px]" classname=" text-center h-[15vh] md:h-[25vh] flex flex-col  justify-center"/>
    <StatCard data={data}/>
    
    <div className='md:block hidden'>

{data[0]?.ads.map((data,index)=>(
  
 <Ad data={{data,index}} key={index} />
))
 
  
 }     

    </div>
      


   <Journey data={data}/>
   <div className='bg-gradient-to-r from-[#EEF5FF] to-white'>

   <Info data={data}/>
<Footer data={data}/>
   </div>
    </div>
    
  )
}

export default Home
