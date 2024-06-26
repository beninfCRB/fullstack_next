import { DeleteProductColor } from '@/actions/product-color'
import { ProductColorForm } from '@/components/admin/product/product-color/form'
import { ProductColorTable } from '@/components/admin/product/product-color/table'
import { ProductColorType } from '@/components/admin/product/product-color/type'
import { GetColor } from '@/data/color'
import { GetProduct } from '@/data/product'
import { GetProductColor, GetProductColorID } from '@/data/product-color'


export default async function ProductColorPage() {
    const data = await GetProductColor() || []
    const product = await GetProduct() || []
    const color = await GetColor() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteProductColor(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetProductColorID(id)
        const data: Partial<ProductColorType> = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <ProductColorForm
                    dataColor={color}
                    dataProduct={product}
                    getID={getData}
                />
                <ProductColorTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

