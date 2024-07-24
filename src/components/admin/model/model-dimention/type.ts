import { ProductModelType } from "../../product/product-model/type"

export interface ModelDimentionType {
    id?: string
    productModelId?: string
    length?: number | any
    width?: number | any
    height?: number | any
    wheelBase?: number | any
    frontThread?: number | any
    rearThread?: number | any
    groundClearance?: number | any

    product_model?: ProductModelType
}