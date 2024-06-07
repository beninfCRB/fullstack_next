import { Decimal } from "@prisma/client/runtime/library"
import { ProductModelType } from "../product-model/type"

export interface ModelDimentionType {
    id?: string
    productModelId?: string
    length?: Decimal
    width?: Decimal
    height?: Decimal
    wheelBase?: Decimal
    frontThread?: Decimal
    rearThread?: Decimal
    groundClearance?: Decimal

    product_model?: ProductModelType
}