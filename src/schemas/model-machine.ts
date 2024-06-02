import { z } from "zod"

export const ModelMachineSchema = z.object({
    id: z.string().optional(),
    productModelId: z.string(),
    machineSerial: z.string().optional(),
    engineType: z.string(),
    boreStroke: z.string(),
    cylinder: z.coerce.number(),
    maxOutput: z.string(),
    maxTorq: z.string(),
    fuelId: z.string(),
    fuelCapacity: z.coerce.number(),
})

export type ModelMachineSchemaType = z.infer<typeof ModelMachineSchema>