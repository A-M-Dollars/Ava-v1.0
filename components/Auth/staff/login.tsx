'use client'

import React, { use } from 'react'
import { AuthFormSchema } from '../../../constants/stores/loginStore'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type authFormDataType = z.infer<typeof AuthFormSchema>

const StaffLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<authFormDataType>()
  const onSubmitting = (data: any) => {
    console.log(data)
  }

  return (
    <div className='place-items-center mt-4'>
      <div>
        {/* image here */}
        <div className='h-[300px] mb-2'>
          <img src="/auth/doc2.jpeg" alt="##"
            className='w-full h-full object-cover rounded-sm'
          />
        </div>
        {/*personal info form here  */}
        <div>
          <form onSubmit={handleSubmit(onSubmitting)} >
            <div>
              <div className='mb-2 mt-2 ml-1'>
                <h1 className='text-[14px]'>Affiliated Institution</h1>
              </div>
              <input type="text" {...register("institution", {
                required: "Affiliated institution is required",
              })}
                placeholder='Name of institution you work for'
                className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[12px]
                focus:outline-0 p-2'
              />
              {errors.institution && (
                <p className='text-red-600 font-regular text-[12px]'>{errors.institution.message}</p>
              )}
            </div>
            <hr className='mt-4 mb-4 border-gray-200' />
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <div className='mb-2 mt-2 ml-1'>
                  <h1 className='text-[14px]'>Work ID</h1>
                </div>
                <input type="text" {...register("workID", {
                  required: "Work ID is required",
                })}
                  placeholder='Your work ID'
                  className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[12px]
                  focus:outline-0 p-2'
                />
                {errors.workID && (
                  <p className='text-red-600 font-regular text-[12px]'>{errors.workID.message}</p>
                )}
              </div>
              <div>
                <div className='mb-2 mt-2 ml-1'>
                  <h1 className='text-[14px]'>Work Email</h1>
                </div>
                <input type="text" {...register("workEmail", {
                  required: "Work email is required",
                })}
                  placeholder='Your work email'
                  className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[12px]
                  focus:outline-0 p-2
                  '
                />
                {errors.workEmail && (
                  <p className='text-red-600 font-regular text-[12px]'>{errors.workEmail.message}</p>
                )}
              </div>
            </div>
            <hr className='mt-4 mb-4 border-gray-200' />
            <div>
              <button
                className='bg-black text-white text-[14px] font-light h-[50px] w-full cursor-pointer'
              >Get Authentication Code</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StaffLogin