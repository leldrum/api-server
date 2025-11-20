export const categorieSchema = z.object({
    titre: z.string().min(1).max(300),
    description: z.string().min(1).max(300),
})