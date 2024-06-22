import { ProductColorType } from "../product-color/type"
import { ProductModelType } from "../product-model/type"

export interface ProductType {
    id?: string
    name?: string
    buildUp?: number
    description?: string

    product_model?: Array<ProductModelType>
    product_color?: Array<ProductColorType>
}