import { ProductType } from "../product/type"

export interface ModelType {
    id?: string
    name?: string

    product?: Array<ProductType>
}