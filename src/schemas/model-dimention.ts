import { z } from "zod"

export const ModelDimentionSchema = z.object({
    id: z.string().optional(),
    productModelId: z.string(),
    length: z.coerce.number(),
    width: z.coerce.number(),
    height: z.coerce.number(),
    wheelBase: z.coerce.number(),
    frontThread: z.coerce.number(),
    rearThread: z.coerce.number(),
    groundClearance: z.coerce.number(),
})

export type ModelDimentionSchemaType = z.infer<typeof ModelDimentionSchema>