import {z} from 'zod'
import {create} from 'zustand'

const userSchema = z.object({
    last_name: z.string(),
    id: z.number(),
    occupation: z.string(),
    hospital_id: z.number(),
    work_id: z.string(),
    first_name: z.string(),
    email: z.email(),
    department: z.string()
})

interface UserState {
    userData: z.infer<typeof userSchema> | null
    setUserData: (data: z.infer<typeof userSchema>) => void
    clearUserData: () => void
}

export const userStore = create<UserState>((set) => ({
    userData: null,
    setUserData: (data) => set(() => ({userData: data})),
    clearUserData: () => set(() => ({userData: null}))
}))
