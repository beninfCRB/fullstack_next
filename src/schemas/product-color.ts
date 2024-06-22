import { z } from "zod"

export const ProductColorSchema = z.object({
    id: z.string().optional(),
    productId: z.string().min(1, {
        message: "Is required",
    }),
    colorId: z.string().min(1, {
        message: "Is required",
    }),
})

export type ProductColorSchemaType = z.infer<typeof ProductColorSchema>