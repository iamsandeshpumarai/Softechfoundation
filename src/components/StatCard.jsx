

const StatCard = ({data}) => {
  console.log(data ,'this is the stat card')
  return (
    <div className='grid grid-cols-[50%_50%] w-screen md:grid-cols-4 place-items-center md:mb-20'>
{
data[0]?.stats?.map((exampleCompany,index)=>{
    return <div key={index} className='border md:w-[75%] w-[90%]  mb-3 h-[170px] md:h-[200px]  flex flex-col justify-center items-center bg-gradient-to-r from-[#F3FEFF] to-white shadow-lg rounded-md'>
        <div className='statnum sm:h-[30%] md:h-[40%] text-blue-600 font-semibold text-[40px] md:text-[60px]'>
{exampleCompany.title}
</div>
<div className='stattext md:m-3  font-light md:font-normal ml-5'>
{exampleCompany.description}
</div>
      
<div className='h-[40%] sm:h-[60%] md:h-[30%]  w-full flex justify-center '>
    <img className='h-full md:w-full sm:w-[900px] w-[120px] object-contain' src={exampleCompany.image || ""} alt="" />
</div>

        </div>
})
}

      



    </div>
  )
}

export default StatCard
