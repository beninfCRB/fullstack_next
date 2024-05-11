import { z } from "zod"

export const TypeSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    })
})

export type TypeSchemaType = z.infer<typeof TypeSchema>