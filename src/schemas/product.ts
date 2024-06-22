import { z } from "zod"

export const ProductSchema = z.object({
    id: z.string().optional(),
    modelId: z.string().min(1, {
        message: "Nama Tipe is required",
    }),
    name: z.string().min(1, {
        message: "Nama Tipe is required",
    }),
    buildUp: z.number().min(4, {
        message: "Maximum 4 digit numbers"
    }),
    description: z.string().min(1, {
        message: "Is required",
    }),
})

export type ProductSchemaType = z.infer<typeof ProductSchema>