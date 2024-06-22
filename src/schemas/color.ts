import { z } from "zod"

export const ColorSchema = z.object({
    id: z.string().optional(),
    code: z.string(),
    color: z.string().min(1, {
        message: "Is required",
    }),
    name: z.string().min(1, {
        message: "Is required",
    }),
})

export type ColorSchemaType = z.infer<typeof ColorSchema>