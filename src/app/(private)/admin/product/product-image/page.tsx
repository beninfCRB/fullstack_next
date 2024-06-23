import { DeleteProductImage } from '@/actions/product-image'
import { ProductImageForm } from '@/components/admin/product/product-image/form'
import { ProductImageTable } from '@/components/admin/product/product-image/table'
import { ProductImageType } from '@/components/admin/product/product-image/type'
import { GetProductColor } from '@/data/product-color'
import { GetProductImage, GetProductImageID } from '@/data/product-image'


export default async function ProductImagePage() {
    const data = await GetProductImage() || []
    const productColor = await GetProductColor() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteProductImage(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetProductImageID(id)
        const data: ProductImageType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <ProductImageForm
                    dataProductColor={productColor}
                    getID={getData}
                />
                <ProductImageTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

