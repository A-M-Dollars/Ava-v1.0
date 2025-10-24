'use client'

import React, { useState } from 'react'
import { verifyCodeSchema } from '@/constants/stores/loginStore'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { baseInstance } from '@/constants/apis/api'
import { OTPstore } from '@/constants/stores/loginStore'
import { userStore } from '@/constants/stores/userStore'
import { useRouter } from 'next/navigation';


const VerifyCode = () => {
    type verifyCode = z.infer<typeof verifyCodeSchema>
    const { register, handleSubmit, formState: { errors } } = useForm<verifyCode>()
    const { otpData } = OTPstore()
    const { userData, setUserData } = userStore()
    const router = useRouter()
    
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleOTPVerification = async (data: verifyCode) => {
        if (!otpData?.email) {
            return { success: false, error: "No email found. Please restart the login process." }
        }
        
        const payLoad = {
            email: otpData.email,
            otp: data.otp
        }

        try {
            const response = await baseInstance.post('/users/verify-otp/', payLoad)
            
            // Check if response is successful
            if (response.status === 200 || response.status === 201) {
                const { access_token, refresh_token, user_details } = response.data
                
                // Store user data
                setUserData({
                    id: user_details.id || '',
                    work_id: user_details.work_id,
                    first_name: user_details.first_name,
                    last_name: user_details.last_name,
                    email: user_details.email,
                    occupation: user_details.occupation,
                    department: user_details.department,
                    hospital_id: user_details.hospital_id
                })
                
                // Store tokens (you might want to use a separate token store or secure storage)
                // For now, storing in sessionStorage as an example
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem('access_token', access_token)
                    sessionStorage.setItem('refresh_token', refresh_token)
                }
                
                return { success: true, data: response.data }
            } else {
                return { success: false, error: 'Unexpected response from server' }
            }
            
        } catch (error: any) {
            console.error("Error during OTP verification:", error.response?.data || error.message)
            
            let errorMsg = 'Verification failed. Please try again.'
            
            if (error.response) {
                const status = error.response.status
                const data = error.response.data
                
                switch (status) {
                    case 400:
                        errorMsg = data?.message || data?.error || 'Invalid OTP code. Please check and try again.'
                        break
                    case 401:
                        errorMsg = 'OTP expired or invalid. Please request a new code.'
                        break
                    case 404:
                        errorMsg = 'Verification session not found. Please restart login.'
                        break
                    case 500:
                        errorMsg = 'Server error. Please try again later.'
                        break
                    default:
                        errorMsg = data?.message || data?.error || `Error: ${status}`
                }
            } else if (error.request) {
                errorMsg = 'Network error. Please check your connection.'
            }
            
            return { success: false, error: errorMsg }
        }
    }

    const onsubmit = async (data: verifyCode) => {
        setErrorMessage('')
        setIsLoading(true)
        
        try {
            const result = await handleOTPVerification(data)
            
            if (result.success) {
                // Navigate to dashboard on successful verification
                router.replace('/dashboard')
            } else {
                // Show error message
                setErrorMessage(result.error || 'Verification failed')
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {/* image here */}
            <div className='h-[300px] mb-2'>
                <img src="/auth/doc2.jpeg" alt="##"
                    className='w-full h-full object-cover rounded-sm'
                />
            </div>
            
            {/* authenticate code */}
            <div className='p-4'>
                {/* Display error message */}
                {errorMessage && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                        <p className='text-[14px]'>{errorMessage}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div>
                        <p className='mb-4'>
                            Enter Provided Verification Code to verify your account
                        </p>
                        <input
                            type="text"
                            placeholder='Enter Verification Code'
                            {...register("otp", { required: "Input the OTP code sent to your email" })}
                            className='bg-gray-200 h-[50px] w-full placeholder:p-2 text-[14px]
                        focus:outline-0 p-2'
                        />
                        {errors.otp && <p className='text-red-500 text-[12px] mt-1'>{errors.otp.message}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className='bg-black h-[50px] text-white w-full mt-4 font-light disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Verifying...</span>
                                </>
                            ) : 'Get Verified'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerifyCode