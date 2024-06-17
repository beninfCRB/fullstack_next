import { DeletePrice } from '@/actions/price'
import { PriceForm } from '@/components/admin/price/form'
import { PriceTable } from '@/components/admin/price/table'
import { PriceType } from '@/components/admin/price/type'
import { GetPrice, GetPriceID } from '@/data/price'
import { GetProduct } from '@/data/product'


export default async function PricePage() {
    const data = await GetPrice() || []
    const product = await GetProduct() || []

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
                    dataProduct={product}
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

