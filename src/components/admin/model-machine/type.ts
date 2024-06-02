import { Decimal } from "@prisma/client/runtime/library"
import { FuelType } from "../fuel/type"
import { ProductModelType } from "../product-model/type"

export interface ModelMachineType {
    id?: string
    productModelId?: string
    machineSerial?: string
    engineType?: string
    boreStroke?: string
    cylinder?: Decimal
    maxOutput?: string
    maxTorq?: string
    fuelId?: string
    fuelCapacity?: Decimal

    product_model?: ProductModelType
    fuel?: FuelType
}