'use server'

import {z} from 'zod'

export const AuthFormSchema = z.object({
    institution: z.string(),
    workID: z.string(),
    workEmail: z.email()
})

