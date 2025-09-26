import React from 'react'
import { companyLogo } from '../data/content'

const StatCard = () => {
  return (
    <div className='grid grid-cols-[50%_50%] w-screen md:grid-cols-4 place-items-center md:mb-20'>
{
companyLogo.map((exampleCompany,index)=>{
    return <div key={index} className='border md:w-[75%] w-[90%]  mb-3 h-[170px] md:h-[200px]  flex flex-col justify-center items-center bg-gradient-to-r from-[#F3FEFF] to-white shadow-lg rounded-md'>
        <div className='statnum sm:h-[30%] md:h-[40%] text-blue-600 font-semibold text-[40px] md:text-[60px]'>
{exampleCompany.num}
</div>
<div className='stattext md:m-3  font-light md:font-normal ml-5'>
{exampleCompany.text}
</div>
      
<div className='h-[40%] sm:h-[60%] md:h-[30%]  w-full flex justify-center '>
    <img className='h-full md:w-full sm:w-[900px] w-[120px] object-contain' src={exampleCompany.logo} alt="" />
</div>

        </div>
})
}

      <div className=''>

      </div>



    </div>
  )
}

export default StatCard
