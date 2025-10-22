'use client'

import React from 'react'
import { verifyCodeSchema } from '@/constants/stores/loginStore'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { baseInstance } from '@/constants/apis/api'
import { OTPstore } from '@/constants/stores/loginStore'
import { useRouter } from 'next/navigation';


const VerifyCode = () => {

    type verifyCode = z.infer<typeof verifyCodeSchema>
    const { register, handleSubmit, formState: { errors } } = useForm<verifyCode>()
    const { otpData } = OTPstore()

    const handleOTPVerification = async (data: verifyCode) => {
        if (!otpData?.email) {
            console.error("No email found in store for OTP verification.")
            return
        }
        const payLoad = {
            email: otpData.email,
            otp: data.otp
        }

        try {
            const response = await baseInstance.post('/users/verify-otp/', payLoad)
            console.log("OTP Verification response:", response.data)
        } catch (error: any) {
            console.error("Error during OTP verification:", error.response?.data || error.message)
        }
    }

    const route = useRouter();
    const onsubmit = (data: any) => {
        handleOTPVerification(data)
        route.replace('/dashboard');

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
                            className='bg-black h-[50px] text-white w-full mt-4 font-light'
                        >Get Verified</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default VerifyCode