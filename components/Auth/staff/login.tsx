'use client'

import React, { useState } from 'react'
import { AuthFormSchema, OTPstore } from '../../../constants/stores/loginStore'
import { useForm } from 'react-hook-form'
import { set, z } from 'zod'
import { baseInstance } from '../../../constants/apis/api'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { userStore } from '../../../constants/stores/userStore'

type authFormDataType = z.infer<typeof AuthFormSchema>

const StaffLogin = () => {
  const { setUserData } = userStore()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const listofUsers = async () => {
    const response = await baseInstance.get('/users/')
    const userinfo = response.data
    {
      !userinfo?.map((user: any) => {
        setUserData({
          last_name: userinfo.last_name,
          id: userinfo.id,
          occupation: userinfo.occupation,
          hospital_id: userinfo.hospital_id,
          work_id: userinfo.work_id,
          first_name: userinfo.first_name,
          email: userinfo.email,
          department: userinfo.department
        })
      })
    }
    return response.data
  }


  const { register, handleSubmit, formState: { errors } } = useForm<authFormDataType>()

  const hospitalList = async () => {
    const response = await baseInstance.get('/hospital/')
    return response.data
  }

  const { data: hospitals } = useQuery({
    queryKey: ['hospitals'],
    queryFn: hospitalList
  })

  // the store for email and otp
  const { otpData, setOTPData } = OTPstore()
  
  // sending OTP logic here
  const handleData = async (data: any) => {
    const payLoad = {
      work_id: data.workID,
      email: data.workEmail,
      hospital_id: data.institution
    }

    try {
      const response = await baseInstance.post('/users/login/', payLoad)
      console.log("OTP response:", response.data)

      // Check if response status is successful
      if (response.status === 200 || response.status === 201) {
        setOTPData({
          email: data.workEmail,
          otp: '' // OTP will be filled in the verification step
        })
        return { success: true, data: response.data }
      } else {
        return { success: false, error: 'Unexpected response from server' }
      }

    } catch (error: any) {
      console.error("Error during login:", error.response?.data || error.message)
      
      // Extract error message from response
      let errorMsg = 'An error occurred. Please try again.'
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status
        const data = error.response.data
        
        switch (status) {
          case 400:
            errorMsg = data?.message || data?.error || 'Invalid credentials. Please check your information.'
            break
          case 401:
            errorMsg = 'Unauthorized. Please check your work ID and email.'
            break
          case 404:
            errorMsg = 'User not found. Please verify your credentials.'
            break
          case 500:
            errorMsg = 'Server error. Please try again later.'
            break
          default:
            errorMsg = data?.message || data?.error || `Error: ${status}`
        }
      } else if (error.request) {
        // Request made but no response
        errorMsg = 'Network error. Please check your connection.'
      }
      
      return { success: false, error: errorMsg }
    }
  }


  const router = useRouter();
  
  const onSubmitting = async (data: any) => {
    setErrorMessage('') // Clear any previous errors
    setIsLoading(true)
    
    try {
      const result = await handleData(data)
      
      if (result.success) {
        // Only redirect if successful
        router.replace('/verify')
      } else {
        // Show error message
        setErrorMessage(result.error || 'Authentication failed')
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
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
        
        {/* Display error message */}
        {errorMessage && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            <p className='text-[14px]'>{errorMessage}</p>
          </div>
        )}
        
        {/*personal info form here  */}
        <div>
          <form onSubmit={handleSubmit(onSubmitting)} >
            <div>
              <div className='mb-2 mt-2 ml-1'>
                <h1 className='text-[14px]'>Affiliated Institution</h1>
              </div>

              {hospitals && (
                <select {...register("institution", {
                  required: "Affiliated institution is required",
                }
                )} className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[12px]
                focus:outline-0 p-2'>
                  <option value="">Select your institution</option>
                  {hospitals.map((hospital: any) => (
                    <option key={hospital.hospital_id} value={hospital.hospital_id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              )}
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
                type="submit"
                disabled={isLoading}
                className='bg-black text-white text-[14px] font-light h-[50px] w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : 'Get Authentication Code'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StaffLogin