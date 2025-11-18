import { motion } from "framer-motion";
import { ScrollTop } from "../../Scroll";

const Ad = ({ data }) => {
  console.log(data.data,'is the ad')

  return (
    <>
   {data.index ==1 ? (
 <motion.div initial={{x:-200}} whileInView={{x:0}} viewport={{once:true}} transition={{duration:0.5}}  className="w-screen h-[70vh] mt-6 flex justify-center">
      {/* Text Section */}
      <div className="w-[60%] h-[70%] flex flex-col justify-center items-end">
        <div className="w-[80%] flex flex-col gap-4">
          <p className="text-[#006DEE] font-semibold">{data?.data?.head}</p>
          <h2 className="text-[40px] font-semibold leading-9">{data?.data?.semihead}</h2>
          <p>{data?.data?.content}</p>

          {/* 🌟 Animated Button */}
          <button 
          onClick={ScrollTop}
            className="w-[140px] h-[40px] rounded-md text-white bg-[#006DEE]
                       
                       transform transition-transform duration-300 ease-in-out
                       hover:scale-110 active:scale-95"
          >
          <a href="#home">Get Started</a> 
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="h-full w-[40%] flex justify-center">
        <img src={data?.data?.image} className="h-[75%]" alt="ad-banner" />
      </div>
    </motion.div>
   ): (
    <motion.div initial={{x:200}} viewport={{once:true}} transition={{duration:0.5}} whileInView={{x:0}} className="w-screen h-[60vh] mt-1 flex justify-center">
      {/* Image Section */}
      <div className="h-full w-[60%] flex justify-center">
        <img  src={data?.data?.image} className="h-[75%]" alt="ad-banner" />
      </div>

      {/* Text Section */}
      <div className="w-[50%] h-[70%] flex flex-col justify-center">
        <div className="w-[80%] flex flex-col gap-4">
          <p className="text-[#006DEE] font-semibold">{data?.data?.head}</p>
          <h2 className="text-[40px] font-semibold leading-9">{data?.data?.semihead}</h2>
          <p>{data?.data?.content}</p>

          {/* 🌟 Animated Button */}
          <button onClick={ScrollTop}
            className="w-[140px] h-[40px] rounded-md text-white bg-[#006DEE]
            
            transform transition-transform duration-300 ease-in-out
            hover:scale-110 active:scale-95"
            >
            {data?.index == 0 ? "See it in Action" :"Get Started"}
          </button>
        </div>
      </div>
    </motion.div>

   )
      }
    
            </>
  );
};

export default Ad;
