import { ProductType } from "../product/type"
import { TransmitionType } from "../transmition/type"
import { TypeType } from "../type/type"

export interface ProductModelType {
    id?: string
    productId?: string
    typeId?: string
    transmitionId?: string

    product?: ProductType
    type?: TypeType
    transmition?: TransmitionType
}