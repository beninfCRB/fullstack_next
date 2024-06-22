import { z } from "zod"

export const ModelSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
        message: "Is required",
    })
})

export type ModelSchemaType = z.infer<typeof ModelSchema>