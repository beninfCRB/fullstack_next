import { DeleteProductModel } from '@/actions/product-model'
import { ProductModelForm } from '@/components/admin/product/product-model/form'
import { ProductModelTable } from '@/components/admin/product/product-model/table'
import { ProductModelType } from '@/components/admin/product/product-model/type'
import { GetProduct } from '@/data/product'
import { GetProductModel, GetProductModelID } from '@/data/product-model'
import { GetTransmition } from '@/data/transmition'
import { GetType } from '@/data/type'


export default async function ProductModelPage() {
    const data = await GetProductModel() || []
    console.log('------------>data', data);

    const product = await GetProduct() || []
    const type = await GetType() || []
    const transmition = await GetTransmition() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteProductModel(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetProductModelID(id)
        const data: ProductModelType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <ProductModelForm
                    dataProduct={product}
                    dataType={type}
                    dataTransmition={transmition}
                    getID={getData}
                />
                <ProductModelTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

