import { z } from "zod"

export const ModelChasisSchema = z.object({
    id: z.string().optional(),
    productModelId: z.string().min(1, {
        message: "is required",
    }),
    transmitionType: z.string().min(1, {
        message: "is required",
    }),
    frontSuspension: z.string().min(1, {
        message: "is required",
    }),
    rearSuspension: z.string().min(1, {
        message: "is required",
    }),
    frontBrake: z.string().min(1, {
        message: "is required",
    }),
    rearBrake: z.string().min(1, {
        message: "is required",
    }),
    parkingBrake: z.string().min(1, {
        message: "is required",
    }),
    brakingSystem: z.string().min(1, {
        message: "is required",
    }),
    tireSize: z.string().min(1, {
        message: "Is required",
    }),
})

export type ModelChasisSchemaType = z.infer<typeof ModelChasisSchema>