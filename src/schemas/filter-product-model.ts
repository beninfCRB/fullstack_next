import { z } from "zod"

export const FilterProductModelSchema = z.object({
    modelId: z.string().optional(),
    transmitionId: z.string().optional(),
    priceStart: z.coerce.number().optional(),
    priceEnd: z.coerce.number().optional(),
})

export type FilterProductModelSchemaType = z.infer<typeof FilterProductModelSchema>