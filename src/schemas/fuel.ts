import { z } from "zod"

export const FuelSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
        message: "Nama Tipe is required",
    })
})

export type FuelSchemaType = z.infer<typeof FuelSchema>