import { ColorType } from "../../master/color/type"
import { ProductImageType } from "../product-image/type"
import { ProductType } from "../product-main/type"

export interface ProductColorType {
    id?: string
    productId?: string
    colorId?: string

    product?: ProductType
    color?: ColorType
    product_image?: Array<ProductImageType>
}