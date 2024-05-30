import { ColorType } from "../color/type"
import { ProductType } from "../product/type"

export interface ProductColorType {
    id?: string
    productId?: string
    colorId?: string

    product?: ProductType
    color?: ColorType
}