import { Decimal } from "@prisma/client/runtime/library"
import { ProductType } from "../product/type"

export interface PriceType {
    id?: string
    productId?: string
    price?: Decimal
    credit?: boolean
    tenor?: number
    dp?: Decimal

    product?: ProductType
}