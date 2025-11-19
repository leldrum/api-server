import z from "zod"

export const registerSchema = z.object({
    email: z.email(),
    username: z.string().max(30).min(3),
    password: z.string().min(8).max(255)
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(255)
})