import { z } from "zod"

export const ProductColorSchema = z.object({
    id: z.string().optional(),
    productId: z.string(),
    colorId: z.string()
})

export type ProductColorSchemaType = z.infer<typeof ProductColorSchema>