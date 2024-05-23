import { DeleteProduct } from '@/actions/product'
import { ProductForm } from '@/components/admin/product/form'
import { ProductTable } from '@/components/admin/product/table'
import { ProductType } from '@/components/admin/product/type'
import { GetProduct, GetProductID } from '@/data/product'


export default async function ProductPage() {
    const data = await GetProduct() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteProduct(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetProductID(id)
        const data: ProductType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <ProductForm getID={getData} />
                <ProductTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

