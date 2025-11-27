import { CheckIcon } from '@heroicons/react/24/solid';
import {  clientLogo } from '../../data/content';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


const HeroText = ({data=[]}) => {
  

  const [firstPath, updateFirstPath] = useState("");
  const [secondPath, updateSecondPath] = useState("");

  useEffect(() => {
    const heading = data[0]?.heading || "";
    if (heading.length > 0) {
      const words = heading.split(" ");
      updateFirstPath(words.slice(0, 3).join(" "));
      updateSecondPath(words.slice(3).join(" "));
    }
  }, [data]); // watch for changes in data

  return (
    <>
      
        <motion.div
          
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-[#EFF6FF] to-white flex flex-col items-center justify-between"
        >
          <div className="w-full flex flex-col items-center">
            {/* heading section */}
            <div className="headtext text-[40px] text-center md:text-[58px] mb-8 md:leading-[60px] sm:text-[55px] sm:leading-[55px] sm:text-center md:text-left font-extrabold mt-4">
           {
  data[0]?.heading ? (
    <p

      className="lg:w-[50vw] ml-14"
    >
      {firstPath}
      <span className='text-blue-500 ml-2'>{secondPath}</span> {}
    </p>
  ) : (
    <>
      <h1>Build Powerful</h1>
      <h1>
        Conversational <span className="text-[#006dee]">AI Agents</span>
      </h1>
      <h1 className="text-[#006dee]">for Enterprise-Scale</h1>
    </>
  )
}

         
              
            </div>

            {/* benefits list */}
            <div className="md:ml-28">
              {data[0]?.subHeadings?.map((benefit, i) => (
                <div className="flex gap-2 mt-2 " key={i}>
                  <div className="w-5 h-5 mt-3   bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="sm:w-5 w-4 h-3 sm:h-4 text-blue-500" />
                  </div>
                  <span  className="sm:text-[16px]  xl:mr-24 text-[16px] leading-8 sm:leading-[40px]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* brand logos */}
          <div className="mb-3 brandslogo w-full flex flex-col justify-center items-center">
            <div className="md:w-[85%] md:ml-16 md:font-semibold hidden mt-6 mb-6 sm:flex sm:justify-start md:flex md:justify-start">
              <p className="text-[20px]">Trusted by Leading Brands</p>
            </div>
            <div className="md:w-auto  md:ml-16 sm:block hidden border border-[#F7F9FB] shadow-md md:flex  bg-white h-[9vh]">
              {data[0]?.brandPartners.length ?  data[0]?.brandPartners.map((imgdata,index)=>(
                             <img key={index}
                className="sm:w-30  sm:h-full"
                src={imgdata.image }
                alt="Client Logo"
              />
              )) : <img src="https://www.haptik.ai/hs-fs/hubfs/Contakt_LP%20(1).webp?width=1500&height=120&name=Contakt_LP%20(1).webp"></img> }
            </div>
          </div>
        </motion.div>

    </>
  );
};

export default HeroText;
