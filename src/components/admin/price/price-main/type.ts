import { Decimal } from "@prisma/client/runtime/library"
import { ProductModelType } from "../../product/product-model/type"

export interface PriceType {
    id?: string
    productModelId?: string
    price?: Decimal
    credit?: boolean
    tenor?: number
    dp?: Decimal

    product_model?: ProductModelType
}