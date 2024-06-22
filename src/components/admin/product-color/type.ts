import { ColorType } from "../color/type"
import { ProductImageType } from "../product-image/type"
import { ProductType } from "../product/type"

export interface ProductColorType {
    id?: string
    productId?: string
    colorId?: string

    product?: ProductType
    color?: ColorType
    product_image?: Array<ProductImageType>
}