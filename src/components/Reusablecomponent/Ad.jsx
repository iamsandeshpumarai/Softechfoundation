import { motion } from "framer-motion";


const Ad = ({ img, btntext, subheading, quote, text }) => {
  return (
    <motion.div initial={{x:200}} viewport={{once:true}} transition={{duration:0.5}} whileInView={{x:0}} className="w-screen h-[60vh] mt-1 flex justify-center">
      {/* Image Section */}
      <div className="h-full w-[60%] flex justify-center">
        <img src={img} className="h-[75%]" alt="ad-banner" />
      </div>

      {/* Text Section */}
      <div className="w-[50%] h-[70%] flex flex-col justify-center">
        <div className="w-[80%] flex flex-col gap-4">
          <p className="text-[#006DEE] font-semibold">{quote}</p>
          <h2 className="text-[40px] font-semibold leading-9">{subheading}</h2>
          <p>{text}</p>

          {/* 🌟 Animated Button */}
          <button
            className="w-[140px] h-[40px] rounded-md text-white bg-[#006DEE]
                       
                       transform transition-transform duration-300 ease-in-out
                       hover:scale-110 active:scale-95"
          >
            {btntext}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Ad;
