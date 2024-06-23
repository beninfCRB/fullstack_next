import { DeletePrice } from '@/actions/price'
import { PriceForm } from '@/components/admin/price/price-main/form'
import { PriceTable } from '@/components/admin/price/price-main/table'
import { PriceType } from '@/components/admin/price/price-main/type'
import { GetPrice, GetPriceID } from '@/data/price'
import { GetProductModel } from '@/data/product-model'


export default async function PricePage() {
    const data = await GetPrice() || []
    const productModel = await GetProductModel() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeletePrice(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetPriceID(id)
        const data: PriceType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <PriceForm
                    dataProductModel={productModel}
                    getID={getData}
                />
                <PriceTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

