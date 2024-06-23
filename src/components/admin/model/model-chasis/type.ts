import { Decimal } from "@prisma/client/runtime/library"
import { ProductModelType } from "../../product/product-model/type"

export interface ModelChasisType {
    id?: string
    productModelId?: string
    transmitionType?: string
    frontSuspension?: string
    rearSuspension?: string
    frontBrake?: string
    rearBrake?: string
    parkingBrake?: string
    brakingSystem?: string
    tireSize?: string

    product_model?: ProductModelType
}