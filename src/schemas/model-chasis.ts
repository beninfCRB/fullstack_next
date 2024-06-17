import { z } from "zod"

export const ModelChasisSchema = z.object({
    id: z.string().optional(),
    productModelId: z.string(),
    transmitionType: z.string(),
    frontSuspension: z.string(),
    rearSuspension: z.string(),
    frontBrake: z.string(),
    rearBrake: z.string(),
    parkingBrake: z.string(),
    brakingSystem: z.string(),
    tireSize: z.string()
})

export type ModelChasisSchemaType = z.infer<typeof ModelChasisSchema>