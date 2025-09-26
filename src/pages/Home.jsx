import HeaderLogo from '../components/HeaderLogo'
import Herosection from '../components/HeroSection/Herosection'
import Info from '../components/Testimonial'
import Card from '../components/Reusablecomponent/Card'
import Journey from '../components/Reusablecomponent/Journey'
import Text from '../components/Reusablecomponent/Text'
import StatCard from '../components/StatCard'
import Footer from '../components/Footer'
import Ad from '../components/Reusablecomponent/Ad'
import { Ad2d, Banners2 } from '../data/content'
import Ad2 from '../components/Ad2'





const Home = () => {
  return (
    
    <div id="home" className='overflow-x-hidden'>

      <HeaderLogo/>
      <Herosection/>
 <Text heading="Drive Measurable Business Impact" headingclass="text-black font-bold text-[22px]  md:font-font-semibold md:text-[32px]"  text="with Intelligent Virtual Agents" textclass="text-black hidden sm:block text-[17px]" classname=" text-center h-[15vh] md:h-[25vh] flex flex-col  justify-center"/>
    <StatCard/>
    <Card/>
    <div className='md:block hidden'>

 <Ad  img={Banners2[0].img} btntext={Banners2[0].btntext} subheading={Banners2[0].subheading} quote={Banners2[0].quote} text={Banners2[0].text} />
 
  <Ad2 img={Ad2d.img} btntext={Ad2d.btntext} subheading={Ad2d.subheading} quote={Ad2d.quote} text={Ad2d.text}/>
 <Ad  img={Banners2[1].img} btntext={Banners2[1].btntext} subheading={Banners2[1].subheading} quote={Banners2[1].quote} text={Banners2[1].text} />     

    </div>
      


   <Journey/>
   <div className='bg-gradient-to-r from-[#EEF5FF] to-white'>

   <Info/>
<Footer/>
   </div>
    </div>
    
  )
}

export default Home
