import { Decimal } from "@prisma/client/runtime/library"
import { FuelType } from "../fuel/type"
import { ProductModelType } from "../product-model/type"

export interface ModelMachineType {
    id?: string
    productModelId?: string
    machineSerial?: string | null
    engineType?: string | null
    boreStroke?: string | null
    cylinder?: Decimal
    maxOutput?: string | null
    maxTorq?: string | null
    fuelId?: string
    fuelCapacity?: Decimal

    product_model?: ProductModelType
    fuel?: FuelType
}