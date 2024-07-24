import { FuelType } from "../../master/fuel/type"
import { ProductModelType } from "../../product/product-model/type"

export interface ModelMachineType {
    id?: string
    productModelId?: string
    machineSerial?: string | null
    engineType?: string | null
    boreStroke?: string | null
    cylinder?: number | any
    maxOutput?: string | null
    maxTorq?: string | null
    fuelId?: string
    fuelCapacity?: number | any

    product_model?: ProductModelType
    fuel?: FuelType
}