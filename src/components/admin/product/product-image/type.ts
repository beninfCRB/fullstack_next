import { ProductColorType } from "../product-color/type"

export interface ProductImageType {
    id?: string
    productColorId?: string
    path?: string
    image?: File

    product_color?: ProductColorType
}