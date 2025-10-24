import { z } from 'zod'
import { create } from 'zustand'

interface OTPstate {
    otpData: z.infer<typeof verifyCodeSchema> | null
    setOTPData: (data: z.infer<typeof verifyCodeSchema>) => void
    clearOTPData: () => void
}

export const AuthFormSchema = z.object({
    institution: z.string(),
    workID: z.string(),
    workEmail: z.email()
})

export const verifyCodeSchema = z.object({
    email: z.email(),
    otp: z.string().min(6, "OTP must be 6 characters long").max(6, "OTP must be 6 characters long")
})

export const OTPstore = create<OTPstate>((set) => ({
    otpData: null,
    setOTPData: (data) => set(() => ({ otpData: data })),
    clearOTPData: () => set(() => ({ otpData: null }))
}))

// {
//     "status": "success",
//     "message": "OTP sent successfully to charity.k.mutembei@gmail.com"
// }