import { z } from "zod"

export const ModelMachineSchema = z.object({
    id: z.string().optional(),
    productModelId: z.string().min(1, {
        message: "Is required",
    }),
    machineSerial: z.string().optional(),
    engineType: z.string().optional(),
    boreStroke: z.string().optional(),
    cylinder: z.coerce.number(),
    maxOutput: z.string().optional(),
    maxTorq: z.string().optional(),
    fuelId: z.string().min(1, {
        message: "Is required",
    }),
    fuelCapacity: z.coerce.number(),
})

export type ModelMachineSchemaType = z.infer<typeof ModelMachineSchema>