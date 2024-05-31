import { z } from "zod"

export const ProductModelSchema = z.object({
    id: z.string().optional(),
    productId: z.string(),
    typeId: z.string(),
    transmitionId: z.string()
})

export type ProductModelSchemaType = z.infer<typeof ProductModelSchema>