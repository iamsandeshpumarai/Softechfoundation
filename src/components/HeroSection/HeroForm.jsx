import React, { useState } from 'react';
import { CountriesCode } from '../../data/content';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient, } from '@tanstack/react-query';
import axios from "axios"
import { toast } from 'react-toastify';
const HeroForm = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm();
  const queryClient = useQueryClient()
  const [selectedCountry, updateSelectedCountry] = useState('+93 ');
  const [countryName,updateCountryName] = useState("Afghanistan")

const sendData =  useMutation({
  mutationKey:['Userdata'],
  mutationFn: async  function (datas){
const data = await axios.post('https://softechbackend-1.onrender.com/user',datas)
return data
  },
  onMutate:()=>{
    toast.info("Form is Submitting")
  },
  onSuccess:()=>{
    toast.dismiss()
    queryClient.invalidateQueries(['userdetails'])
    queryClient.invalidateQueries(['userchart'])
    toast.success("Form submitted sucessfully")
    reset();
    updateSelectedCountry("")
  },
  onError:(err)=>{
    toast.dismiss()
    toast.error(err.response.data.message)

  }
  })

  const changeNumber = (e) => {
    updateSelectedCountry(e.target.value);
    
  };


  const onSubmit = (datas) => {
    const data = {...datas,Country:countryName}
    sendData.mutate(data);}

  return (
    <motion.div initial={{x:200,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.5}} className="md:w-full md:h-full flex justify-center">
      <div className="md:w-[70%] w-[100%] border-none rounded-xl shadow-lg bg-[#EDF4FF]">
        <h2 className="text-center text-[32px] text-[#006dee] mt-6">Book A Demo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="forms flex flex-col gap-6 md:w-[95%] mx-auto px-6">

            {/* Name fields */}
            <div className="nameform flex w-full gap-1">
              <div className="w-[60%] relative">
                <input
                  {...register('FirstName', { required: 'Please enter your first name' })}
                  type="text"
                  className="focus:outline-none border border-[#C9CCD2] rounded-md mr-3 text-[17px] h-[37px] placeholder:text-left placeholder:text-[#99C5F8] input-indent w-full"
                  placeholder="First Name *"
                />
                {errors.firstname && (
                  <p className="absolute top-[40px] text-red-500 text-[12px]">{errors.firstname.message}</p>
                )}
              </div>

              <div className="w-[40%] relative">
                <input
                  {...register('LastName', { required: 'Please enter your last name' })}
                  type="text"
                  className="border focus:outline-none border-[#C9CCD2] mr-3 rounded-md text-[17px] h-[37px] placeholder:text-left placeholder:text-[#99C5F8] input-indent w-full"
                  placeholder="Last Name *"
                />
                {errors.lastname && (
                  <p className="absolute top-[40px] text-red-500 text-[12px]">{errors.lastname.message}</p>
                )}
              </div>
            </div>

            {/* Company Name */}
            <div className="companyform relative">
              <input
                {...register('CompanyName', { required: 'Please enter your company name' })}
                type="text"
                className="border focus:outline-none border-[#C9CCD2] mr-3 w-full h-[37px] placeholder:text-left placeholder:text-[#99C5F8] input-indent"
                placeholder="Company Name *"
              />
              {errors.company && (
                <p className="absolute top-[40px] text-red-500 text-[12px]">{errors.company.message}</p>
              )}
            </div>

            {/* Business Email */}
            <div className="business-email relative">
              <input
                {...register('BusinessEmail', {
                  required: 'Please enter your business email',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email',
                  },
                })}
                type="email"
                className="border focus:outline-none border-[#C9CCD2] mr-3 w-full h-[37px] placeholder:text-left placeholder:text-[#99C5F8] input-indent"
                placeholder="Business Email *"
              />
              {errors.email && (
                <p className="absolute top-[40px] text-red-500 text-[12px]">{errors.email.message}</p>
              )}
            </div>

            {/* Job Title */}
            <div className="job relative">
              <input
                {...register('Jobtitle', { required: 'Please enter your job title' })}
                type="text"
                className="border focus:outline-none border-[#C9CCD2] mr-3 w-full h-[37px] placeholder:text-left placeholder:text-[#99C5F8] input-indent"
                placeholder="Job Title *"
              />
              {errors.job && (
                <p className="absolute top-[40px] text-red-500 text-[12px]">{errors.job.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="phone-number flex gap-3 relative">
              <select
                onChange={(e) =>  {
updateSelectedCountry(e.target.value)
const option = e.target.selectedOptions[0];
updateCountryName(option.dataset.countryname)
                } }
                className="border focus:outline-none border-[#C9CCD2] w-[20%] h-[37px]"
              >
                {CountriesCode.map((data, index) => (
                  <option value={data.code} data-countryname={data.country}  key={index}>
                    {data.country}
                  </option>
                ))}
              </select>

              <div className="w-full relative">
                <input
                  {...register('PhoneNumber', { required: 'Please enter your phone number' })}
                  type="tel"
                  onChange={changeNumber}
                  value={selectedCountry}
                  className="border focus:outline-none border-[#C9CCD2] mr-3 w-full h-[37px] placeholder:text-left placeholder:text-[#99C5F8] input-indent"
                  placeholder="Phone Number *"
                />
                {errors.phone && (
                  <p className="absolute top-[40px] text-red-500 text-[12px]">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Privacy Note */}
            <div>
              <p className="text-sm">
                By registering, you confirm that you agree to the storing and processing of
                your personal data by Haptik as described in the{' '}
                <span className="text-blue-600">Privacy Statement.</span>
              </p>
            </div>

            {/* Submit Button */}
            <button
            onClick={onsubmit}
              type="submit"
              className="bg-blue-600 border border-[#C9CCD2] h-[40px] text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default HeroForm;
