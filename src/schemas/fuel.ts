import { z } from "zod"

export const FuelSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
        message: "Is required",
    }),
})

export type FuelSchemaType = z.infer<typeof FuelSchema>