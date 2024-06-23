import { ProductType } from "../../product/product-main/type"

export interface ModelType {
    id?: string
    name?: string

    product?: Array<ProductType>
}