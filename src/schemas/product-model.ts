import { z } from "zod"

export const ProductModelSchema = z.object({
    id: z.string().optional(),
    productId: z.string().min(1, {
        message: "Is required",
    }),
    typeId: z.string().min(1, {
        message: "Is required",
    }),
    transmitionId: z.string().min(1, {
        message: "Is required",
    }),
})

export type ProductModelSchemaType = z.infer<typeof ProductModelSchema>