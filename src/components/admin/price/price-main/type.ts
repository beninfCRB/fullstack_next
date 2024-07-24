import { ProductModelType } from "../../product/product-model/type"

export interface PriceType {
    id?: string
    productModelId?: string
    price?: number | any
    credit?: boolean
    tenor?: number | any
    dp?: number | any

    product_model?: ProductModelType
}