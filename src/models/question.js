import {z} from 'zod'

export const createQuestionSchema = z.object({
    question: z.string().min(1).max(300),
    answer: z.string().min(1).max(300),
    difficulty: z.enum(['easy','medium','difficult'])
})

export const questionIdSchema = z.object({
    id: z.uuid()
})

export const questionTextSchema = z.object({
    question: z.string().min(1).max(300)
})