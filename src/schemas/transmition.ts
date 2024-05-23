import { z } from "zod"

export const TransmitionSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
        message: "Nama Tipe is required",
    })
})

export type TransmitionSchemaType = z.infer<typeof TransmitionSchema>