import { z } from "zod"

export const ProductSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
        message: "Nama Tipe is required",
    }),
    buildUp: z.number().min(4, {
        message: "Maximum 4 digit numbers"
    }),
    description: z.string()
})

export type ProductSchemaType = z.infer<typeof ProductSchema>