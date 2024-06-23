import { ModelMachineType } from "../../model/model-machine/type"
import { PriceType } from "../../price/price-main/type"
import { ProductType } from "../product-main/type"
import { TransmitionType } from "../../master/transmition/type"
import { TypeType } from "../../master/type/type"

export interface ProductModelType {
    id?: string
    productId?: string
    typeId?: string
    transmitionId?: string

    product?: ProductType
    type?: TypeType
    transmition?: TransmitionType
    price?: PriceType | null
    model_machine?: Array<ModelMachineType>
}