import { z } from "zod"

export const PriceSchema = z.object({
    id: z.string().optional(),
    productModelId: z.string(),
    price: z.coerce.number(),
    credit: z.coerce.boolean(),
    tenor: z.coerce.number(),
    dp: z.coerce.number(),
})

export type PriceSchemaType = z.infer<typeof PriceSchema>