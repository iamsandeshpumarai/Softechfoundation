import { motion } from "framer-motion";
import React from "react";
import { ScrollTop } from "../Scroll";

const Ad2 = ({ img, btntext, subheading, quote, text }) => {
  return (
    <motion.div initial={{x:-200}} whileInView={{x:0}} viewport={{once:true}} transition={{duration:0.5}}  className="w-screen h-[70vh] mt-6 flex justify-center">
      {/* Text Section */}
      <div className="w-[60%] h-[70%] flex flex-col justify-center items-end">
        <div className="w-[80%] flex flex-col gap-4">
          <p className="text-[#006DEE] font-semibold">{quote}</p>
          <h2 className="text-[40px] font-semibold leading-9">{subheading}</h2>
          <p>{text}</p>

          {/* 🌟 Animated Button */}
          <button 
          onClick={ScrollTop}
            className="w-[140px] h-[40px] rounded-md text-white bg-[#006DEE]
                       
                       transform transition-transform duration-300 ease-in-out
                       hover:scale-110 active:scale-95"
          >
          <a href="#home">{btntext}</a> 
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="h-full w-[40%] flex justify-center">
        <img src={img} className="h-[75%]" alt="ad-banner" />
      </div>
    </motion.div>
  );
};

export default Ad2;
