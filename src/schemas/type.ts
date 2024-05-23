import { z } from "zod"

export const TypeSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
        message: "Nama Tipe is required",
    })
})

export type TypeSchemaType = z.infer<typeof TypeSchema>