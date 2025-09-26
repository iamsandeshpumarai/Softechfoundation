import React from 'react'

const Footer = () => {
  return (
    <div  className='xl:bg-gradient-to-r from-[#EEF5FF]'>
      <div className='h-[25vh] flex  to-white justify-center flex-col xl:w-[87vw] w-[90vw] sm:items-center mx-auto sm:h-[20vh] sm:flex sm:flex-row  rounded-md md:h-[16vh]  lg:h-[40vh] bg-[#006DEE] mb-6'>
        <h2 className='w-[100%]  sm:w-[90%] text-white text-[24px] lg:w-[75%] lg:text-left lg:ml-8 font-semibold text-center flex lg:text-[40px] justify-center'>
Shape the Future of Customer Experience with AI Agents
        </h2>
        <div className=' sm:w-[20%] lg:ml-4 flex justify-center mt-3 w-full' >

        <button className='bg-white sm:h-[40px] sm:mr-[10px] text-blue-600 w-[150px] text-[16px] font-medium rounded-md p-2'>
Get a Demo
        </button>
        </div>
      </div>
    </div>
  )
}

export default Footer
